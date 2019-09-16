import { NextFunction, Request, Response, Router } from "express";
import { v4 as uuid } from "uuid";
import { BaseAPI } from "./base-api";

export class ActionAPI extends BaseAPI {

  /**
   * Constructor
   *
   * @class ActionAPI
   * @constructor
   */
  constructor() {
    super('actions');
  }

  public helloAction(req: Request, res: Response, next: NextFunction) {
    console.log('helloAction', JSON.stringify(req.body, null, 2));
    let msg = this.resolveActionField(req, 'msg');
    if (msg && "" !== msg) {
      res.json({
        data: [{
          id: uuid()
        }]
      });
    } else {
      this.sendError(res, 400, 'no message');
    }
  }

  mapRoutes(router: Router): void {
    router.post("/hello_action", this.helloAction.bind(this));
  }


}