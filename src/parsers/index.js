const _ = require('lodash')
const consts = require('../consts')
const HttpZError = require('../error')
const RequestParser = require('./request')
const ResponseParser = require('./response')

module.exports = (plainMessage) => {
  if (_.isNil(plainMessage)) {
    throw HttpZError.get('plainMessage is required')
  }
  if (!_.isString(plainMessage)) {
    throw HttpZError.get('plainMessage must be a string')
  }

  let firstRow = _.chain(plainMessage).split(consts.EOL).head().value()
  if (consts.regexps.requestStartRow.test(firstRow)) {
    return RequestParser.parse(plainMessage)
  }
  if (consts.regexps.responseStartRow.test(firstRow)) {
    return ResponseParser.parse(plainMessage)
  }
  throw HttpZError.get('plainMessage has incorrect format')
}
