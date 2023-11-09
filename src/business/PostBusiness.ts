import { PostDatabase } from "../database/PostDatabase";
import { Post } from "../models/posts";

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
}
