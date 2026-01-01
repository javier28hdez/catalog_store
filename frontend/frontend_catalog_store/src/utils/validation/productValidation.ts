import { z } from "zod";

export const schemaProductBase = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  stock: z.coerce
    .number()
    .int("La cantidad disponible del producto debe ser un numero entero")
    .positive("La cantidad disponible del producto debe ser mayor que 0"),
  price: z.coerce.number().positive("El precio debe ser mayor que 0"),
  moneda: z.string(),
  tags: z.string(),
  category: z.string(),
  description: z.string(),
  img_product: z
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

export const schemaProduct: z.ZodType<{
  name: string;
  stock: number;
  price: number;
  moneda: string;
  tags: string;
  category: string;
  description: string;
  img_product: File;
}> = schemaProductBase;

export type FormProductValue = z.infer<typeof schemaProduct>;
