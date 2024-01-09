import { useEffect, useState } from "react";

export const useKeyPress = (targetKey: string) => {
  const [keyPressed, setKeyPressed] = useState(false);

  const downHandler = ({ key }: { key: string }) => {
    if (key === targetKey) setKeyPressed(true);
  };

  const upHandler = ({ key }: { key: string }) => {
    if (key === targetKey) setKeyPressed(false);
  };

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return keyPressed;
};

export const useArrowRight = (action: () => void) => {
  const next = useKeyPress("ArrowRight");
  useEffect(() => {
    if (next) action();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [next]);
};

export const useArrowLeft = (action: () => void) => {
  const prev = useKeyPress("ArrowLeft");
  useEffect(() => {
    if (prev) action();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prev]);
};

export const useMounted = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
};
