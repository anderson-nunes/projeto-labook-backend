import { z } from "zod";

export const DeleteUsersInputSchema = z.object({
  id: z.string(),
});

export type DeleteUsersInputDTO = z.infer<typeof DeleteUsersInputSchema>;
