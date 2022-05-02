import { DocumentDefinition, FilterQuery } from "mongoose";
import MoviesModel, { MoviesDocument } from "../models/movies.model";

export async function createMovies(
  input: DocumentDefinition<MoviesDocument>
  ) {
  try {
    const user = await MoviesModel.create(input);
    return user.toJSON();
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function findMovies(query: FilterQuery<MoviesDocument>) {
  return MoviesModel.findOne(query).lean();
}


export async function deleteMovies(
  query: FilterQuery<MoviesDocument>
) {
  return MoviesModel.deleteOne(query);
}

