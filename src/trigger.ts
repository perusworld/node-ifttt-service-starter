import { NextFunction, Request, Response, Router } from "express";
import * as moment from 'moment';
import { v4 as uuid } from "uuid";
import { BaseAPI } from "./base-api";

export class TriggerAPI extends BaseAPI {
  /**
   * Constructor
   *
   * @class TriggerAPI
   * @constructor
   */
  constructor() {
    super('triggers');
  }

  public helloTrigger(req: Request, res: Response, next: NextFunction) {
    console.log('helloTrigger', JSON.stringify(req.body, null, 2));
    let limit = this.resolveLimit(req);
    if (!limit && 0 !== limit) {
      limit = 1;
    }
    let msg = this.resolveTriggerField(req, 'msg');
    if (msg) {
      let msg = req.body.triggerFields.msg;
      let data = [];
      for (let idx = 0; idx < limit; idx++) {
        data.push({
          msg: `Got ${msg}`,
          created_at: new Date(),
          meta: {
            id: uuid(),
            "timestamp": moment().unix()
          }
        });
      }
      console.log('sending', data);
      res.json({
        data: data.reverse()
      });
    } else {
      this.sendError(res, 400, 'no message');
    }
  }

  public onTriggerRemove(req: Request, res: Response, next: NextFunction) {
    console.log('onTriggerRemove', JSON.stringify(req.body, null, 2));
    res.json({});
  }

  mapRoutes(router: Router): void {
    router.post("/hello_trigger", this.helloTrigger.bind(this));
    router.delete("/hello_trigger/trigger_identity/:triggerId", this.onTriggerRemove.bind(this));
  }

}