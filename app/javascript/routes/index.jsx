import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import WebsiteEditor from "../components/WebsiteEditor";
import MainLayout from "../components/MainLayout";

export default (
  <Router>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path='/' element={<Home />} />
      </Route>
      <Route path='/edit/:siteId' element={<WebsiteEditor />} />
    </Routes>
  </Router>
);
