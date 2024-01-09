import { defineConfig } from "tinacms";

import { BodySimpleTemplate } from "../src/components/cms/body-simple";
import { ContactFormTemplate } from "../src/components/cms/forms/contact-form";
import { GalleryColumnsSimpleTemplate } from "../src/components/cms/gallery-columns-simple";
import { HeroBigTitleTemplate } from "../src/components/cms/hero-big-title";
import { HeroCaptionRepeatTemplate } from "../src/components/cms/hero-caption-repeat";
import { HeroTitleTemplate } from "../src/components/cms/hero-title";
import { ListSeriesTemplate } from "../src/components/cms/list-series";
import { aspectRatioCn, objectPositionCn } from "../src/lib/tw";
import { kebabCase } from "../src/lib/utils";
// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    loadCustomStore: async () => {
      const pack = await import("next-tinacms-s3");
      return pack.TinaCloudS3MediaStore;
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "page",
        label: "Pages",
        path: "src/content/pages",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
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
            type: "object",
            list: true,
            name: "blocks",
            label: "Blocks",
            ui: {
              visualSelector: true,
            },
            templates: [
              HeroTitleTemplate,
              HeroBigTitleTemplate,
              HeroCaptionRepeatTemplate,
              BodySimpleTemplate,
              ListSeriesTemplate,
              GalleryColumnsSimpleTemplate,
              ContactFormTemplate,
            ],
          },
        ],
      },
      {
        name: "serie",
        label: "Series",
        path: "src/content/series",
        ui: {
          filename: {
            readonly: true,
            slugify: ({ cover }) => {
              const splitter = cover?.split("series/")[1].split("/")[0] || "";
              return splitter && kebabCase(`${splitter}`);
            },
          },
        },
        fields: [
          {
            type: "datetime",
            name: "publishedAt",
            label: "Publish date",
          },
          {
            type: "image",
            name: "cover",
            label: "Cover Url",
          },
          {
            type: "object",
            label: "Images",
            name: "images",
            list: true,
            ui: {
              itemProps: (item) => {
                const label = item?.src || "Image item";
                return { label };
              },
            },
            fields: [
              {
                name: "src",
                label: "URL",
                type: "image",
              },
              {
                name: "ratio",
                label: "Aspect ratio",
                type: "string",
                options: Object.keys(aspectRatioCn),
              },
              {
                name: "position",
                label: "Object position",
                type: "string",
                options: Object.keys(objectPositionCn),
              },
            ],
          },
        ],
      },
    ],
  },
});
