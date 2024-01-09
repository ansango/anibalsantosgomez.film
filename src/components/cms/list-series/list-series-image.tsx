"use client";

import type { FC } from "react";
import { useRef } from "react";

import { useInView } from "framer-motion";
import Image from "next/image";

import { useLightBoxToggle } from "../../lightbox";

const mapSrc = (src: string, filename: string) => {
  const baseurl = src.split(filename)[0] + filename;
  const file = src.split(filename)[1];
  return baseurl + "/1x" + file;
};

export const ListSeriesImage: FC<{
  index: number;
  src: string;
  filename: string;
}> = ({ src, index, filename }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const i = index / 15 + "s";
  const transition = `all ${i} cubic-bezier(0.17, 0.55, 0.55, 1) ${i}`;
  const { onOpen } = useLightBoxToggle();

  return (
    <Image
      priority={index < 2}
      ref={ref}
      width={320}
      height={180}
      style={{
        transform: isInView ? "none" : "translateY(5px)",
        opacity: isInView ? 1 : 0,
        transition: transition,
      }}
      onClick={() => onOpen({ src, filename })}
      src={mapSrc(src, filename)}
      alt="thumbnail"
      className={`w-full aspect-3/2 object-cover object-center hover:cursor-pointer ${
        isInView ? "" : "blur-lg animate-pulse"
      }}`}
    />
  );
};
