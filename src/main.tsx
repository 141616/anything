import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "./styles/index.css";
import "./styles/common.less";
import "antd/dist/antd.css";

import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

// ↓ 初始化全局实例，通过该全局实例可以传入默认配置，这里本文不做详述
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* ↓ 主应用节点 */}
      <App />
      {/* ↓ 可视化开发工具 */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
