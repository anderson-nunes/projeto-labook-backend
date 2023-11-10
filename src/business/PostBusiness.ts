import { PostDatabase } from "../database/PostDatabase";
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
      throw new Error(
        "O campo 'id' deve ser uma string com pelo menos 5 caracteres"
      );
    }

    if (typeof creatorId !== "string" || creatorId.length < 5) {
      throw new Error(
        "O campo 'id' deve ser uma string com pelo menos 5 caracteres"
      );
    }

    if (typeof content !== "string" || content.length < 2) {
      throw new Error(
        "O campo 'id' deve ser uma string com pelo menos 2 caracteres"
      );
    }

    if (typeof likes !== "number") {
      throw new Error("O campo 'likes' deve ser um número");
    }

    if (typeof dislikes !== "number") {
      throw new Error("O campo 'likes' deve ser um número");
    }

    const postDatabase = new PostDatabase();
    const postDBExists = await postDatabase.findPostById(id);

    if (postDBExists) {
      throw new Error("'id' já existente");
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
}
