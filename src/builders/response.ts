import * as consts from '../consts.js'
import * as validators from '../validators.js'
import Base from './base.js'

export default class HttpZResponseBuilder extends Base {

  method: string
  protocolVersion: string
  statusCode: number
  statusMessage: string
  opts: any

  static build(...params) {
    // @ts-ignore
    let instance = new HttpZResponseBuilder(...params)
    return instance.build()
  }

  constructor({ protocolVersion, statusCode, statusMessage, headers, body }) {
    super({ headers, body })
    this.protocolVersion = protocolVersion
    this.statusCode = statusCode
    this.statusMessage = statusMessage
  }

  build() {
    return '' + this._generateStartRow() + this._generateHeaderRows() + consts.EOL + this._generateBodyRows()
  }

  _generateStartRow() {
    validators.validateNotEmptyString(this.protocolVersion, 'protocolVersion')
    validators.validatePositiveNumber(this.statusCode, 'statusCode')
    validators.validateNotEmptyString(this.statusMessage, 'statusMessage')

    let protocolVersion = this.protocolVersion.toUpperCase()
    return `${protocolVersion} ${this.statusCode} ${this.statusMessage}` + consts.EOL
  }
}
