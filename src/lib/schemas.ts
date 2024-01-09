import { z } from "zod";

export const ContactFormSchema = z.object({
  fullName: z.string().min(3, {
    message: "Must be at least 3 chars",
  }),
  email: z.string().email({
    message: "Must be a valid email",
  }),
  subject: z
    .string()
    .min(10, {
      message: "Must be at least 10 chars",
    })
    .max(1000, {
      message: "Must be less than 1000 chars",
    }),
  privacy: z.boolean().refine((value) => value === true, {
    message: "Privacy must be accepted",
  }),
});

export type ContactFormSchemaType = z.infer<typeof ContactFormSchema>;
