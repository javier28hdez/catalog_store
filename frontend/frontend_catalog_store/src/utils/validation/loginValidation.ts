import { z } from "zod";

export const schemaLoginBase = z.object({
  username: z.string().min(1, "El nombre de usuario es obligatorio"),
  password: z.string().min(1, "La contraseña es obligatoria"),
});

export const schemaLogin: z.ZodType<{
  username: string;
  password: string;
}> = schemaLoginBase;

export type FormLoginValue = z.infer<typeof schemaLogin>;
