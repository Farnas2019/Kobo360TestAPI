import mongoose, { Schema, Document } from "mongoose";

// This is a Character interface that extends Mongoose Document, this is part of inheritance in object oriented programming


export interface CharacterDocument extends Document {
  first_Name: string;
  last_Name: string;
  gender: string;
  email: string;
  phone: string;
  address: string;
  bio: string;
  age: string;
  Character_Id:string;
  movies: [string]; 
  createdAt: Date;
  updatedAt: Date;
}


const concentSchema = new Schema(
  {
    first_Name:{
      type: String,
      required: true
    },
    last_Name:{
      type: String,
      required: true
    },
    gender:{
      type: String,
      required: true
    },
    age:{
      type: String,
      required: true
    },
    email:{
      type: String,
      required: true,
      unique: true
    },
    phone:{
      type: String,
      required: true
    },
    address:{
      type: String,
      required: true
    },
    bio:{
      type: String,
      required: true
    },
    movies:[{type: Schema.Types.ObjectId, ref: "Movies"}],
    Character_Id:{
      type: String,
      required: true
    },
  },
  { toJSON:{
    transform(doc,ret){
     
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.__v;
        delete ret._id;
    }
},
    timestamps: true,
  }
);

const CharacterModel = mongoose.model<CharacterDocument>(
  "Character",
  concentSchema
);

export default CharacterModel;
