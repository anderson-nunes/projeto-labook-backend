import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";

export class PostController {
  public getPosts = async (req: Request, res: Response) => {
    try {
      const postBusiness = new PostBusiness();
      const response = await postBusiness.getPosts();

      res.status(200).send(response);
    } catch (error) {
      console.log(error);

      if (res.statusCode === 200) {
        res.status(500);
      }

      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado");
      }
    }
  };
}
