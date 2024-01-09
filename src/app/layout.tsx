import type { PropsWithChildren } from "react";

import "./globals.css";
import type { Metadata } from "next";
import { Inter, PT_Serif, Bebas_Neue } from "next/font/google";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Theme } from "@/components/theme";

const display = Bebas_Neue({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--display",
  display: "swap",
});

const serif = PT_Serif({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--serif",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aníbal Santos | only films",
  description: "A chemical photo portfolio by Aníbal Santos",
  authors: [
    {
      name: "Anibal Santos",
      url: `${process.env.NEXT_PUBLIC_WEB_URI}`,
    },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Anibal Santos",
    countryName: "Spain",
    emails: ["anibalsantosgo@gmail.com"],
  },
  alternates: {
    media: {
      "image/png": `${process.env.NEXT_PUBLIC_WEB_URI}/avatar.jpeg`,
    },
  },
  robots: {
    follow: true,
    index: true,
    "max-image-preview": "standard",
    notranslate: true,
    "max-snippet": 100,
  },
};

const nextConf = { suppressHydrationWarning: true };

export default function RootLayout({ children }: PropsWithChildren) {
  const fonts = `${display.variable} ${serif.variable} ${sans.variable}`;

  return (
    <html
      {...nextConf}
      lang="en"
      className="font-sans text-base bg-default text-default selection:bg-secondary selection:text-white"
    >
      <body
        {...nextConf}
        className={`${fonts} h-dynamic-screen justify-between flex flex-col bg-hero-topography-primary-light-10 dark:bg-hero-topography-primary-dark-10`}
      >
        <link href="/site.webmanifest" rel="manifest" />
        <link href="/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
        <link href="/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
        <link href="/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
        <link color="#4a9885" href="/safari-pinned-tab.svg" rel="mask-icon" />
        <meta content="#ffffff" name="theme-color" />
        <meta content="#ffffff" name="msapplication-TileColor" />
        <meta content="/browserconfig.xml" name="msapplication-config" />
        <Theme>
          <Header />
          {children}
          <Footer />
        </Theme>
      </body>
    </html>
  );
}
