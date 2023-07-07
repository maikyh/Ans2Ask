import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Question from "../Question/Question";
import "./Home.css";

export default function Home() {
  return (
    <div className="home">
        <Navbar/>
        <div className="d-flex justify-content-center align-items-center custom-margin-home">
            <div className="custom-container-home bg-light p-4">
                <div className="subjects-section bg-dark mb-4"></div>

                <h1 className="text-center mb-2 fw-bold">Subject</h1>
                
                <div className="d-flex">
                  <button className="btn btn-dark w-100 d-block fw-bold m-4 p-3">Questions</button>
                  <button className="btn btn-dark w-100 d-block fw-bold m-4 p-3">Courses</button>
                </div>
                
                <div className="">
                    <Question id={1} username={"Miguel"} />
                    <Question id={2} username={"Diego"} />
                </div>
              
            </div>
        </div>
        <Footer/>
    </div>
  );
}
