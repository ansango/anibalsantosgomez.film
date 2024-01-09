import { sendMail, CONFIG as MAIL_CONFIG } from "@/lib/mail";
import type { ContactFormSchemaType } from "@/lib/schemas";
import { clientHtml, submission } from "@/lib/templates";

export async function POST(request: Request) {
  const {
    email,
    fullName,
    privacy,
    subject: message,
  } = (await request.json()) as ContactFormSchemaType;

  if (!email || !fullName || !privacy || !message) {
    return new Response("Missing required fields", { status: 400 });
  } else {
    try {
      await sendMail({
        to: MAIL_CONFIG.from,
        from: MAIL_CONFIG.from,
        subject: `New message from anibalsantosgomez.com`,
        html: submission({ email, name: fullName, message }),
      });
      await sendMail({
        to: email,
        from: MAIL_CONFIG.from,
        subject: `Thanks for contacting me!`,
        html: clientHtml({ lang: "en", name: fullName }),
      });
      return new Response("Message sent!");
    } catch (error) {
      return new Response("Error sending message", { status: 500 });
    }
  }
}
