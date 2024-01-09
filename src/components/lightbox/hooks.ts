import { useContext } from "react";

import { useSwipeable } from "react-swipeable";

import { useArrowLeft, useArrowRight } from "../../lib/hooks";

import type { Item } from "./context";
import { LightBoxContext } from "./context";

export const useLightBox = () => {
  const { open, items, setIsOpen, currentItem, setCurrentItem, direction, setDirection } =
    useContext(LightBoxContext);

  const index = items.findIndex((item) => item.src === currentItem?.src);

  return {
    open,
    setIsOpen,
    items,
    currentItem,
    setCurrentItem,
    index,
    direction,
    setDirection,
  };
};

export const useLightBoxToggle = () => {
  const { open, setIsOpen, setCurrentItem } = useContext(LightBoxContext);
  const onClose = () => setIsOpen(false);

  const onOpen = (item: Item) => {
    setIsOpen(true);
    setCurrentItem(item);
  };
  return { open, onOpen, onClose };
};

export const useLightBoxDirection = () => {
  const { open, items, currentItem, setCurrentItem, setDirection } = useContext(LightBoxContext);

  const index = items.findIndex((item) => item.src === currentItem?.src);
  const onRight = () => {
    const isLast = index === items.length - 1;
    const nextItem = items[index + 1];
    if (open) {
      setCurrentItem(isLast ? items[0] : nextItem);
      setDirection(1);
    }
  };

  const onLeft = () => {
    const isFirst = index === 0;
    const prevItem = items[index - 1];
    if (open) {
      setCurrentItem(isFirst ? items[items.length - 1] : prevItem);
      setDirection(-1);
    }
  };

  return {
    onRight,
    onLeft,
  };
};

export const useSwipeLightBox = () => {
  const { onRight, onLeft } = useLightBoxDirection();
  return useSwipeable({
    onSwipedLeft: onRight,
    onSwipedRight: onLeft,
    trackMouse: true,
  });
};

export const useArrowRightLightBox = () => {
  const { onRight } = useLightBoxDirection();
  useArrowRight(onRight);
};

export const useArrowLeftLightBox = () => {
  const { onLeft } = useLightBoxDirection();
  useArrowLeft(onLeft);
};
