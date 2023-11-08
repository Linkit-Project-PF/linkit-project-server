import { Request, Response } from "express";
import { UserUseCase } from "../../aplication/userUseCase";

export class UserController {
  constructor(private userUseCase: UserUseCase) {}

  public getController() {}

  public postController = async (req: Request, res: Response) => {
    const user = await this.userUseCase.registerUser(req.body);
    res.send(user);
  };
}
