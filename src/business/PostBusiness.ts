import { PostDatabase } from "../database/PostDatabase";
import { BadRequestError } from "../errors/BadRequestError";
import { Post } from "../models/posts";
import { PostDB } from "../types";

export class PostBusiness {
  public getPosts = async () => {
    const postDatabase = new PostDatabase();
    const postsDB = await postDatabase.findPosts();

    const posts: Post[] = postsDB.map(
      (postDB) =>
        new Post(
          postDB.id,
          postDB.creator_id,
          postDB.content,
          postDB.likes,
          postDB.dislikes,
          postDB.created_at,
          postDB.updated_at
        )
    );
    return posts;
  };

  public createPost = async (input: any) => {
    const { id, creatorId, content, likes, dislikes } = input;

    if (typeof id !== "string" || id.length < 5) {
      throw new BadRequestError(
        "O campo 'id' deve ser uma string com pelo menos 5 caracteres"
      );
    }

    if (typeof creatorId !== "string" || creatorId.length < 5) {
      throw new BadRequestError(
        "O campo 'id' deve ser uma string com pelo menos 5 caracteres"
      );
    }

    if (typeof content !== "string" || content.length < 2) {
      throw new BadRequestError(
        "O campo 'id' deve ser uma string com pelo menos 2 caracteres"
      );
    }

    if (typeof likes !== "number") {
      throw new BadRequestError("O campo 'likes' deve ser um número");
    }

    if (typeof dislikes !== "number") {
      throw new BadRequestError("O campo 'likes' deve ser um número");
    }

    const postDatabase = new PostDatabase();
    const postDBExists = await postDatabase.findPostById(id);

    if (postDBExists) {
      throw new BadRequestError("'Post' já existente");
    }

    const newPost = new Post(
      id,
      creatorId,
      content,
      likes,
      dislikes,
      new Date().toISOString(),
      new Date().toISOString()
    );

    const newPostDB: PostDB = {
      id: newPost.getId(),
      creator_id: newPost.getCreatorId(),
      content: newPost.getContent(),
      likes: newPost.getLikes(),
      dislikes: newPost.getDislikes(),
      created_at: newPost.getCreatedAt(),
      updated_at: newPost.getUpdatedAt(),
    };

    await postDatabase.insertPost(newPostDB);

    return newPost;
  };

  public updatePost = async (input: any) => {
    const { id, creatorId, content, likes, dislikes } = input;

    if (typeof id !== "string" || id.length < 4) {
      throw new BadRequestError(
        "O campo 'id' deve ser uma string com pelo menos 4 caracteres"
      );
    }

    if (typeof creatorId !== "string" || creatorId.length < 4) {
      throw new BadRequestError(
        "O campo 'creatorId' deve ser uma string com pelo menos 4 caracteres"
      );
    }

    if (typeof content !== "string" || content.length < 2) {
      throw new BadRequestError(
        "O campo 'content' deve ser uma string com pelo menos 2 caracteres"
      );
    }

    if (typeof likes !== "number") {
      throw new BadRequestError("O campo 'likes' deve ser um número");
    }

    if (typeof dislikes !== "number") {
      throw new BadRequestError("O campo 'likes' deve ser um número");
    }

    const postDatabase = new PostDatabase();
    const postDBExists = await postDatabase.findPostById(id);

    if (!postDBExists) {
      throw new BadRequestError("Usuário não econtrado");
    }

    postDBExists.id = id;
    postDBExists.creator_id = creatorId;
    postDBExists.content = content;
    postDBExists.likes = likes;
    postDBExists.dislikes = dislikes;

    await postDatabase.updatePost(postDBExists);

    return postDBExists;
  };

  public deletePost = async (input: any) => {
    const { id } = input;

    const postDatabase = new PostDatabase();
    const postDBExists = await postDatabase.findPostById(id);

    if (!postDBExists) {
      throw new BadRequestError("Não foi possível encontrar o post");
    }

    await postDatabase.deletePost(id);

    return postDBExists;
  };
}
