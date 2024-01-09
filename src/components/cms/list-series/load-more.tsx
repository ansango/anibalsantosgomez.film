"use client";

import type { Dispatch, FC, SetStateAction } from "react";
import { useEffect, useRef, useState } from "react";

import { useInView } from "framer-motion";

import type { PageInfo, SerieConnectionEdges } from "../../../../tina/__generated__/types";
import { getSeries } from "../../../lib/tina";
import { Spinner } from "../../spinner";

import { ListSerieItem } from "./list-serie-item";

const fetchItems = async (
  lastCursor: string,
  itemsByPage: number,
  items: Array<SerieConnectionEdges> = [],
  setItems: Dispatch<SetStateAction<SerieConnectionEdges[]>> = () => null,
  setHasNextPage: Dispatch<SetStateAction<boolean>> = () => null
) => {
  const data = await getSeries({
    first: itemsByPage,
    before: items?.[items.length - 1]?.cursor || lastCursor,
    sort: "publishedAt",
    last: 1,
  });

  if (!data) return null;
  const { edges, pageInfo } = data;
  setItems((prev) => [...prev, ...(edges as SerieConnectionEdges[])]);
  setHasNextPage(pageInfo.hasPreviousPage);
};

type Props = {
  lastCursor: string;
  pageInfo: PageInfo;
  itemsByPage?: number;
};

export const LoadMoreSeries: FC<Props> = ({ lastCursor, pageInfo, itemsByPage = 3 }) => {
  const [items, setItems] = useState<Array<SerieConnectionEdges>>([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>(pageInfo.hasPreviousPage);
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref);

  useEffect(() => {
    if (inView) {
      fetchItems(lastCursor, itemsByPage, items, setItems, setHasNextPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <>
      {items?.map((item, i) => {
        const filename = item?.node?._sys?.filename || "";
        return (
          <li key={filename + "-client" + i++}>
            <ListSerieItem {...{ item, filename }} />
          </li>
        );
      })}

      {hasNextPage && (
        <li ref={ref} className="flex justify-center">
          <Spinner />
        </li>
      )}
    </>
  );
};
