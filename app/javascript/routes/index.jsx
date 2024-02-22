import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import WebsiteEditor from "../components/WebsiteEditor";

export default (
  <Router>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/edit/:siteId' element={<WebsiteEditor />} />
    </Routes>
  </Router>
);
