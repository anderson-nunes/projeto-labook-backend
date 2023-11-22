import { DeletePostInputDTO } from "../dtos/posts/deletePost.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { PostDatabase } from "../database/PostDatabase";
import { PostDB } from "../types";
import { Post } from "../models/posts";
import {
  CreatePostInputDTO,
  CreatePostOutputDTO,
} from "../dtos/posts/createPost.dto";
import {
  GetPostsInputDTO,
  GetPostsOutputDTO,
} from "../dtos/posts/getPosts.dto";
import {
  UpdatePostInputDTO,
  UpdatePostOutputDTO,
} from "../dtos/posts/updatePost.dto";

export class PostBusiness {
  constructor(private postDataBase: PostDatabase) {}

  public getPosts = async (
    input: GetPostsInputDTO
  ): Promise<GetPostsOutputDTO> => {
    const { nameToSearch } = input;

    const postsDB = await this.postDataBase.findPosts();

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

  public createPost = async (
    input: CreatePostInputDTO
  ): Promise<CreatePostOutputDTO> => {
    const { id, creatorId, content, likes, dislikes } = input;

    const postDBExists = await this.postDataBase.findPostById(id);

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

    await this.postDataBase.insertPost(newPostDB);

    const response: CreatePostOutputDTO = {
      message: "Postregistrado com sucesso",
      posts: {
        id: newPost.getId(),
        creatorId: newPost.getCreatorId(),
        content: newPost.getContent(),
        likes: newPost.getLikes(),
        dislikes: newPost.getDislikes(),
        createdAt: newPost.getCreatedAt(),
        updatedAt: newPost.getUpdatedAt(),
      },
    };

    return response;
  };

  public updatePost = async (
    input: UpdatePostInputDTO
  ): Promise<UpdatePostOutputDTO> => {
    const { id, creatorId, content, likes, dislikes } = input;

    const postDBExists = await this.postDataBase.findPostById(id);

    if (!postDBExists) {
      throw new BadRequestError("Usuário não econtrado");
    }

    const post = new Post(
      postDBExists.id,
      postDBExists.creator_id,
      postDBExists.content,
      postDBExists.likes,
      postDBExists.dislikes,
      postDBExists.created_at,
      postDBExists.updated_at
    );

    id && post.setId(id);
    creatorId && post.setCreatorId(creatorId);
    content && post.setContent(content);
    likes && post.setLikes(likes);
    dislikes && post.setDislikes(dislikes);

    const updatePostDB: PostDB = {
      id: post.getId(),
      creator_id: post.getCreatorId(),
      content: post.getContent(),
      likes: post.getLikes(),
      dislikes: post.getDislikes(),
      created_at: post.getCreatedAt(),
      updated_at: post.getUpdatedAt(),
    };

    await this.postDataBase.updatePost(updatePostDB);

    const response: UpdatePostOutputDTO = {
      message: "Post editado com sucesso",
      posts: {
        id: post.getId(),
        creatorId: post.getCreatorId(),
        content: post.getContent(),
        likes: post.getLikes(),
        dislikes: post.getDislikes(),
        createdAt: post.getCreatedAt(),
        updatedAt: post.getUpdatedAt(),
      },
    };

    return response;
  };

  public deletePost = async (input: DeletePostInputDTO): Promise<Post> => {
    const { id } = input;

    const postDBExists = await this.postDataBase.findPostById(id);

    if (!postDBExists) {
      throw new BadRequestError("Não foi possível encontrar o post");
    }

    await this.postDataBase.deletePost(id);

    const user: Post = new Post(
      postDBExists.id,
      postDBExists.creator_id,
      postDBExists.content,
      postDBExists.likes,
      postDBExists.dislikes,
      postDBExists.created_at,
      postDBExists.updated_at
    );

    return user;
  };
}
