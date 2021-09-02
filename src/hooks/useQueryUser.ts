import { useQuery } from "react-query";
import { fetchUser } from "../api";

export default () => {
  return useQuery("user", () => fetchUser());
};
