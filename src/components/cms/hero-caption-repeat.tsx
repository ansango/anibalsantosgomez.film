import type { FC } from "react";

import type { Template } from "tinacms";

import { cn } from "../../lib/utils";
import { MotionImage } from "../img";

export type Props = {
  src?: string;
  repeat?: number;
};

export const HeroCaptionRepeat: FC<Props> = ({ repeat = 3, src }) => {
  return (
    <section className="h-[60dvh] lg:h-[50dvh] flex flex-col justify-end">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
        {Array.from({ length: repeat }, (_, i) => (
          <MotionImage
            key={i}
            src={src || ""}
            className={cn(
              "w-full h-full object-cover",
              i === 0 ? "hidden sm:block" : i === 1 ? "hidden lg:block" : ""
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 * i }}
          />
        ))}
      </div>
    </section>
  );
};

export const HeroCaptionRepeatTemplate: Template = {
  name: "HeroCaptionRepeat",
  label: "Hero Caption Repeat",
  fields: [
    {
      name: "src",
      label: "Image",
      type: "image",
    },
    {
      name: "repeat",
      label: "Repeat",
      type: "number",
    },
  ],
};
