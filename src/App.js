import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./pages/Home/HomePage";
import Post from "./pages/Post/Post";
import Category from "./pages/category/Category";

const App = () => {
  return (
    <div className="page">
      <div className="container">
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/post/:postId" element={<Post />} />

          <Route path="/category/:categoryId" element={<Category />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
