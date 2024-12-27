// test/builders/builders-spec.ts
import sinon from 'sinon';
import should from 'should';
import nassert from 'n-assert';
import HttpZError from '../../src/error';
import builder from '../../src/builders';
import RequestBuilder from '../../src/builders/request.js';
import ResponseBuilder from '../../src/builders/response.js';

describe('builders / index', () => {
  beforeEach(() => {
    sinon.stub(RequestBuilder, 'build')
    sinon.stub(ResponseBuilder, 'build')
  })

  afterEach(() => {
    // @ts-ignore
    RequestBuilder.build.restore()
    ResponseBuilder.build.restore()
  })

  it('should throw error when messageModel is nil', () => {
    const ERR = {
      message: 'messageModel is required'
    }
    should(builder.bind(null, undefined)).throw(HttpZError, ERR)
    should(builder.bind(null, null)).throw(HttpZError, ERR)
  })

  it('should throw error when messageModel is not a plain object', () => {
    const ERR = {
      message: 'messageModel must be a plain object'
    }
    should(builder.bind(null, 123)).throw(HttpZError, ERR)
    should(builder.bind(null, true)).throw(HttpZError, ERR)
    should(builder.bind(null, 'message')).throw(HttpZError, ERR)
    should(builder.bind(null, ['message'])).throw(HttpZError, ERR)
  })

  it('should throw error when model has incorrect format', () => {
    let messageModel = {
      data: 'some data'
    }

    should(builder.bind(null, messageModel)).throw(HttpZError, {
      message: 'messageModel has incorrect format'
    })
  })

  it('should call RequestBuilder.build when messageModel is request', () => {
    let messageModel = {
      method: 'GET'
    }
    let expected = 'built-request'
    let expectedMultipleArgs = [messageModel, {}]
    // @ts-ignore
    RequestBuilder.build.returns('built-request')

    let actual = builder(messageModel)
    should(actual).eql(expected)

    nassert.assertFn({ inst: RequestBuilder, fnName: 'build', expectedMultipleArgs })
    nassert.assertFn({ inst: ResponseBuilder, fnName: 'build' })
  })

  it('should call ResponseBuilder.build when messageModel is response', () => {
    let messageModel = {
      statusCode: 200
    }
    let expected = 'built-response'
    let expectedArgs = messageModel

    ResponseBuilder.build.returns('built-response')

    let actual = builder(messageModel)
    should(actual).eql(expected)

    nassert.assertFn({ inst: RequestBuilder, fnName: 'build' })
    nassert.assertFn({ inst: ResponseBuilder, fnName: 'build', expectedArgs })
  })
})
