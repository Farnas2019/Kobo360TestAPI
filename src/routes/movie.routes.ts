import express from "express";
import {
  createMoviesHandler,
  getAllMovieHandler,
  deleteMoviesHandler,
  getMovieHandler
} from "../controller/movies.controller";

import validateResource from "../middleware/validateResource";

import { createMoviesSchema } from "../schema/movies.schema";

const router = express.Router();

//Create Movies - POST
router.post("/", validateResource(createMoviesSchema), createMoviesHandler);

// Delete Movies - DELETE
router.delete("/:Movies_Id", deleteMoviesHandler);

//Get - GET
router.get("/", getAllMovieHandler);
router.get("/:Movie_Id", getMovieHandler);

export { router as MovieRoutes };
