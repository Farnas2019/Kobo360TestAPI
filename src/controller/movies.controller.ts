import { Request, Response } from "express";
import { any } from "zod";
import MoviesModel from "../models/movies.model";
import { CreateMoviesInput } from "../schema/movies.schema";
import { findCharacter } from "../service/character.service";
import { createMovies, deleteMovies, findMovies} from "../service/movies.service";
import logger from "../utils/logger";

export async function createMoviesHandler(
  req: Request<{}, {}, CreateMoviesInput["body"]>,
  res: Response
) {
  //Generate Movie ID
  const ID = "MOVIES" + Math.random().toString(36).substr(2, 13).toUpperCase();

  try {
    const existingMovies= await findMovies({ title: req.body.title });
    if (existingMovies) {
      return res.status(400).json({
        status: "failed",
        message: "Movie already exist.",
      });
    }    
    //@ts-ignore
    const Movie = await createMovies({ ...req.body, Movies_Id:ID });
    return res
      .status(200)
      .json({ status: "200", message: "Success", data: Movie });
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}

export async function getAllMovieHandler(req: Request, res: Response) {
   try {
    const Movies = await MoviesModel.find().populate("characters");
    if (!Movies) {
      return res.status(409).json({
        status: "failed",
        message: "Movies Doesn't Exist",
      });
    }
    return res
      .status(200)
      .json({ message: "Success", data: Movies});
  } catch (error: any) {
    logger.error(`${error}`);
    return res
      .status(409)
      .json({ status: "failed", message: `${error.message}` });
  }
}

export async function getMovieHandler(req: Request, res: Response) {
   try {
    const Id = req.params.Movie_Id;
    console.log(Id)
    const Movie = await MoviesModel.findOne({ Movies_Id: Id }).populate("characters");
    if (!Movie) {
      return res.status(409).json({
        status: "failed",
        message: "Movies Doesn't Exist",
      });
    }
    return res
      .status(200)
      .json({ message: "Success", data: Movie});
  } catch (error: any) {
    logger.error(`${error}`);
    return res
      .status(409)
      .json({ status: "failed", message: `${error.message}` });
  }
}

export async function deleteMoviesHandler(req: Request, res: Response) {
  const Id = req.params.Movies_Id;
  try {
    const Movie = await findMovies({ Movies_Id: Id });
    if (!Movie) {
      return res.status(409).json({
        status: "failed",
        message: "Movies Doesn't Exist",
      });
    }

    const existingCharacter = await findCharacter({_id:Movie.characters});
    console.log(existingCharacter)
    await deleteMovies({Movies_Id: Id});

    return res
      .status(200)
      .json({ status: "success", message: "Movie Deleted" });
  } catch (error: any) {
    logger.error(`${error}`);
    return res
      .status(409)
      .json({ status: "failed", message: `${error.message}` });
  }
}

