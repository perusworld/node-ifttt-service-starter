import { NextFunction, Request, Response, Router } from "express";

export abstract class BaseAPI {
  path: string;
  serviceKey: string = `${process.env.SERVICE_KEY}`;

  /**
   * Constructor
   *
   * @class BaseAPI
   * @constructor
   */
  constructor(path: string) {
    this.path = path;
  }

  public getPath(): string {
    return this.path;
  }

  /**
   * buildRoutes
   */
  public buildRoutes(router: Router) {
    console.log("[BaseAPI::create] Creating api route.");

    router.use((req: Request, res: Response, next: NextFunction) => {
      let channelKey = req.header('IFTTT-Channel-Key');
      let serviceKey = req.header('IFTTT-Service-Key');
      if (this.serviceKey === channelKey && this.serviceKey === serviceKey) {
        next();
      } else {
        this.sendError(res, 401, 'invalid request');
      }
    });
    this.mapRoutes(router);
  }

  public isTestMode(req: Request): boolean {
    return '1' === req.header('IFTTT-Test-Mode');
  }

  public resolveLimit(req: Request): number {
    let ret = req.body.limit;
    if (this.isTestMode(req) && !ret && 0 != ret) {
      ret = 3;
    }
    return ret;
  }

  public sendError(res: Response, statusCode: number, message: string) {
    res.status(statusCode).json({
      "errors": [
        { "message": message }
      ]
    });
  }

  public resolveTriggerField(req: Request, key: string): string {
    return req.body.triggerFields ? req.body.triggerFields[key] : null;
  }

  public resolveActionField(req: Request, key: string): string {
    return req.body.actionFields ? req.body.actionFields[key] : null;
  }

  abstract mapRoutes(router: Router): void;


}