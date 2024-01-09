import type { FC } from "react";

import type { Props } from "./list-series";

export const ListSeriesFallback: FC<Props> = ({ itemsByPage = 10 }) => {
  return (
    <ul className="space-y-5 md:space-y-10 xl:space-y-20 pb-20">
      {Array.from(Array(itemsByPage)).map((_, i) => {
        return (
          <li key={i}>
            <div className="space-y-2 group">
              <h3 className="font-semibold tracking-[0.15em]">
                <div className="w-1/2 h-12 bg-offset animate-pulse" />
              </h3>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1">
                {Array.from(Array(12)).map((_, index) => {
                  return (
                    <div
                      key={index}
                      className="w-full h-full object-cover aspect-3/2 bg-offset animate-pulse"
                    />
                  );
                })}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
