import type { FC } from "react";
import { Suspense } from "react";

import type { Template } from "tinacms";

import type { SerieConnectionEdges } from "../../../../tina/__generated__/types";
import { getSeries } from "../../../lib/tina";

import { ListSeriesClient } from "./list-series-client";
import { ListSeriesFallback } from "./list-series-fallback";

export type Props = {
  itemsByPage?: number;
};

export const ListSeriesPromise: FC<Props> = async ({ itemsByPage = 3 }) => {
  const data = await getSeries({
    first: itemsByPage,
    sort: "publishedAt",
    last: 1,
  });

  if (!data) return null;
  const { edges, pageInfo } = data;

  return (
    <ListSeriesClient
      {...{
        edges: edges as Array<SerieConnectionEdges>,
        pageInfo,
        itemsByPage,
      }}
    />
  );
};

export const ListSeries: FC<Props> = (props) => {
  return (
    <Suspense fallback={<ListSeriesFallback {...props} />}>
      <ListSeriesPromise {...props} />
    </Suspense>
  );
};

export const ListSeriesTemplate: Template = {
  label: "List Series",
  name: "ListSeries",
  fields: [
    {
      name: "firstItems",
      label: "First Items",
      type: "number",
    },
  ],
};
