import mongoClient from "./modules/shared/mongoClient.js";
import { DenunciationsRoutes } from "./modules/denunciations/index.js";

const Routes = [
  ...DenunciationsRoutes
];

export default class App {
  async bootstrap(){
    await mongoClient.connect();
  }
  router(req, res){
    const route = Routes.find(route => route.verify(req));
    if(route){
      return route.dispatch(req, res);
    }

    // not found - todo: handle it better
    res.statusCode = 404;
    res.setHeader('content-Type', 'Application/json');
    res.end(JSON.stringify({
      "message": "invalid endpoint",
    }))
  }
}
