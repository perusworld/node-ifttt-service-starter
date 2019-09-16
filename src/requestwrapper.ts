import * as request from "request";
import { v4 as uuid } from "uuid";

export class RequestWrapper {
  conf: any;
  serviceKey: string = `${process.env.SERVICE_KEY}`;
  public constructor(conf: any) {
    this.conf = {
      ...conf
    };

    if (this.conf.httpProxy && "" !== this.conf.httpProxy) {
      console.log("using proxy", this.conf.httpProxy);
    }
  }

  protected getTimestamp(): string {
    return "" + Math.floor((new Date()).getTime());
  }

  protected getNonce = function (): string {
    var hrtime = process.hrtime();
    return "" + (hrtime[0] * 1e9 + hrtime[1]);
  };

  public send(ctx: any): Promise<any> {
    return new Promise((resolve, reject) => {

      let req = <any>{
        uri: this.conf.urlPrefix + ctx.endpoint,
        method: ctx.method,
        headers: {
          'IFTTT-Service-Key': this.serviceKey,
          'Accept': 'application/json',
          'Accept-Charset': 'utf-8',
          'Accept-Encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
          'X-Request-ID': uuid()
        }
      };
      if ("POST" == ctx.method) {
        req.json = ctx.payload;
      } else if ("GET" == ctx.method) {
        req.qs = ctx.payload;
      }
      if (this.conf.httpProxy && "" !== this.conf.httpProxy) {
        req.proxy = this.conf.httpProxy;
      }
      request(req, function (error: any, response: request.RequestResponse, body: any) {
        if (error) {
          reject(error);
        } else if (200 == response.statusCode) {
          resolve(typeof body == "string" ? JSON.parse(body) : body);
        } else {
          reject(body);
        }
      });
    });
  };
}
