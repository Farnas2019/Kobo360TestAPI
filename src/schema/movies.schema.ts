import { object, string, number, TypeOf } from "zod";

export const createMoviesSchema = object({
  body: object({
    title: string({
      required_error: "Title is required",
    }),
    date_of_creation: string({
      required_error: "Date of creation is required",
    })
  }),
});

const params = {
  params: object({
    Movie_Id: string({
      required_error: "Movies Id is required",
    }),
  }),
};
export const getMoviesSchema = object({
  ...params,
});

export type CreateMoviesInput = 
  TypeOf<typeof createMoviesSchema>;
export type getUserInput = 
  TypeOf<typeof getMoviesSchema>;
