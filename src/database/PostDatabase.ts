import { PostDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase {
  public static TABLE_POST = "posts";

  public async findPost(): Promise<PostDB[]> {
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

  public async updatePost(post: PostDB): Promise<void> {
    await BaseDatabase.connection(PostDatabase.TABLE_POST)
      .where({ id: post.id })
      .update({
        creator_id: post.creator_id,
        content: post.content,
        likes: post.likes,
        dislikes: post.dislikes,
      });
  }

  public async deletePost(id: string): Promise<void> {
    await BaseDatabase.connection(PostDatabase.TABLE_POST)
      .where({ id })
      .delete();
  }
}
