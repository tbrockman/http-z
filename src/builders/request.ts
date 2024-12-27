import _ from 'lodash';
import * as consts from '../consts';
import * as validators from '../validators';
import * as utils from '../utils';
import HttpZError from '../error';
import Base from './base';

export default class HttpZRequestBuilder extends Base {

  method: string
  protocolVersion: string
  target: string
  opts: any

  static build(...params) {
    // @ts-ignore
    let instance = new HttpZRequestBuilder(...params)
    return instance.build()
  }

  constructor({ method, protocolVersion, target, headers, body }, opts) {
    super({ headers, body })
    this.method = method
    this.protocolVersion = protocolVersion
    this.target = target
    this.opts = opts
  }

  // constructor(info: RequestInfo, { method, headers, body }: RequestInit, opts?: any) {
  //   super({ headers, body })
  //   this.method = method
  //   this.protocolVersion = consts.http.protocolVersions.http11
  //   this.target = typeof info === 'string' ? info : info.url
  //   this.opts = opts
  // }

  build() {
    return '' + this._generateStartRow() + this._generateHeaderRows() + consts.EOL + this._generateBodyRows()
  }

  _generateStartRow() {
    validators.validateNotEmptyString(this.method, 'method')
    validators.validateNotEmptyString(this.protocolVersion, 'protocolVersion')
    validators.validateNotEmptyString(this.target, 'target')

    return '' + this.method.toUpperCase() + ' ' + this.target + ' ' + this.protocolVersion.toUpperCase() + consts.EOL
  }

  _generateHeaderRows() {
    validators.validateArray(this.headers, 'headers')
    if (this.opts.mandatoryHost) {
      let hostHeader = _.find(this.headers, name => utils.prettifyHeaderName(name) === consts.http.headers.host)
      if (!hostHeader) {
        throw HttpZError.get('Host header is required')
      }
    }

    return super._generateHeaderRows()
  }
}
