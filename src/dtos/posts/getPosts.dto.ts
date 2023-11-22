import z from "zod";
import { Post } from "../../models/posts";

export interface GetPostsInputDTO {
  nameToSearch?: string;
}

export type GetPostsOutputDTO = Post[];

export const GetPostsSchema = z
  .object({
    nameToSearch: z.string().min(1).optional(),
  })
  .transform((data) => data as GetPostsInputDTO);
