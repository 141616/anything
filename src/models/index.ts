import { AxiosResponse } from "axios";

export interface Result {
  code: number;
  data: any;
  msg: string;
}

export interface CommonResponses extends AxiosResponse<Result> {}

export interface IUser {
  nickname: string;
  avatar: string;
}

export interface QueryProductListReq {
  page: number;
  page_size: number;
  category_id?: string;
}
