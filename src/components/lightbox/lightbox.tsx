"use client";

import type { FC, PropsWithChildren } from "react";

import type { Item } from "./context";
import { LightBoxProvider } from "./context";
import { LightBoxContent } from "./lightbox-content";
import { LightBoxDialog } from "./lightbox-dialog";

export const LightBox: FC<
  PropsWithChildren & {
    items?: Array<Item>;
    id?: string;
  }
> = ({ children, items }) => {
  return (
    <LightBoxProvider items={items || []}>
      <LightBoxDialog>
        <LightBoxContent />
      </LightBoxDialog>
      {children}
    </LightBoxProvider>
  );
};
