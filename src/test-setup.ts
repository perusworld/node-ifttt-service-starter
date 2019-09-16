import { NextFunction, Request, Response, Router } from "express";
import { BaseAPI } from "./base-api";


export class TestSetupAPI extends BaseAPI{
  /**
   * Constructor
   *
   * @class TestSetupAPI
   * @constructor
   */
  constructor() {
    super('test');
  }

  public setup(req: Request, res: Response, next: NextFunction) {
    res.json({
      "data": {
        "samples": {
          "triggers": {
            "hello_trigger": {
              "msg": "Hi There"
            }
          },
          "actions": {
            "hello_action": {
              "msg": "Hi There"
            }
          }
        }
      }
    });
  }

  mapRoutes(router: Router): void {
    router.post("/setup", this.setup.bind(this));
  }


}