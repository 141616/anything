import * as React from "react";

import { LoadingOutlined, ReloadOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Row, Spin } from "antd";
import useQueryUser from "../hooks/useQueryUser";
import { useHistory } from "react-router-dom";
import { IUser } from "../models";

interface Props {}

const User: React.FC<Props> = (props: Props) => {
  const { isLoading, error, data, isFetching, refetch, isError } =
    useQueryUser();

  return (
    <Spin spinning={!isLoading && isFetching}>
      <div className="user-container">
        {isLoading && <LoadingOutlined />}
        {isError && <UserError error={error} />}
        {data && <UserInfo data={data.data.data} onRefetch={() => refetch()} />}
      </div>
    </Spin>
  );
};

const UserInfo = ({
  data,
  onRefetch,
}: {
  data: IUser;
  onRefetch: () => void;
}) => {
  return (
    <Row gutter={18} align="middle" className="user-info">
      <Col>
        <Avatar shape="circle" size={24} src={data.avatar} />
      </Col>
      <Col>
        <div>{data.nickname}</div>
      </Col>
      <Col>
        <Button
          size="small"
          type="ghost"
          icon={<ReloadOutlined />}
          shape="round"
          onClick={onRefetch}
        />
      </Col>
    </Row>
  );
};

const UserError = ({ error }: { error: any }) => {
  const history = useHistory();

  const msg = error instanceof Error ? error.message : error?.data.msg;

  return (
    <div>
      <p>{msg}</p>
      <Button onClick={() => history.push("/login")}>登录</Button>
    </div>
  );
};

export default User;
