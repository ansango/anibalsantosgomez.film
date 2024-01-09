"use client";

import type { FC } from "react";
import { useEffect } from "react";

import { useAnimate, motion } from "framer-motion";
import type { Template } from "tinacms";

import { HeroTitle } from "../hero-title";

export type Props = {
  title?: string;
};

export const HeroBigTitle: FC<Props> = ({ title }) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const animateLoader = async () => {
      await animate([[scope.current, { x: 0, width: "87%" }]], {
        duration: 2,
      });
    };
    animateLoader();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <HeroTitle
      className="big-title relative flex justify-center"
      containerClassName="container flex w-fit relative"
    >
      <motion.div ref={scope} className="absolute bg-secondary h-full" />
      <span className="z-10 relative top-3 italic">{title}</span>
    </HeroTitle>
  );
};

export const HeroBigTitleTemplate: Template = {
  name: "BigHeroTitle",
  label: "Hero Big Title",
  fields: [
    {
      name: "title",
      label: "Title",
      type: "string",
    },
  ],
};
