export namespace consts {}

export class HttpZError extends Error {}

declare class HttpZParam {
  type?: 'inline' | 'attachment';
  contentType?: string;
  name: string;
  fileName?: string;
}

declare class HttpZBody {
  contentType: string;
  boundary: string;
  params: HttpZParam[];
  text: string;
}

declare class HttpZRequestModel {
  method: string;
  protocol: string;
  protocolVersion: string;
  host: string;
  path: string;
  headersSize: number;
  bodySize: number;
  queryParams?: HttpZParam[];
  headers?: HttpZParam[];
  cookies?: HttpZParam[];
  body: HttpZBody;
}

declare class HttpZResponseModel {
  protocolVersion: string;
  statusCode: number;
  statusMessage?: string;
  headersSize: number;
  bodySize: number;
  headers?: HttpZParam[];
  cookies?: HttpZParam[];
  body: HttpZBody;
}

export function parse(plainMessage: string): HttpZRequestModel | HttpZResponseModel;

export function build(messageModel: HttpZRequestModel | HttpZResponseModel): string;
