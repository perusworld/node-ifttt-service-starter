import * as bodyParser from "body-parser";
import * as express from "express";
import * as path from "path";

import { TriggerAPI } from "./trigger";
import { ActionAPI } from "./action";
import { TestSetupAPI } from "./test-setup";
import { StatusAPI } from "./status";
import { ControllerRoute } from "./controller";

/**
 * The server.
 *
 * @class Server
 */
export class Server {

  public app: express.Application;

  /**
   * Bootstrap the application.
   *
   * @class Server
   * @method bootstrap
   * @static
   * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
   */
  public static bootstrap(): Server {
    return new Server();
  }

  /**
   * Constructor.
   *
   * @class Server
   * @constructor
   */
  constructor() {
    //create expressjs application
    this.app = express();

    //configure application
    this.config();

    //add controller
    this.controller();

    //add api
    this.api();
  }

  /**
   * Create Controller View routes
   *
   * @class Server
   * @method controller
   */
  public controller() {
    let router = express.Router();
    let controllerRoutes = new ControllerRoute();
    controllerRoutes.buildRoutes(router);
    this.app.use('/', router);
  }

  /**
   * Create REST API routes
   *
   * @class Server
   * @method api
   */
  public api() {
    [new TriggerAPI(), new ActionAPI(), new TestSetupAPI(), new StatusAPI()].forEach(inst => {
      let router = express.Router();
      inst.buildRoutes(router);
      this.app.use(`/ifttt/v1/${inst.getPath()}`, router);
    });
  }

  /**
   * Configure application
   *
   * @class Server
   * @method config
   */
  public config() {
    //add static paths
    this.app.use(express.static(path.join(__dirname, "../public")));

    //configure pug
    this.app.set("views", path.join(__dirname, "../views"));
    this.app.set("view engine", "pug");

    //mount json form parser
    this.app.use(bodyParser.json());

    //mount query string parser
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));


    // catch 404 and forward to error handler
    this.app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
      err.status = 404;
      next(err);
    });

  }

}