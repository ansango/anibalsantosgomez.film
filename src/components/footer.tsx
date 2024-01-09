"use client";

import Link from "next/link";
import { useTheme } from "next-themes";

import { useMounted } from "@/lib/hooks";
import { cnContainer } from "@/lib/tw";

const darkPath = (
  <path
    fill="currentColor"
    d="M14.438 10.148c.19-.425-.321-.787-.748-.601A5.5 5.5 0 0 1 6.453 2.31c.186-.427-.176-.938-.6-.748a6.501 6.501 0 1 0 8.585 8.586"
  ></path>
);

const lightPath = (
  <path
    fill="currentColor"
    d="M8 1a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 8 1m2.5 7a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0m2.45-3.89a.75.75 0 1 0-1.06-1.06l-1.062 1.06a.75.75 0 0 0 1.061 1.062zM15 8a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 15 8m-3.11 4.95a.75.75 0 0 0 1.06-1.06l-1.06-1.062a.75.75 0 0 0-1.062 1.061zM8 12a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 8 12m-2.828-.11a.75.75 0 0 0-1.061-1.062L3.05 11.89a.75.75 0 1 0 1.06 1.06zM4 8a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 4 8m.11-2.828A.75.75 0 0 0 5.173 4.11L4.11 3.05a.75.75 0 1 0-1.06 1.06z"
  ></path>
);
const systemPath = (
  <path
    fill="currentColor"
    fillRule="evenodd"
    d="M2 4.25A2.25 2.25 0 0 1 4.25 2h7.5A2.25 2.25 0 0 1 14 4.25v5.5A2.25 2.25 0 0 1 11.75 12h-1.312c.1.128.21.248.328.36a.75.75 0 0 1 .234.545v.345a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1-.75-.75v-.345a.75.75 0 0 1 .234-.545c.118-.111.228-.232.328-.36H4.25A2.25 2.25 0 0 1 2 9.75zm2.25-.75a.75.75 0 0 0-.75.75v4.5c0 .414.336.75.75.75h7.5a.75.75 0 0 0 .75-.75v-4.5a.75.75 0 0 0-.75-.75z"
    clipRule="evenodd"
  ></path>
);

<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
  <path
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="1.5"
    d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
  ></path>
</svg>;

export const Footer = () => {
  const { setTheme, themes, theme } = useTheme();
  const isMounted = useMounted();
  return (
    <footer className="border-t border-default mt-20 md:mt-40 lg:mt-60 xl:mt-80">
      <div className={cnContainer("py-2 md:py-4 flex justify-between")}>
        <Link href="/">onlyfilms</Link>
        <ul className="flex gap-2">
          {themes.map((t) => {
            return (
              <li key={t} className="text-sm my-auto">
                <button
                  id={t}
                  aria-label={t}
                  onClick={() => setTheme(t)}
                  className={`${
                    theme === t && isMounted
                      ? "bg-offset text-primary border border-default"
                      : "bg-default text-offset"
                  } p-1.5 rounded-full`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                  >
                    {t === "dark" && darkPath}
                    {t === "light" && lightPath}
                    {t === "system" && systemPath}
                  </svg>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
};
