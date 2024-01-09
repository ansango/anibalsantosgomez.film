import type { MetadataRoute } from "next";

import { getPages } from "@/lib/tina";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await getPages();

  return (
    pages?.map((page) => ({
      url: `${process.env.NEXT_PUBLIC_WEB_URI}${
        page?._sys.filename === "index" ? "" : `/${page?._sys.filename}`
      }`,
      lastModified: new Date(),
      priority: 0.5,
      changeFrequency: "monthly",
    })) || ([] as MetadataRoute.Sitemap)
  );
}
