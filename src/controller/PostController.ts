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

  public createPost = async (req: Request, res: Response) => {
    try {
      const input = {
        id: req.body.id,
        creatorId: req.body.creator_id,
        content: req.body.content,
        likes: req.body.likes,
        dislikes: req.body.dislikes,
      };

      const postBusiness = new PostBusiness();
      const response = await postBusiness.createPost(input);

      res
        .status(201)
        .send(`O ${response.getContent()} foi criado com sucesso!!`);
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

  public updateUsers = async (req: Request, res: Response) => {
    try {
      const input = {
        id: req.body.id,
        creatorId: req.body.creator_id,
        content: req.body.content,
        likes: req.body.likes,
        dislikes: req.body.dislikes,
      };

      const postBusiness = new PostBusiness();
      const response = await postBusiness.updatePost(input);

      res
        .status(200)
        .send(`Post do ${response.creator_id} atualizado com sucesso `);
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

  public deletePost = async (req: Request, res: Response) => {
    try {
      const input = {
        id: req.params.id,
      };

      const postBusiness = new PostBusiness();
      const response = postBusiness.deletePost(input);

      res
        .status(200)
        .send(`O ${(await response).content} foi deletado com sucesso!!`);
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
