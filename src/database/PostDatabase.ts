import { PostDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase {
  public static TABLE_POST = "posts";

  public async findPosts(): Promise<PostDB[]> {
    const postsDB: PostDB[] = await BaseDatabase.connection(
      PostDatabase.TABLE_POST
    );
    return postsDB;
  }

  public async findPostById(id: string): Promise<PostDB | undefined> {
    const [postsDB]: PostDB[] | undefined[] = await BaseDatabase.connection(
      PostDatabase.TABLE_POST
    ).where({ id });

    return postsDB;
  }

  public async insertPost(newPost: PostDB): Promise<void> {
    await BaseDatabase.connection(PostDatabase.TABLE_POST).insert(newPost);
  }

  public async updatePost(newPost: PostDB): Promise<void> {
    await BaseDatabase.connection(PostDatabase.TABLE_POST)
      .where({ id: newPost.id })
      .update({
        creator_id: newPost.creator_id,
        content: newPost.content,
        likes: newPost.likes,
        dislikes: newPost.dislikes,
      });
  }

  public async deletePost(id: string): Promise<void> {
    await BaseDatabase.connection(PostDatabase.TABLE_POST)
      .where({ id })
      .delete();
  }
}
