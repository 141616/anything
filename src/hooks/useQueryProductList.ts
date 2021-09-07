import { useInfiniteQuery } from "react-query";
import { getProductList } from "../api";

const PAGE_SIZE = 10;

export default (categoryID: string, pageSize: number = PAGE_SIZE) => {
  const fetch = ({ pageParam = 1 }) => {
    return getProductList({
      page: pageParam,
      page_size: pageSize,
      category_id: categoryID,
    });
  };

  const config = {
    getNextPageParam: (last: any) => last.nextPage,
  };

  const key = `productList-${categoryID}`;

  return useInfiniteQuery(key, fetch, config);
};
