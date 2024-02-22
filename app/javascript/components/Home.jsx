import React from "react";
import useUpdateAccessToken from "../hooks/useUpdateAccessToken";
import useAuthStore from "../store/useAuthStore";
import WebsiteList from "./WebsiteList";

const Home = () => {
  useUpdateAccessToken();
  const accessToken = useAuthStore((state) => state.accessToken);

  return (
    <div className='max-w-5xl mx-auto'>
      <div>
        {accessToken ? (
          <p>Access token found: {accessToken}</p>
        ) : (
          <p>No access token found</p>
        )}
      </div>
      <WebsiteList />
    </div>
  );
};

export default Home;
