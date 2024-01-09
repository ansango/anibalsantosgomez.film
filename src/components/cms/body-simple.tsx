"use client";

import type { FC } from "react";

import { motion } from "framer-motion";
import type { Template } from "tinacms";
import type { TinaMarkdownContent } from "tinacms/dist/rich-text";
import { TinaMarkdown } from "tinacms/dist/rich-text";

import { FADE_UP_ANIMATION_VARIANTS } from "../../lib/animations";
import { maxWidthCn } from "../../lib/tw";

export type Props = {
  content?: TinaMarkdownContent | TinaMarkdownContent[];
  width?: keyof typeof maxWidthCn;
};

export const BodySimple: FC<Props> = ({ content, width = "2xl" }) => {
  return content ? (
    <motion.section
      className={maxWidthCn[width]}
      initial="hidden"
      animate="show"
      viewport={{ once: true }}
      variants={FADE_UP_ANIMATION_VARIANTS}
    >
      <TinaMarkdown content={content} />
    </motion.section>
  ) : null;
};

export const BodySimpleTemplate: Template = {
  name: "BodySimple",
  label: "Body Simple",
  fields: [
    {
      name: "content",
      label: "Content",
      type: "rich-text",
    },
    {
      name: "width",
      label: "Max Width",
      type: "string",
      options: Object.keys(maxWidthCn),
    },
  ],
};
