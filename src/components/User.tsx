import * as React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { fetchUser } from "../api";

interface Props {}

const User: React.FC<Props> = (props: Props) => {
  const { isLoading, error, data } = useQuery(["user"], ({ queryKey }) => {
    console.log(queryKey);
    return fetchUser();
  });

  console.log(data);
  return (
    <div className="comp-container">
      <div>isLoading: {isLoading}</div>
      {error && <pre>{JSON.stringify(error)}</pre>}
      {data && (
        <pre>{JSON.stringify(data?.data?.data?.nickname, undefined, 2)}</pre>
      )}
    </div>
  );
};

export default User;
