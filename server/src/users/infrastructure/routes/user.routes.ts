import { Router } from "express";
import { airtableRepository } from "../repository/airtable.repository";
import { UserUseCase } from "../../aplication/userUseCase";
import { UserController } from "../controllers/user.controller";

const user_route = Router();

const airtableUserRepo = new airtableRepository();
const userUseCase = new UserUseCase(airtableUserRepo);
const userController = new UserController(userUseCase);

user_route.post("/register", userController.postController);
user_route.get("/login");

export default user_route;
