import { message } from "antd";
import * as React from "react";
import { useHistory } from "react-router-dom";
import api from "../../api";

interface Props {}

const postLogin = async (
  account: string,
  password: string
): Promise<{ accessToken: string; refreshToken: string }> => {
  try {
    const { data } = await api.login({
      client_id: "13f36a97f0250bc2ee128b572b85faa4",
      password,
      account,
      mobile_prefix: "+86",
      from: "web",
      provider: "local",
    });
    console.log(data);
    return {
      accessToken: data?.data.access_token,
      refreshToken: data?.data.refresh_token,
    };
  } catch (error) {
    const msg = error?.data.msg;
    msg && message.error(msg);
    return {
      accessToken: "",
      refreshToken: "",
    };
  }
};

const Login: React.FC<Props> = (props: Props) => {
  const [account, setAccount] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const history = useHistory();

  const handleLogin = async () => {
    const { accessToken, refreshToken } = await postLogin(account, password);
    if (accessToken && refreshToken) {
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);
      history.replace("/");
    }
  };

  return (
    <div
      className="container"
      style={{ textAlign: "center", padding: "100px 0" }}
    >
      <div className="mb-8">
        <input
          type="text"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          placeholder="Enter your account"
        />
      </div>
      <div className="mb-8">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
      </div>
      <div className="mb-8">
        <button onClick={handleLogin}>登录</button>
      </div>
    </div>
  );
};

export default Login;
