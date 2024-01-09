"use client";

import type { FC } from "react";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cnContainer } from "@/lib/tw";

const FADE_DOWN_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0, transition: { type: "spring" } },
};

export const Header: FC = () => {
  const path = usePathname();
  const isHome = path === "/";
  return (
    <motion.header
      initial="hidden"
      animate="show"
      className={cnContainer("sticky top-0 z-30 mix-blend-normal w-full pt-2 md:pt-4")}
      variants={FADE_DOWN_ANIMATION_VARIANTS}
    >
      <nav className={"flex h-9 items-center relative z-20 justify-between"}>
        {!isHome ? <Link href={"/"}>only films</Link> : <span />}
        <div className="flex gap-2 md:gap-3">
          <Link href={"/series"} className={path === "/series" ? "active-link" : ""}>
            series
          </Link>
          <Link href={"/about"} className={path === "/about" ? "active-link" : ""}>
            about
          </Link>
        </div>
      </nav>
    </motion.header>
  );
};
