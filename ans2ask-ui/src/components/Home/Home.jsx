import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import QuestionGrid from "../QuestionGrid/QuestionGrid";
import QuestionsOrCourses from "../QuestionsOrCourses/QuestionsOrCourses";
import Subjects from "../Subjects/Subjects";
import "./Home.css";

export default function Home() {
  return (
    <div className="home">
        <Navbar/>
        <div className="d-flex justify-content-center align-items-center">
            <div className="custom-container-home bg-light px-4 pt-4 pb-2">
                <Subjects/>
                <QuestionsOrCourses/>
                <QuestionGrid/>
            </div>
        </div>
        <Footer/>
    </div>
  );
}
