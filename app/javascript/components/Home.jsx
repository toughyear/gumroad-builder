import React from "react";
import useUpdateAccessToken from "../hooks/useUpdateAccessToken";
import useAuthStore from "../store/useAuthStore";
import WebsiteList from "./WebsiteList";
import { connectToGumroad } from "./Navbar";

const Home = () => {
  useUpdateAccessToken();
  const accessToken = useAuthStore((state) => state.accessToken);

  if (accessToken === null) {
    return (
      <div className='w-full mx-auto h-full flex md:flex-row flex-col-reverse max-w-5xl mt-10 md:mt-20'>
        <div className='flex justify-center w-full md:w-1/2 p-5 md:p-0 md:mr-5 items-center md:items-start flex-col'>
          <h1 className='text-4xl md:text-7xl font-bold'>Show What You Got!</h1>
          <p className='mt-5 mb-10'>
            Build a website, powered by Gumroad. Sell your e-book, music, or
            art. Or just write a blog. It's free and easy to get started.
          </p>
          <button className='elevate-brand' onClick={connectToGumroad}>
            Start Building
          </button>
        </div>
        <div className='w-full md:w-1/2'>
          <img
            src={window.location.origin + "/landing_retro.png"}
            alt='Landing Image'
            className='border-[2px] border-black'
          />
        </div>
      </div>
    );
  }

  return (
    <div className='max-w-5xl mx-auto'>
      <WebsiteList />
    </div>
  );
};

export default Home;
