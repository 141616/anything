import * as React from "react";
import CategoryList from "../../components/CategoryList";
import ProductList from "../../components/ProductList";
import User from "../../components/User";

interface Props {}

const Home: React.FC<Props> = (props: Props) => {
  const [cid, setCid] = React.useState<string>("6125fe6ebd6e9eb47b65def1");

  return (
    <div className="container">
      <h3 className="mb-8 fz-24">Welcome Home</h3>
      <User />
      <CategoryList current={cid} onChange={(id: string) => setCid(id)} />
      <ProductList cid={cid} />
    </div>
  );
};

export default Home;
