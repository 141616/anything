import * as React from "react";
import useQueryCategoryList from "../hooks/useQueryCategoryList";
import useQueryProductList from "../hooks/useQueryProductList";
import { LoadingOutlined, HeartFilled, EyeFilled } from "@ant-design/icons";
import { Card, Col, Row } from "antd";

interface Props {
  cid: string;
}

const ProductList: React.FC<Props> = (props: Props) => {
  const { data, isLoading, isSuccess } = useQueryProductList({
    page: 1,
    page_size: 10,
    category_id: props.cid,
  });

  return (
    <div className="container">
      {isLoading ? (
        <LoadingOutlined />
      ) : (
        <div>{isSuccess && <List list={data?.data.data.list} />}</div>
      )}
    </div>
  );
};

const List = ({ list }: { list: any[] }) => {
  return (
    <div className="product-list">
      {list.map((item) => {
        return (
          <div className="mb-8" key={item.id}>
            <Card
              cover={
                <img
                  style={{ width: "100%", height: "200px" }}
                  src={item.cover}
                  alt={item.name}
                />
              }
            >
              <Row gutter={16} align="middle" style={{ fontSize: 16 }}>
                <Col span={12}>{item.name}</Col>
                <Col span={6}>
                  <Row align="middle" justify="end">
                    <HeartFilled />
                    <span style={{ marginLeft: 8 }}>{item.like_count}</span>
                  </Row>
                </Col>
                <Col span={6}>
                  <Row align="middle" justify="end">
                    <EyeFilled />
                    <span style={{ marginLeft: 8 }}>{item.view_count}</span>
                  </Row>
                </Col>
              </Row>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
