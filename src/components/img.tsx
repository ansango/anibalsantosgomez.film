"use client";

import type { FC } from "react";

import type { AnimationProps } from "framer-motion";
import { motion } from "framer-motion";

import { cn } from "../lib/utils";

export const MotionImage: FC<
  {
    src: string;
    layoutId?: string;
    className?: string;
  } & AnimationProps
> = ({ className, ...rest }) => {
  return <motion.img className={cn(className)} {...rest} alt="" />;
};
