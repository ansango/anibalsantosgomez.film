import type { FC } from "react";

import Balancer from "react-wrap-balancer";

import type { SerieConnectionEdges } from "../../../../tina/__generated__/types";
import { replaceSpanishMonthsByEnglish } from "../../../lib/utils";
import type { Item } from "../../lightbox";
import { LightBox } from "../../lightbox";

import { ListSeriesImage } from "./list-series-image";

type Props = {
  filename: string;
  item: SerieConnectionEdges;
};

export const ListSerieItem: FC<Props> = ({ filename, item }) => {
  return (
    <LightBox items={(item.node?.images as Item[]) || []}>
      <div className="space-y-2 group">
        <h3 className="font-semibold tracking-[0.15em]">
          <Balancer>
            <span className="link-simple">
              {replaceSpanishMonthsByEnglish(filename?.replaceAll("-", " "))}
            </span>
          </Balancer>
        </h3>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1">
          {item.node?.images?.map((image, index) => {
            return (
              <ListSeriesImage
                key={index + "-client" + index++}
                index={index}
                src={image?.src || ""}
                filename={filename}
              />
            );
          })}
        </div>
      </div>
    </LightBox>
  );
};
