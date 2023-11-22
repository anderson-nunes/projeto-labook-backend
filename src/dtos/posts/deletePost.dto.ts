import { z } from "zod";

export const DeletePostInputSchema = z.object({
  id: z.string(),
});

export type DeletePostInputDTO = z.infer<typeof DeletePostInputSchema>;
