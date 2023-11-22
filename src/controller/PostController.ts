import { GetPostsInputDTO, GetPostsSchema } from "../dtos/posts/getPosts.dto";
import { Request, Response } from "express";
import { CreatePostSchema } from "../dtos/posts/createPost.dto";
import { PostBusiness } from "../business/PostBusiness";
import { BaseError } from "../errors/BaseError";
import {
  DeletePostInputDTO,
  DeletePostInputSchema,
} from "../dtos/posts/deletePost.dto";

export class PostController {
  constructor(private postBusiness: PostBusiness) {}

  public getPosts = async (req: Request, res: Response) => {
    try {
      const input: GetPostsInputDTO = GetPostsSchema.parse({
        nameToSearch: req.query.name as string | undefined,
      });

      const response = await this.postBusiness.getPosts(input);

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

  public createPost = async (req: Request, res: Response) => {
    try {
      const input = CreatePostSchema.parse({
        id: req.body.id,
        creatorId: req.body.creator_id,
        content: req.body.content,
        likes: req.body.likes,
        dislikes: req.body.dislikes,
      });

      const response = await this.postBusiness.createPost(input);

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

  public updatePost = async (req: Request, res: Response) => {
    try {
      const input = CreatePostSchema.parse({
        id: req.body.id,
        creatorId: req.body.creator_id,
        content: req.body.content,
        likes: req.body.likes,
        dislikes: req.body.dislikes,
      });

      const response = await this.postBusiness.updatePost(input);

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

  public deletePost = async (req: Request, res: Response) => {
    try {
      const input: DeletePostInputDTO = DeletePostInputSchema.parse({
        id: req.params.id,
      });

      const response = this.postBusiness.deletePost(input);

      res
        .status(200)
        .send(`O ${(await response).getContent()} foi deletado com sucesso!!`);
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
