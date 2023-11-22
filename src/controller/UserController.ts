import { GetUsersInputDTO, GetUsersSchema } from "../dtos/users/getUsers.dto";
import { Request, Response } from "express";
import { CreateUsersSchema } from "../dtos/users/createUsers.dto";
import { UserBusiness } from "../business/UserBusiness";
import { BaseError } from "../errors/BaseError";
import {
  DeleteUsersInputDTO,
  DeleteUsersInputSchema,
} from "../dtos/users/deleteUsers.dto";

export class UserController {
  constructor(private userBusiness: UserBusiness) {}

  public getUsers = async (req: Request, res: Response) => {
    try {
      const input: GetUsersInputDTO = GetUsersSchema.parse({
        nameToSearch: req.query.name as string | undefined,
      });

      const response = await this.userBusiness.getUsers(input);

      res.status(200).send(response);
    } catch (error) {
      console.log(error);

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public createUsers = async (req: Request, res: Response) => {
    try {
      const input = CreateUsersSchema.parse({
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
      });

      const response = await this.userBusiness.createUsers(input);

      res.status(201).send(response);
    } catch (error) {
      console.log(error);

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public updateUsers = async (req: Request, res: Response) => {
    try {
      const input = CreateUsersSchema.parse({
        id: req.params.id,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
      });

      const response = await this.userBusiness.updateUsers(input);

      res.status(201).send(response);
    } catch (error) {
      console.log(error);

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };

  public deleteUsers = async (req: Request, res: Response) => {
    try {
      const input: DeleteUsersInputDTO = DeleteUsersInputSchema.parse({
        id: req.params.id,
      });

      const response = await this.userBusiness.deleteUsers(input);

      res.status(200).send(`${response.getName()} deletado com sucesso!!`);
    } catch (error) {
      console.log(error);

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };
}
