import express from "express";
import { UserController } from "../controller/UserController";
import { UserBusiness } from "../business/UserBusiness";
import { UserDatabase } from "../database/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export const userRouter = express.Router();
const userController = new UserController(
  new UserBusiness(new UserDatabase(), new IdGenerator(), new TokenManager())
);

userRouter.get("/", userController.getUsers);
userRouter.post("/", userController.signup);
userRouter.put("/:id", userController.updateUsers);
userRouter.delete("/:id", userController.deleteUsers);
