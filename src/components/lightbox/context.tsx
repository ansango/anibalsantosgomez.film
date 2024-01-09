/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import type { FC, PropsWithChildren } from "react";
import { createContext, useState } from "react";

export type Item = {
  src?: string;
  ratio?: Ratio;
  position?: Position;
  filename?: string;
};

export type LightBoxContextType = {
  open: boolean;
  setIsOpen: (isOpen: boolean) => void;
  currentItem?: Item;
  setCurrentItem: (item?: Item) => void;
  items: Array<Item>;
  direction: number;
  setDirection: (direction: number) => void;
};

export const LightBoxContext = createContext<LightBoxContextType>({
  open: false,
  setIsOpen: (isOpen: boolean) => {},
  setCurrentItem: (item?: Item) => {},
  items: [],
  currentItem: undefined,
  direction: 0,
  setDirection: (direction: number) => {},
});

export const LightBoxProvider: FC<
  PropsWithChildren & {
    items: Array<Item>;
  }
> = ({ children, items }) => {
  const [open, setIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Item>();
  const [direction, setDirection] = useState<number>(0);

  return (
    <LightBoxContext.Provider
      value={{
        open,
        setIsOpen,
        items: items.map((item) => ({
          ...item,
          filename: item.src?.split("/").at(-2) || "",
        })),
        currentItem,
        setCurrentItem,
        direction,
        setDirection,
      }}
    >
      {children}
    </LightBoxContext.Provider>
  );
};
