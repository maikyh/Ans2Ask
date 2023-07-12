import React from "react";  
import { useParams } from 'react-router-dom';
import "./QuestionDetails.css";

export default function QuestionDetails() {
    const { id } = useParams();

    return (
        <div className="question-details">
            Question Details of {id}
        </div>
    );
}