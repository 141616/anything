import * as React from "react";
import { useQuery } from "react-query";
import { fetchUser } from "../api";

interface Props {}

const Profile: React.FC<Props> = (props: Props) => {
  const { isLoading, error, data } = useQuery("user", () => fetchUser());
  return (
    <div className="comp-container">
      {data && (
        <pre>{JSON.stringify(data?.data?.data?.nickname, undefined, 2)}</pre>
      )}
    </div>
  );
};

export default Profile;
