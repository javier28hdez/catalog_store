import { z } from "zod";

export const schemaRegisterBase = z
  .object({
    first_name: z.string().min(1, "El nombre es obligatorio"),
    last_name: z.string().min(1, "El apellido es obligatorio"),
    username: z.string().min(1, "El nombre de usuario es obligatorio"),
    email: z.string().email("Correo electrónico incorrecto"),
    telephone: z
      .string()
      .min(8, "El numero de telefono debe tener 8 caracteres")
      .max(8, "El numero de telefono debe tener 8 caracteres"),
    ci: z
      .string()
      .min(11, "El numero de telefono debe tener 11 caracteres")
      .max(11, "El numero de telefono debe tener 11 caracteres"),
    password: z
      .string()
      .min(6, "La contraseña debe ser mínimo de 6 caracteres"),
    confirm_password: z
      .string()
      .min(6, "La contraseña debe ser mínimo de 6 caracteres"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Las contrseñas tiene que ser iguales",
  });

export const schemaRegister: z.ZodType<{
  first_name: string;
  last_name: string;
  username: string;
  telephone: string;
  ci: string;
  password: string;
  confirm_password: string;
}> = schemaRegisterBase;

export type FormRegisterValue = z.infer<typeof schemaRegister>;
