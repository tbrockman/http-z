import _ from 'lodash'
import HttpZError from './error'

export const validateRequired = (val, field, details) => {
  if (_.isNil(val)) {
    throw HttpZError.get(`${field} is required`, details)
  }
}

export const validateString = (val, field, details) => {
  validateRequired(val, field, details)
  if (!_.isString(val)) {
    throw HttpZError.get(`${field} must be a string`, details)
  }
}

export const validateNotEmptyString = (val, field, details) => {
  validateString(val, field, details)
  if (_.isEmpty(val)) {
    throw HttpZError.get(`${field} must be not empty string`, details)
  }
}

export const validateNumber = (val, field, details) => {
  validateRequired(val, field, details)
  if (!_.isNumber(val)) {
    throw HttpZError.get(`${field} must be a number`, details)
  }
}

export const validatePositiveNumber = (val, field, details) => {
  validateNumber(val, field, details)
  if (val <= 0) {
    throw HttpZError.get(`${field} must be a positive number`, details)
  }
}

export const validateArray = (val, field, details) => {
  validateRequired(val, field, details)
  if (!_.isArray(val)) {
    throw HttpZError.get(`${field} must be an array`, details)
  }
}
