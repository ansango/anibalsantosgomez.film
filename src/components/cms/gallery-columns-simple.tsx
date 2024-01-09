import type { FC } from "react";

import type { Template } from "tinacms";

import { aspectRatioCn, objectPositionCn } from "../../lib/tw";
import { MotionImage } from "../img";

type Image = {
  src?: string;
  ratio?: keyof typeof aspectRatioCn;
  position?: keyof typeof objectPositionCn;
};

export type Props = {
  images?: Array<Image>;
};

export const GalleryColumnsSimple: FC<Props> = ({ images }) => {
  return (
    <div className="columns-2 md:columns-3 xl:columns-4 gap-1">
      {images?.map(({ src, ratio, position }, i) => {
        return (
          <MotionImage
            key={`cover-${i}`}
            src={src || ""}
            className={`w-full object-cover object-center pb-1 ${aspectRatioCn[ratio || "4/3"]} ${
              objectPositionCn[position || "center"]
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.09 * i }}
          />
        );
      })}
    </div>
  );
};

export const GalleryColumnsSimpleTemplate: Template = {
  name: "GalleryColumnsSimple",
  label: "Gallery Columns Simple",
  fields: [
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
};
