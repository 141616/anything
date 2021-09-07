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

export const getProductList: (params: {
  page: number;
  page_size: number;
  category_id?: string;
}) => Promise<{
  list: any[];
  total: number;
  page: number;
  nextPage: number | undefined;
  pageSize: number;
}> = async (params) => {
  try {
    const { data } = await Request.post(
      `${host}/v1/grandet_public/nft_get_works`,
      params
    );

    const list = data?.data.list || [];
    const total = data?.data.total || 0;
    const { page, page_size } = params;
    const hasNext = total > page * page_size;

    return Promise.resolve({
      list,
      total,
      page,
      nextPage: hasNext ? page + 1 : undefined,
      pageSize: params.page_size,
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  fetchUser,
  login,
  getCategoryList,
  getProductList,
};
