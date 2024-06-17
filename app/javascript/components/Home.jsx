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
          <div className='flex flex-col space-y-4'>
            <div className='flex space-x-4'>
              <button className='elevate-brand' onClick={connectToGumroad}>
                Start Building
              </button>
              <a href="https://github.com/toughyear/gumroad-builder" target="_blank" class="border items-center border-black p-2 inline-flex">
                  GitHub
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="inline-block">
                    <path d="M7 7h10v10"/>
                    <path d="M7 17 17 7"/>
                  </svg>
               </a>
            </div>
            <a href="https://www.producthunt.com/posts/website-builder-for-gumroad-products?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-website&#0045;builder&#0045;for&#0045;gumroad&#0045;products" target="_blank">
              <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=463752&theme=light" alt="Website&#0032;Builder&#0032;for&#0032;Gumroad&#0032;Products - Build&#0032;custom&#0032;websites&#0032;&#0045;&#0032;integrated&#0032;with&#0032;Gumroad&#0032;products | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" />
            </a>
          </div>
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
