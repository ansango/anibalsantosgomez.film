"use client";

import type { FC, PropsWithChildren } from "react";

import { motion } from "framer-motion";

import { FADE_DOWN_ANIMATION_VARIANTS } from "../lib/animations";
import { cn } from "../lib/utils";

export const HeroTitle: FC<
  PropsWithChildren & { containerClassName?: string; className?: string }
> = ({ children, className, containerClassName }) => {
  return (
    <motion.section
      className={cn("flex flex-col justify-end h-dynamic-screen -mt-14", containerClassName)}
      initial="hidden"
      animate="show"
      viewport={{ once: true }}
      variants={FADE_DOWN_ANIMATION_VARIANTS}
    >
      <motion.h1 className={className}>{children}</motion.h1>
    </motion.section>
  );
};
