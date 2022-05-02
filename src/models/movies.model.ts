import mongoose, { Schema, Document } from "mongoose";



export interface MoviesDocument extends Document {
  title: string;
  Movies_Id:string;
  date_of_creation: string;
  characters: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<Boolean>;
}

const userSchema = new Schema(
  {

    title:{ type: String, required: true},
    Movies_Id:{ type: String, required: true},
    date_of_creation:{ type: String, required: true},
    characters: [{ type: Schema.Types.ObjectId, ref: "Character" }],
   
},
  { 
    toJSON:{
    transform(doc,ret){
     
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.__v;
    }
},
    timestamps: true,
  }
);

const MoviesModel = mongoose.model<MoviesDocument>("Movies", userSchema);

export default MoviesModel;
