import { useQuery } from "react-query";
import { getCategoryList } from "../api";

export default () => {
  return useQuery("categoryList", () => getCategoryList());
};
