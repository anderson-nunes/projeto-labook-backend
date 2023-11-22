import z from "zod";

export interface UpdatePostInputDTO {
  id: string;
  creatorId: string;
  content: string;
  likes: number;
  dislikes: number;
}

export interface UpdatePostOutputDTO {
  message: string;
  posts: {
    id: string;
    creatorId: string;
    content: string;
    likes: number;
    dislikes: number;
    createdAt: string;
    updatedAt: string;
  };
}

export const UpdatePostSchema = z
  .object({
    id: z.string().min(1),
    creatorId: z.string().min(5),
    content: z.string().min(2),
    likes: z.number(),
    dislikes: z.number(),
  })
  .transform((data) => data as UpdatePostInputDTO);
