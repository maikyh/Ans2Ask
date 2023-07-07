import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import QuestionGrid from "../QuestionGrid/QuestionGrid";
import "./Home.css";

export default function Home() {
  return (
    <div className="home">
        <Navbar/>
        <QuestionGrid/>
        <Footer/>
    </div>
  );
}
