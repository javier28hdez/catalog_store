import { z } from "zod";

export const schemaCategoryBase = z.object({
  category_name: z.string().min(1, "La categoría es obligatoria"),
  description: z.string().optional(),
});

export const schemaCategory: z.ZodType<{
  category_name: string;
  description?: string | undefined;
}> = schemaCategoryBase;

export type FormCategoryValue = z.infer<typeof schemaCategoryBase>;
