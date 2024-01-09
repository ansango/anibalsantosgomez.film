import { z } from "zod";

export const ContactFormSchema = z.object({
  fullName: z.string().min(3, {
    message: "El nombre debe tener al menos 3 caracteres",
  }),
  email: z.string().email({
    message: "El email no es válido",
  }),
  subject: z
    .string()
    .min(10, {
      message: "El asunto debe tener al menos 10 caracteres",
    })
    .max(1000, {
      message: "El asunto no puede tener más de 1000 caracteres",
    }),
  privacy: z.boolean().refine((value) => value === true, {
    message: "Debes aceptar la política de privacidad",
  }),
});

export type ContactFormSchemaType = z.infer<typeof ContactFormSchema>;
