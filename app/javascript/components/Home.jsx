import React from "react";
import useUpdateAccessToken from "../hooks/useUpdateAccessToken";
import useAuthStore from "../store/useAuthStore";
import WebsiteList from "./WebsiteList";

const Home = () => {
  useUpdateAccessToken();
  const accessToken = useAuthStore((state) => state.accessToken);

  if (accessToken === null) {
    return <p>Landing Page UI. Ask for logging in.</p>;
  }

  return (
    <div className='max-w-5xl mx-auto'>
      <div>
        <p>Access token found: {accessToken}</p>
      </div>
      <WebsiteList />
    </div>
  );
};

export default Home;
