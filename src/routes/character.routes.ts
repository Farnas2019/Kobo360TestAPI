import express from "express";

import validateResource from "../middleware/validateResource";

import {
  createCharacterSchema,
} from "../schema/character.schema";
import {
  createCharacterHandler,
  deleteCharacterHandler,
  getAllCharacterHandler,
  getCharacterHandler,
  updateCharacterHandler
} from "../controller/character.controller";

const router = express.Router();

router.post(
  "/",
 validateResource(createCharacterSchema),
 createCharacterHandler

);

router.get("/", getAllCharacterHandler);
router.get("/:Character_Id", getCharacterHandler);
router.delete("/:Character_Id", deleteCharacterHandler);
router.post("/:Character_Id", updateCharacterHandler);

export { router as CharacterRoute};
