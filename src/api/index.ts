// import axios from "axios";

import { CommonResponses } from "../models";
import { Request } from "../utils";

const host = "http://192.168.1.13:6001";

export const fetchUser: () => Promise<CommonResponses> = () => {
  return Request.get(`${host}/v1/user`);
};

export async function login(data: {
  client_id: string;
  provider: string;
  account: string;
  password: string;
  mobile_prefix?: string;
  from: string;
}) {
  return Request.post(`${host}/v1/signin`, data);
}

export const getCategoryList: () => Promise<CommonResponses> = () => {
  return Request.post(`${host}/v1/grandet_public/nft_get_categories`);
};

export const getProductList: (data: {
  page: number;
  page_size: number;
  category_id?: string;
}) => Promise<CommonResponses> = (data) => {
  return Request.post(`${host}/v1/grandet_public/nft_get_works`, data);
};

export default {
  fetchUser,
  login,
  getCategoryList,
  getProductList,
};
