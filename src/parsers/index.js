import _ from 'lodash'
import * as consts from '../consts.js'
import HttpZError from '../error.js'
import RequestParser from './request.js'
import ResponseParser from './response.js'

export default (rawMessage, opts = {}) => {
  if (_.isNil(rawMessage)) {
    throw HttpZError.get('rawMessage is required')
  }
  if (!_.isString(rawMessage)) {
    throw HttpZError.get('rawMessage must be a string')
  }

  let firstRow = _.chain(rawMessage).split(consts.EOL).head().value()
  if (consts.regexps.requestStartRow.test(firstRow)) {
    return RequestParser.parse(rawMessage, opts)
  }
  if (consts.regexps.responseStartRow.test(firstRow)) {
    return ResponseParser.parse(rawMessage)
  }
  throw HttpZError.get('rawMessage has incorrect format')
}
