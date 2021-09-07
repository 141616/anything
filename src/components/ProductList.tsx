import * as React from "react";
import useQueryProductList from "../hooks/useQueryProductList";
import { LoadingOutlined, HeartFilled, EyeFilled } from "@ant-design/icons";
import { Card, Col, Row } from "antd";

const PAGE_SIZE = 2;

interface Props {
  cid: string;
}

const ProductList: React.FC<Props> = (props: Props) => {
  const { data, isLoading, isSuccess, hasNextPage, isFetching, fetchNextPage } =
    useQueryProductList(props.cid, PAGE_SIZE);

  return (
    <div className="container">
      {isLoading ? (
        <LoadingOutlined />
      ) : (
        <div>
          {isSuccess &&
            data?.pages.map((page, index) => {
              return (
                <React.Fragment key={index}>
                  <ProductCardList list={page.list || []} />
                </React.Fragment>
              );
            })}
          <div>
            {hasNextPage && (
              <div
                style={{ textAlign: "center", margin: "10px 0" }}
                onClick={() => {
                  if (isFetching) {
                    return;
                  }
                  fetchNextPage();
                }}
              >
                {isFetching ? <LoadingOutlined /> : <span>加载更多</span>}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const ProductCardList = ({ list }: { list: any[] }) => {
  return (
    <div className="product-list">
      {list.map((item) => {
        return (
          <div className="mb-20" key={item.id}>
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
                    <HeartFilled
                      style={{ color: item.is_like ? "red" : "black" }}
                    />
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
