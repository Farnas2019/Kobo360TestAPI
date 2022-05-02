import { object, number, string, TypeOf, array } from "zod";
const payload = {
  body: object({
      first_Name: string({ required_error: "First Name is required" }),
      last_Name: string({ required_error: "Last Name is required" }),
      age: string({ required_error: "Age is required" }),
      gender: string({ required_error: "Gender is required" }),
      address: string({ required_error: "Address is required" }),
      phone: string({ required_error: "Phone Number is required" }),
      dob: string({ required_error: "date of birth is required" }),
      bio: string({ required_error: "Bio is required" }),
      movie: string({ required_error: "Movie is required" }),
      email: string({ required_error: "Email is required" }).email("This Must be a valid email"),
  }),
};

const params = {
  params: object({
    Character_Id: string({
      required_error: "Character Id is required",
    }),
   Movie_Id: string({
      required_error: "Movie Id is required",
    }),
  }),
};

export const createCharacterSchema = object({
  ...payload,
});
export const getCharacterSchema = object({
  ...params,
});




export type CreateCharacterInput = TypeOf<typeof createCharacterSchema>;
export type getCharacterInput = TypeOf<typeof getCharacterSchema>;
