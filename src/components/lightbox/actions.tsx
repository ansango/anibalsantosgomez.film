import type { FC, PropsWithChildren } from "react";

import { cn } from "../../lib/utils";

import { useLightBoxDirection } from "./hooks";

type ActionButtonProps = {
  onClick?: () => void;
};

const ActionButtonDialog: FC<
  PropsWithChildren &
    ActionButtonProps & {
      className?: string;
      id?: string;
    }
> = ({ children, onClick, className, id }) => {
  return (
    <button
      id={"lightbox-button-" + id}
      aria-label={id}
      type="button"
      className={cn(
        "absolute rounded-full bg-black/10 p-1.5 text-white/75 backdrop-blur-3xl transition hover:bg-black/50 hover:text-white focus:outline-none",
        className
      )}
      {...{ onClick }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        className="w-3 h-3"
      >
        {children}
      </svg>
    </button>
  );
};

export const RightButton: FC = () => {
  const { onRight } = useLightBoxDirection();
  return (
    <ActionButtonDialog
      onClick={onRight}
      className="right-3 top-[calc(50%-16px)]"
      id="right-button"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m8.25 4.5l7.5 7.5l-7.5 7.5"
      ></path>
    </ActionButtonDialog>
  );
};
export const LeftButton: FC = () => {
  const { onLeft } = useLightBoxDirection();
  return (
    <ActionButtonDialog onClick={onLeft} className="left-3 top-[calc(50%-16px)]" id="left-button">
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M15.75 19.5L8.25 12l7.5-7.5"
      ></path>
    </ActionButtonDialog>
  );
};
