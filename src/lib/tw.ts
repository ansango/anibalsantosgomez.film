import { cn } from "./utils";

export const aspectRatioCn: Record<Ratio, ClassName> = {
  "4/3": "aspect-4/3",
  "4/5": "aspect-4/5",
  "5/4": "aspect-5/4",
  "9/16": "aspect-9/16",
  "2/3": "aspect-2/3",
  "3/2": "aspect-3/2",
  square: "aspect-square",
  video: "aspect-video",
};

export const objectPositionCn: Record<Position, ClassName> = {
  bottom: "object-bottom",
  center: "object-center",
  left: "object-left",
  "left-bottom": "object-left-bottom",
  "left-top": "object-left-top",
  right: "object-right",
  "right-bottom": "object-right-bottom",
  "right-top": "object-right-top",
  top: "object-top",
};

export const maxWidthCn: Record<Breakpoint, ClassName> = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  "2xl": "max-w-screen-2xl",
};

export const cnContainer = (className?: string) =>
  cn("mx-auto max-w-screen-2xl px-4 md:px-8 w-full", className);
export const cnMain = (className?: string) => cn(cnContainer(), className);
