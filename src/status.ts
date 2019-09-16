import { NextFunction, Request, Response, Router } from "express";
import { BaseAPI } from "./base-api";

export class StatusAPI extends BaseAPI {
  /**
   * Constructor
   *
   * @class StatusAPI
   * @constructor
   */
  constructor() {
    super('status');
  }

  public status(req: Request, res: Response, next: NextFunction) {
    console.log('status', JSON.stringify(req.body, null, 2));
    res.json({
    });
  }

  mapRoutes(router: Router): void {
    router.get("/", this.status.bind(this));
  }


}