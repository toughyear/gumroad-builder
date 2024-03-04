import React from "react";
import Routes from "../routes";
import useInitWebsites from "../hooks/useInitWebsites";
import { Toaster } from "../components/ui/Toaster";
import Site from "./Site";

export default () => {
  useInitWebsites();

  const url = window.location.hostname;
  // Use regex to match the pattern `site-` followed by any character until a dot or port separator
  const regex = /site-([^.]+)/;
  const match = url.match(regex);

  // Check if match is not null and has the expected group
  if (match && match[1]) {
    const subdomain = match[1];

    return (
      <div className='bg-white'>
        <Site subdomain={subdomain} />
        <Toaster />
      </div>
    );
  }

  return (
    <div className='bg-white'>
      {Routes}
      <Toaster />
    </div>
  );
};
