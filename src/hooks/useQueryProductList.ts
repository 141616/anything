import { useQuery } from "react-query";
import { getProductList } from "../api";
import { QueryProductListReq } from "../models";

export default (params: QueryProductListReq) => {
  return useQuery(["productList", params], ({ queryKey }) =>
    getProductList(queryKey[1] as QueryProductListReq)
  );
};
