import type { ClassValue } from "clsx";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind CSS classnames generator
 * @param args
 * @returns Tailwind CSS classnames
 * @example
 * cn("text-red-500", "bg-blue-500");
 * => "text-red-500 bg-blue-500"
 **/

export const cn = (...args: ClassValue[]) => twMerge(clsx(...args));

/**
 * Fetcher
 * @param url  string
 * @param options  RequestInit
 * @returns  Promise<T>
 * @example
 * const data = await fetcher<{ name: string }>("https://api.github.com/repos/vercel/swr");
 * console.log(data.name);
 **/

export async function fetcher<T>(url: string, options?: RequestInit) {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error("Bad response from server", { cause: response });
    }

    return (await response.json()) as Promise<T>;
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * revalidation
 * @param milliseconds number (default: 3600)
 * @returns number
 * @example
 * revalidation(3600);
 * => 3600
 *
 */

export function revalidation(milliseconds: number = 3600) {
  return process.env.NODE_ENV === "development" ? 0 : milliseconds;
}

/**
 * getAltImage
 * @param src string
 * @param format ".webp" | ".jpg" | ".jpeg"
 * @returns string
 * @example
 * getAltImage("https://example.com/image.webp", ".webp");
 * => "image"
 */

export function getAltImage(src: string, format: ".webp" | ".jpg" | ".jpeg" = ".webp") {
  return src?.split("/").pop()?.replaceAll(format, "") || "";
}

/**
 * kebabCase
 * @param str string
 * @returns string
 * @example
 * kebabCase("Hello World");
 * => "hello-world"
 */

export function kebabCase(str: string) {
  const matcher = str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g);

  return (matcher && matcher.map((x) => x.toLowerCase()).join("-")) ?? "";
}

const SpanishMonths = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];
const EnglishMonths = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

/**
 * replaceSpanishMonthsByEnglish
 * @param title string
 * @returns string
 * @example
 * replaceSpanishMonthsByEnglish("El 1 de enero de 2021");
 * => "El 1 de january de 2021"
 */

export const replaceSpanishMonthsByEnglish = (title: string) => {
  const titleArray = title?.split(" ");
  const month = titleArray?.[1];
  const monthIndex = SpanishMonths?.indexOf(month);
  const newMonth = EnglishMonths?.[monthIndex];
  return title.replace(month, newMonth);
};
