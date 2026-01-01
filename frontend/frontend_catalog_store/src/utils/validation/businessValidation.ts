import { z } from "zod";

export const schemaBusinessBase = z.object({
  name: z.string().min(1, "El nombre del negocio es obligatorio"),
  eslogan: z.string().optional(),
  address: z.string().min(1, "La direccion es obligatoria"),
  telephone: z
    .string()
    .min(8, "El numero debe tener 8 digitos")
    .max(8, "El numero debe tener 8 digitos"),
  email_business: z.string().email(),
  description: z.string(),
  img_business: z
    .instanceof(File, { message: "Debe seleccionar una imagen" })
    .refine(
      (file) => file.size <= 5_242_880,
      "El archivo no debe exceder de 5MB"
    )
    .refine(
      (file) => ["image/jpeg", "image/png", "image/jpg"].includes(file.type),
      "Solo se permiten archivos JPG, JPEG o PNG"
    ),
});

export const schemaBusiness: z.ZodType<{
  name: string;
  eslogan?: string | undefined;
  address: string;
  telephone: string;
  email_business: string;
  description: string;
  img_business: File;
}> = schemaBusinessBase;

export type FormBusinessValue = z.infer<typeof schemaBusiness>;
