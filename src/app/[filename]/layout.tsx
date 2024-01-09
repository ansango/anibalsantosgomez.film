"use client";

import type { PropsWithChildren } from "react";

import { motion } from "framer-motion";

import { cnMain } from "@/lib/tw";

export default function Layout({ children }: PropsWithChildren) {
  return <motion.main className={cnMain("space-y-16 md:space-y-20")}>{children}</motion.main>;
}
