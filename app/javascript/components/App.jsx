import React from "react";
import Routes from "../routes";
import Navbar from "./Navbar";
import useInitWebsites from "../hooks/useInitWebsites";

export default (props) => {
  useInitWebsites();

  const url = window.location.hostname;
  const isProjectSubdomain = url.startsWith("site-");

  if (isProjectSubdomain) {
    return (
      <div className='bg-white'>
        you are in a project subdomain
        <p>{url}</p>
      </div>
    );
  }

  return (
    <div className='bg-white'>
      <Navbar />
      {Routes}
    </div>
  );
};
