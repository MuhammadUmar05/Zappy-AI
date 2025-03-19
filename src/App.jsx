import React from "react";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import { Routes, Route } from "react-router-dom";
import ChatAI from "./Components/ChatAI/ChatAI";
import GenerateImage from "./Components/GenerateImage/GenerateImage";
export default function App() {
  return (
    <div className="w-full flex flex-col bg-light_primary dark:bg-dark_primary">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chatAI" element={<ChatAI />} />
        <Route path="/generateImage" element={<GenerateImage />} />
      </Routes>
    </div>
  );
}
