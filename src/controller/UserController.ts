import { GetUsersInputDTO, GetUsersSchema } from "../dtos/users/getUsers.dto";
import { Request, Response } from "express";
import { UpdateUsersSchema } from "../dtos/users/updateUsers.dto";
import { SignupSchema } from "../dtos/users/signup.dto";
import { UserBusiness } from "../business/UserBusiness";
import { LoginSchema } from "../dtos/users/login.dto";
import { BaseError } from "../errors/BaseError";
import { ZodError } from "zod";
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
        token: req.headers.authorization,
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

  public signup = async (req: Request, res: Response) => {
    try {
      const input = SignupSchema.parse({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
      });

      const response = await this.userBusiness.signup(input);

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
      const input = UpdateUsersSchema.parse({
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

  public login = async (req: Request, res: Response) => {
    try {
      const input = LoginSchema.parse({
        email: req.body.email,
        password: req.body.password,
      });

      const output = await this.userBusiness.login(input);

      res.status(200).send(output);
    } catch (error) {
      console.log(error);

      if (error instanceof ZodError) {
        res.status(400).send(error.issues);
      } else if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };
}
