"use client";

import type { FC } from "react";
import { useState } from "react";

import { motion } from "framer-motion";

import { cn } from "../../lib/utils";

import { LeftButton, RightButton } from "./actions";
import {
  useArrowLeftLightBox,
  useArrowRightLightBox,
  useLightBox,
  useSwipeLightBox,
} from "./hooks";

const sizes = [
  { type: "1x", width: "320w" },
  { type: "2x", width: "560w" },
  { type: "3x", width: "800w" },
  { type: "4x", width: "1040w" },
];

const mapSrc = (src: string, filename: string) => {
  const baseurl = src.split(filename)[0] + filename;
  const file = src.split(filename)[1];
  return sizes.map((size) => baseurl + "/" + size.type + file + " " + size.width).join(", ");
};

export const LightBoxContent: FC = () => {
  const { currentItem, direction } = useLightBox();
  const [imageLoading, setImageLoading] = useState(true);
  const imageLoaded = () => setImageLoading(false);
  const srcSet = mapSrc(currentItem?.src || "", currentItem?.filename || "");
  useArrowRightLightBox();
  useArrowLeftLightBox();

  return (
    <div className={"w-fit relative"}>
      <LeftButton />

      <motion.img
        {...useSwipeLightBox()}
        src={currentItem?.src || ""}
        alt="lightbox"
        className={cn("h-full object-fill max-h-[80vh] w-full hover:cursor-grabbing rounded-sm")}
        srcSet={srcSet}
        custom={direction}
        initial={{ opacity: 0 }}
        animate={{
          opacity: imageLoading ? 0 : 1,
        }}
        exit="exit"
        transition={{ opacity: { delay: 0.5, duration: 0.4 } }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={1}
        onLoad={imageLoaded}
      />

      <RightButton />
    </div>
  );
};
