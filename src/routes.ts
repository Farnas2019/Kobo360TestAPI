import { Express, Request, Response } from "express";
import {MovieRoutes} from "./routes/movie.routes";
import { CharacterRoute } from "./routes/character.routes";
function routes(app: Express) {
  app.use("/api/v1/movies", MovieRoutes)
  app.use("/api/v1/character", CharacterRoute);

  app.get("/", function(req:Request, res:Response){
    res.send("To view the documentation visit https://documenter.getpostman.com/view/9038236/UyrGCZui" )
  })
}

export default routes;
