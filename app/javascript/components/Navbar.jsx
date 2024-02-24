import React from "react";
import useAuthStore from "../store/useAuthStore";

function Navbar() {
  const { accessToken, removeAccessToken } = useAuthStore();

  const connectToGumroad = () => {
    window.location.href = "/auth/gumroad";
  };

  const logOut = () => {
    removeAccessToken();
    window.location.href = "/";
  };

  return (
    <div className='w-full border-b-[1px] border-black py-3'>
      <div className='flex mx-auto max-w-5xl justify-between items-center'>
        <a className='flex items-center text-xl' href='/'>
          <img
            src={window.location.origin + "/gumroad_logo.png"}
            alt='Gumroad Logo'
            className='h-20 mr-2'
          />
          Website Builder
        </a>
        <div className='text-md'>
          {accessToken ? (
            <button className='elevate-outline' onClick={logOut}>
              Logout
            </button>
          ) : (
            <button onClick={connectToGumroad} className='elevate'>
              Login with Gumroad
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
