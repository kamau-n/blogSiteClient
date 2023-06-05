import { useState } from "react";
import "./App.css";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Create from "./pages/Create";
import Blogs from "./pages/Blogs";
import Comments from "./pages/Comments";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Activate from "./pages/Activate";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Blogs />} path="/" />
          <Route element={<Blogs />} path="/blogs" />
          <Route element={<Create />} path="/add" />
          <Route element={<Profile />} path="/profile" />

          <Route element={<Comments />} path="/comments" />
          <Route element={<Login />} path="/login" />
          <Route element={<Register />} path="/register" />
          <Route element={<Activate />} path="/activate" />
          {/* <Route path="*" element={<PageNotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
