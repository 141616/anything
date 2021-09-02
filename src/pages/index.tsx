import React, { useState } from "react";
import { Button } from "antd";

import logo from "./assets/logo.svg";
import "../styles/App.css";
import "antd/dist/antd.css";

import Ani from "../components/ani";
import Coin from "../components/Coin";

import { DotWalletForMetaID, ENV } from "dotwallet-jssdk";
import User from "../components/User";
import Profile from "../components/Profile";

const APP_ID = "aa7f349975c72e5ba3178e636728f6b2";
const APP_SECRET = "387b8a75d3f61bb10dacc6e0860c79bf";

export const wallet = new DotWalletForMetaID({
  clientID: APP_ID,
  clientSecret: APP_SECRET,
  redirectUrl: window.origin,
  env: ENV.Staging,
});

function App() {
  const [token, setToken] = React.useState<string>(
    localStorage.getItem("ACCESS_TOKEN") || ""
  );
  const [user, setUser] = React.useState<any | null>(null);

  const handleLogin = () => {
    wallet.login();
    wallet.ecdhDecryptData({
      data: {
        publickey: "1",
        msg: "",
      },
      callback: (res) => {
        console.log(res.data);
      },
    });
  };

  const handleGetToken = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      const token = await wallet.getToken({
        code,
        callback: (res) => {
          console.log(res);
        },
      });

      if (token) {
        setToken(token.accessToken);
      } else {
        alert("code 已失效，请重新登录");
      }
    } else {
      alert("请先登录");
    }
  };

  const handleGetUserInfo = async () => {
    const user = await wallet.getMetaIDUserInfo({});
    if (user) {
      setUser(user);
    } else {
      alert("请先登录");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <User />
        <Profile />
        <Coin />
        {/* <Ani /> */}
        <div>
          <Button type="primary" onClick={handleLogin}>
            登录
          </Button>
          <Button type="primary" onClick={handleGetToken}>
            GetToken
          </Button>
          <Button onClick={handleGetUserInfo}>GetUserInfo</Button>
          {token && <pre>{token}</pre>}
          {user && <pre>{JSON.stringify(user)}</pre>}
        </div>
      </header>
      <Ani />
    </div>
  );
}

export default App;
