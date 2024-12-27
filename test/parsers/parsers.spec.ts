import sinon from 'sinon';
import should from 'should';
import nassert from 'n-assert';
import * as HttpZConsts from '../../src/consts';
import HttpZError from '../../src/error';
import parser from '../../src/parsers';
import RequestParser from '../../src/parsers/request';
import ResponseParser from '../../src/parsers/response';

describe('parsers / index', () => {
  beforeEach(() => {
    sinon.stub(RequestParser, 'parse')
    sinon.stub(ResponseParser, 'parse')
  })

  afterEach(() => {
    RequestParser.parse.restore()
    ResponseParser.parse.restore()
  })

  it('should throw error when rawMessage is nil', () => {
    const ERR = {
      message: 'rawMessage is required'
    }
    should(parser.bind(null, undefined)).throw(HttpZError, ERR)
    should(parser.bind(null, null)).throw(HttpZError, ERR)
  })

  it('should throw error when rawMessage is not a string', () => {
    const ERR = {
      message: 'rawMessage must be a string'
    }
    should(parser.bind(null, 123)).throw(HttpZError, ERR)
    should(parser.bind(null, true)).throw(HttpZError, ERR)
    should(parser.bind(null, {})).throw(HttpZError, ERR)
    should(parser.bind(null, [])).throw(HttpZError, ERR)
  })

  it('should throw error when rawMessage has incorrect format', () => {
    let params = ['invalid']

    should(parser.bind(null, ...params)).throw(HttpZError, {
      message: 'rawMessage has incorrect format'
    })
  })

  it('should call RequestParser.parse when rawMessage is request', () => {
    let rawMessage = ['GET /features HTTP/1.1', 'host: example.com', ''].join(HttpZConsts.EOL)
    let expected = 'parsed-request'
    let expectedMultipleArgs = [rawMessage, {}]

    RequestParser.parse.returns('parsed-request')

    let actual = parser(rawMessage)
    should(actual).eql(expected)

    nassert.assertFn({ inst: RequestParser, fnName: 'parse', expectedMultipleArgs })
    nassert.assertFn({ inst: ResponseParser, fnName: 'parse' })
  })

  it('should call ResponseParser.parse when rawMessage is response', () => {
    let rawMessage = ['HTTP/1.1 200 Ok', 'host: example.com', ''].join(HttpZConsts.EOL)
    let expected = 'parsed-response'
    let expectedArgs = rawMessage

    ResponseParser.parse.returns('parsed-response')

    let actual = parser(rawMessage)
    should(actual).eql(expected)

    nassert.assertFn({ inst: RequestParser, fnName: 'parse' })
    nassert.assertFn({ inst: ResponseParser, fnName: 'parse', expectedArgs })
  })
})
