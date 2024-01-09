import type { FC } from "react";

import type { Template } from "tinacms";

import { cn } from "../../lib/utils";
import { HeroTitle as Title } from "../hero-title";

export type Props = {
  title?: string;
  blank?: boolean;
};

export const HeroTitle: FC<Props> = ({ title, blank }) => {
  return (
    <Title
      className={cn("-ml-2", blank ? "sr-only" : "")}
      containerClassName="!h-[50dvh] min-h-fit justify-end"
    >
      {title}
    </Title>
  );
};

export const HeroTitleTemplate: Template = {
  name: "HeroTitle",
  label: "Hero Title",
  fields: [
    {
      name: "title",
      label: "Title",
      type: "string",
    },
    {
      name: "blank",
      label: "Blank",
      type: "boolean",
    },
  ],
};
