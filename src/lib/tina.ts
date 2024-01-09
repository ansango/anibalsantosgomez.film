import tina from "../../tina/__generated__/client";
import type { SerieConnectionQueryVariables } from "../../tina/__generated__/types";

export async function getPages() {
  try {
    const {
      data: {
        pageConnection: { edges },
      },
    } = await tina.queries.pageConnection();
    return edges && edges.map((edge) => edge?.node);
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getPage(filename: string) {
  try {
    const {
      data: { page },
    } = await tina.queries.page({ relativePath: `${filename}.md` });
    return page;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const getSeries = async (options?: SerieConnectionQueryVariables) => {
  try {
    const {
      data: {
        serieConnection: { pageInfo, totalCount, edges },
      },
    } = await tina.queries.serieConnection(options);
    return {
      pageInfo,
      totalCount,
      edges,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export async function getSerie(filename: string) {
  try {
    const {
      data: { serie },
    } = await tina.queries.serie({ relativePath: `${filename}.md` });

    const series = await getSeries();

    const index = series?.edges?.findIndex((edge) => edge?.node?._sys?.filename === filename) || 0;
    const nextSerie = series?.edges?.[index + 1]?.node || null;
    const prevSerie = series?.edges?.[index - 1]?.node || null;

    return { serie, nextSerie, prevSerie };
  } catch (error) {
    console.error(error);
    return null;
  }
}
