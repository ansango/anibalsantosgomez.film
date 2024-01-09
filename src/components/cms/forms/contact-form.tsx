"use client";

import type { FC } from "react";
import { useCallback, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import type { Template } from "tinacms";

import type { ContactFormSchemaType } from "../../../lib/schemas";
import { ContactFormSchema } from "../../../lib/schemas";
import { onPostContactForm } from "../../../lib/services";

export type Props = {
  visible?: boolean;
  title?: string;
  description?: string;
};

export const ContactForm: FC<Props> = ({ description, title = "Contact" }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormSchemaType>({
    resolver: zodResolver(ContactFormSchema),
    mode: "all",
  });

  const areErrors = Object.keys(errors).length > 0;
  const disabled = isSubmitting || areErrors;
  const onSubmit: SubmitHandler<ContactFormSchemaType> = useCallback(
    (data) => {
      setIsSubmitting(true);
      toast.promise(onPostContactForm(data), {
        loading: "Sending message...",
        success: () => {
          reset();
          setIsSubmitting(false);
          return "Message sent";
        },
        error: () => {
          setIsSubmitting(false);
          return "Error sending message";
        },
      });
    },
    [reset]
  );
  return (
    <>
      <Toaster
        toastOptions={{
          unstyled: true,
          classNames: {
            toast:
              "bg-offset w-full px-5 py-2 font-sans shadow-md rounded-md flex items-center gap-2 text-xs",
            title: "text-xs",
            description: "text-xs",
            error: "bg-red-400",
            success: "text-green-400",
            warning: "text-yellow-400",
            info: "bg-blue-400",
          },
        }}
      />
      <section>
        {title && <h2>{title}</h2>}
        {description && <p>{description}</p>}
        <form className="grid max-w-screen-lg grid-cols-12 gap-6" onSubmit={handleSubmit(onSubmit)}>
          <label className="col-span-12 md:col-span-6">
            <span>Name</span>
            <input type="text" placeholder="" {...register("fullName")} />
            <span className={`${errors.fullName?.message ? "error-text" : "helper-text"}`}>
              {errors.fullName?.message ?? ""}
            </span>
          </label>

          <label className="col-span-12">
            <span>Email</span>
            <input type="email" placeholder="john@example.com" {...register("email")} />
            <span className={`${errors.email?.message ? "error-text" : "helper-text"}`}>
              {errors.email?.message ?? ""}
            </span>
          </label>
          <label className="col-span-12">
            <span>Message</span>
            <textarea rows={4} placeholder="¿Cómo puedo ayudarte?" {...register("subject")} />
            <span className={`${errors.subject?.message ? "error-text" : "helper-text"}`}>
              {errors.subject?.message ?? ""}
            </span>
          </label>
          <div className="col-span-12">
            <div className="mt-2">
              <div>
                <label className="items-center">
                  <input type="checkbox" {...register("privacy")} />
                  <span className="ml-2 text-sm">I accept privacy policy</span>
                  <span className={`block ${errors.privacy?.message ? "error-text" : ""}`}>
                    {errors.privacy?.message ?? ""}
                  </span>
                </label>
              </div>
            </div>
          </div>
          <button className="col-span-12 md:max-w-xs btn btn-primary" disabled={disabled}>
            Enviar
          </button>
        </form>
      </section>
    </>
  );
};
export const ContactFormTemplate: Template = {
  label: "Contact Form",
  name: "contactForm",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
    },
    {
      type: "string",
      name: "description",
      label: "Description",
      ui: {
        component: "textarea",
      },
    },
    {
      name: "visible",
      label: "Visible",
      type: "boolean",
    },
  ],
};
