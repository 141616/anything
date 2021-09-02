import * as React from "react";

import { LoadingOutlined } from "@ant-design/icons";
import { Button, Col, Row, Spin } from "antd";
import useQueryCategoryList from "../hooks/useQueryCategoryList";

interface Props {
  current: string;
  onChange: (id: string) => void;
}

const CategoryList: React.FC<Props> = (props: Props) => {
  const { isLoading, error, data, isFetching, refetch, isError, isSuccess } =
    useQueryCategoryList();

  return (
    <Spin spinning={!isLoading && isFetching}>
      <div className="category-container" style={{ margin: "20px 0" }}>
        {isLoading ? (
          <LoadingOutlined />
        ) : (
          <div>
            {isError && <CategoryError error={error} />}
            {isSuccess && (
              <List list={data?.data.data} onClickItem={props.onChange} />
            )}
          </div>
        )}
      </div>
    </Spin>
  );
};

const List = ({
  list,
  onClickItem,
}: {
  list: any[];
  onClickItem: (id: string) => void;
}) => {
  return (
    <Row gutter={[8, 8]} className="category-list">
      {list.map((item) => {
        return (
          <Col key={item.id}>
            <Button
              type="primary"
              shape="round"
              onClick={() => onClickItem(item.id)}
            >
              {item.name}
            </Button>
          </Col>
        );
      })}
    </Row>
  );
};

const CategoryError = ({ error }: { error: any }) => {
  const msg = error instanceof Error ? error.message : error?.data.msg;

  return (
    <div>
      <p>{msg}</p>
    </div>
  );
};

export default CategoryList;
