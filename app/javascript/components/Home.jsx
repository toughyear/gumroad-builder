import React from "react";
import useUpdateAccessToken from "../hooks/useUpdateAccessToken";
import useAuthStore from "../store/useAuthStore";

const Home = () => {
  useUpdateAccessToken();
  const accessToken = useAuthStore((state) => state.accessToken);

  return (
    <div>
      Home
      <div>
        {accessToken ? (
          <p>Access token found: {accessToken}</p>
        ) : (
          <p>No access token found</p>
        )}
      </div>
    </div>
  );
};

export default Home;
