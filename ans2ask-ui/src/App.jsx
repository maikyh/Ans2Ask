import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <main>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}