import { Request, Response } from "express";
import { any } from "zod";
// This is the Character model and Document imported from the Character's Model
import CharacterModel, { CharacterDocument } from "../models/character.model";
import MovieModel from "../models/movies.model";
import { CreateCharacterInput, getCharacterInput } from "../schema/character.schema";
// This import all the services needed for proper implementation of the Character,
// check the Characters services for more details
import { createCharacter, deleteCharacter, findCharacter } from "../service/character.service";

//  This is a service that is used to find a Movies
import { findMovies } from "../service/movies.service";

//  This is a logger used in loging the activities to the console
import logger from "../utils/logger";


export async function createCharacterHandler(req:Request<{}, {}, CreateCharacterInput["body"]>, res:Response) {
    //Generate Character ID
  const ID = "CHARACTER" + Math.random().toString(36).substr(2, 13).toUpperCase();
    try {
        const email = req.body.email;
        const Movie_Id = req.body.movie;
        const existingCharacter = await findCharacter({email: email});
        if(existingCharacter){
            return res.status(400).json({message:"Character Already Exist"})
        }
        //@ts-ignore
        const character = await createCharacter({...req.body, Character_Id:ID, movies:Movie_Id});
        const existingMovies = await MovieModel.findById({_id: Movie_Id});
        if(!existingMovies){
            return res.status(400).json({message:"No Movies With The given ID"})
        }
        //@ts-ignore
        await existingMovies?.characters.push(character);
        existingMovies?.save();
        return res.status(200).json({status:"Success", Message:"Character Created Successfully",  data:character})
    
    } catch (error:any) {
        logger.error(`${error}`);
        return res
          .status(409)
          .json({ status: "failed", message: `${error.message}` });
    }
}


export async function getAllCharacterHandler(req: Request, res: Response) {
    try {
        const Character = await CharacterModel.find().populate("movies");
        if (!Character) {
          return res.status(409).send({
            status: "failed",
            message: "Character Doesn't Exist",
          });
        }
        return res
          .status(200)
          .json({ message: "Success", data: Character});
      } catch (error: any) {
        logger.error(`${error}`);
        return res
          .status(409)
          .json({ status: "failed", message: `${error.message}` });
      }
}

export async function getCharacterHandler(req: Request, res: Response) {
    try {
     const Id = req.params.Character_Id;
     const Character = await CharacterModel.findOne({Character_Id: Id }).populate("movies");
     if (!Character) {
       return res.status(409).json({
         status: "failed",
         message: "Character Doesn't Exist",
       });
     }
     return res
       .status(200)
       .json({ message: "Success", data: Character});
   } catch (error: any) {
     logger.error(`${error}`);
     return res
       .status(409)
       .json({ status: "failed", message: `${error.message}` });
   }
 }

export async function deleteCharacterHandler(req: Request, res: Response) {
    const Id = req.params.Character_Id;
    try {
      const Character = await findCharacter({ Character_Id: Id });
      if (!Character) {
        return res.status(409).json({
          status: "failed",
          message: "Character Doesn't Exist",
        });
      }
      await deleteCharacter({Character_Id: Id});
      return res
        .status(200)
        .json({ status: "success", message: "Character Deleted" });
    } catch (error: any) {
      logger.error(`${error}`);
      return res
        .status(409)
        .json({ status: "failed", message: `${error.message}` });
    }
  }

export async function updateCharacterHandler(req: Request, res:Response) {
    const Id = req.params.Character_Id;
    try {
      const {first_Name,last_Name, gender,dob,bio, phone, age, address, email, movie} = req.body;
      const checkCharacter =  await findCharacter({Character_Id: Id});
      if (!checkCharacter) {
        return res.status(409).json({
          status: "failed",
          message: "No Character With The Given ID",
        });
      }
      const Movie_Id = req.body.movie;
      const existingMovies = await MovieModel.findById({_id: Movie_Id});
        if(!existingMovies){
            return res.status(400).json({message:"No Movies With The given ID"})
        }
      const updateCharacter = await CharacterModel.updateOne({Character_Id:Id},{
          $set:{
            "first_Name": first_Name,
            "last_Name": last_Name,
            "gender": gender,
            "dob": dob,
            "phone": phone,
            "age": age,
            "email": email,
            "address": address,
            "movies": movie,
            "bio": bio
      }})
      return res
      .status(200)
      .json({ status: "success", message: "Character Updated"});
    } catch (error:any) {
        logger.error(`${error}`);
        return res
          .status(409)
          .json({ status: "failed", message: `${error.message}` });
      }
    }
