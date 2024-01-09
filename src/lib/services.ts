import type { ContactFormSchemaType } from "./schemas";
import { fetcher } from "./utils";

export const onPostContactForm = async (schema: ContactFormSchemaType) => {
  // eslint-disable-next-line no-useless-catch
  try {
    await fetcher("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(schema),
    });
    return true;
  } catch (err: unknown) {
    throw err;
  }
};
