import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Create from "./pages/create";
const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/create" element={<Create />} />
    </Routes>
  </BrowserRouter>
);
