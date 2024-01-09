"use client";

import type { FC } from "react";

import { motion } from "framer-motion";

import type { PageInfo, SerieConnectionEdges } from "../../../../tina/__generated__/types";

import { ListSerieItem } from "./list-serie-item";
import { LoadMoreSeries } from "./load-more";

type Props = {
  edges: Array<SerieConnectionEdges>;
  pageInfo: PageInfo;
  itemsByPage?: number;
};

export const ListSeriesClient: FC<Props> = ({ edges, pageInfo, itemsByPage }) => {
  return (
    <motion.ul
      className="space-y-5 md:space-y-10 xl:space-y-20 pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {edges?.map((edge) => {
        const filename = edge?.node?._sys?.filename || "";
        const item = edge as SerieConnectionEdges;
        return (
          <li key={filename + "-client"}>
            <ListSerieItem {...{ item, filename }} />
          </li>
        );
      })}

      <LoadMoreSeries
        {...{
          pageInfo,
          lastCursor: edges?.[edges.length - 1]?.cursor || "",
          itemsByPage,
        }}
      />
    </motion.ul>
  );
};
