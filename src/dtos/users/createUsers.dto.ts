import z from "zod";

export interface CreateUsersInputDTO {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface CreateUsersOutputDTO {
  message: string;
  users: {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    createdAt: string;
  };
}

export const CreateUsersSchema = z
  .object({
    id: z.string().min(1),
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(4),
    role: z.string().min(2),
  })
  .transform((data) => data as CreateUsersInputDTO);
