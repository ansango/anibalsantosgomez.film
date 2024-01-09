import type { Metadata } from "next";
import { notFound } from "next/navigation";

import type { Props as BodySimpleProps } from "@/components/cms/body-simple";
import { BodySimple } from "@/components/cms/body-simple";
import type { Props as ContactFormProps } from "@/components/cms/forms/contact-form";
import { ContactForm } from "@/components/cms/forms/contact-form";
import type { Props as GalleryColumnsSimpleProps } from "@/components/cms/gallery-columns-simple";
import { GalleryColumnsSimple } from "@/components/cms/gallery-columns-simple";
import { HeroBigTitle } from "@/components/cms/hero-big-title";
import type { Props as HeroBigTitleProps } from "@/components/cms/hero-big-title";
import type { Props as HeroCaptionRepeatProps } from "@/components/cms/hero-caption-repeat";
import { HeroCaptionRepeat } from "@/components/cms/hero-caption-repeat";
import { HeroTitle } from "@/components/cms/hero-title";
import { ListSeries } from "@/components/cms/list-series/list-series";
import type { Props as ListSeriesProps } from "@/components/cms/list-series/list-series";
import { getPage, getPages } from "@/lib/tina";

export const revalidate = 0;

export async function generateStaticParams() {
  const pages = (await getPages()) || [];
  return pages.map((page) => ({
    params: {
      filename: page?._sys.filename,
    },
  }));
}

type PageProps = {
  params: { filename: string };
};

export async function generateMetadata({ params: { filename } }: PageProps): Promise<Metadata> {
  const data = await getPage(filename);
  const url = `${process.env.NEXT_PUBLIC_WEB_URI}${filename === "index" ? "" : `/${filename}`}`;

  const title = `${data?.title?.toLowerCase() ?? "anibal santos"} | only films `;
  const description = data?.description ?? "only films by anibal santos";
  return {
    title,
    description,
    openGraph: {
      type: "website",
      title,
      description,
      url,
    },
    alternates: {
      canonical: url,
      languages: {
        en: url,
      },
    },
  };
}

export default async function Page({ params: { filename } }: PageProps) {
  const page = await getPage(filename);
  if (!page) notFound();
  const { blocks } = page;
  return blocks?.map((block, index) => {
    const blockType = block?.__typename;
    const key = `${blockType}-${index}`;
    switch (blockType) {
      case "PageBlocksHeroTitle": {
        return <HeroTitle key={key} {...(block as HeroBigTitleProps)} />;
      }
      case "PageBlocksBigHeroTitle": {
        return <HeroBigTitle key={key} {...(block as HeroBigTitleProps)} />;
      }
      case "PageBlocksHeroCaptionRepeat": {
        return <HeroCaptionRepeat key={key} {...(block as HeroCaptionRepeatProps)} />;
      }
      case "PageBlocksBodySimple": {
        return <BodySimple key={key} {...(block as BodySimpleProps)} />;
      }
      case "PageBlocksGalleryColumnsSimple": {
        return <GalleryColumnsSimple key={key} {...(block as GalleryColumnsSimpleProps)} />;
      }
      case "PageBlocksListSeries": {
        return <ListSeries key={key} {...(block as ListSeriesProps)} />;
      }
      case "PageBlocksContactForm": {
        return block?.visible ? <ContactForm key={key} {...(block as ContactFormProps)} /> : null;
      }
      default: {
        return null;
      }
    }
  });
}
