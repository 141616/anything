import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export const Request = axios.create({
  timeout: 20 * 1000,
});

// 请求前拦截
const requestInterceptor = (config: AxiosRequestConfig) => {
  const access_token = localStorage.getItem("access_token");

  if (access_token) {
    config.headers["Authorization"] = "Bearer " + access_token;
  }

  config.headers["Client-id"] = "13f36a97f0250bc2ee128b572b85faa4";

  return config;
};

Request.interceptors.request.use(requestInterceptor, (error) =>
  Promise.reject(error)
);

// 响应后拦截
const responseIntercepter = async (res: AxiosResponse) => {
  switch (res.data.code) {
    case 0:
      return Promise.resolve(res);
    default:
      return Promise.reject(res);
  }
};

Request.interceptors.response.use(responseIntercepter, (error) =>
  Promise.reject(error)
);
