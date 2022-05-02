import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from "mongoose";
import CharacterModel, {
  CharacterDocument,
} from "../models/character.model";

export async function createCharacter(
  input: DocumentDefinition<
    Omit<CharacterDocument, "createdAt" | "updatedAt">
  >
) {
  return CharacterModel.create(input);
}

export async function findCharacter(
  query: FilterQuery<CharacterDocument>,
  options: QueryOptions = { lean: true }
) {
  return CharacterModel.findOne(query, {}, options);
}

export async function deleteCharacter(
  query: FilterQuery<CharacterDocument>
) {
  return CharacterModel.deleteOne(query);
}