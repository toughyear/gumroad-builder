import React from "react";
import Routes from "../routes";
import Navbar from "./Navbar";

export default (props) => (
  <div className='bg-white'>
    <Navbar />
    {Routes}
  </div>
);
