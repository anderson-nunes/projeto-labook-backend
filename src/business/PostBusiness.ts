import { PostDatabase } from "../database/PostDatabase";

export class PostBusiness {
  public getPosts = async () => {
    const postDatabase = new PostDatabase();
    const postsDB = await postDatabase.findPosts();

    const posts = postsDB.map((postData) => ({}));
  };
}
