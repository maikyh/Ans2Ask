import React from "react";
import { useState, useEffect, useContext } from "react";
import Question from "../Question/Question";
import Options from "../../utils/OptionsQA.jsx"
import "./UserProfileGrid.css";

const url = `http://localhost:3001`;

export default function UserProfileGrid({ selectedOption, userId }) {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            const response = await fetch(url + '/questions');
            const data = await response.json();
            setQuestions(data);
        };
    
        const fetchAnswers = async () => {
            const response = await fetch(url + '/answers');
            const data = await response.json();
            setAnswers(data);
        };

        fetchAnswers();
        fetchQuestions();
    }, []);

    function getContent() {
        if(selectedOption === Options.questions) return questions.filter(question => question.user.id === userId);
        
        let UserAnswers = [];
        let AnswersOfUser = answers.filter(answer => answer.user.id === userId);
        for(let i = 0; i<questions.length; i++){
            for(let j = 0; j<AnswersOfUser.length; j++){
                if(questions[i].id === AnswersOfUser[j].questionId){
                    UserAnswers.push(questions[i]);
                    break;
                }
            }
        }

        return UserAnswers;
    }

    let content = getContent();

    return (
        <div className="UserQuestionGrid">
            { 
                content?.map((question) => (
                <div key={question.id}>
                    <Question id={question.id} username={question.user.username} subject={question.subject} title={question.title} body={question.body} />
                </div>
                ))
            }
        </div>
    );
}