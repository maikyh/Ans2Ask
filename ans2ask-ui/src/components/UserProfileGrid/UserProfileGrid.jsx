import React from "react";
import { useState, useEffect, Suspense } from "react";
import { url, MAX_TIME, nothingInLocalStorage } from "../../utils/Constants.jsx";
import { useParams } from 'react-router-dom';
import Options from "../../utils/OptionsQA.jsx"
import PersonalizedFallback from "../PersonalizedFallback/PersonalizedFallback.jsx";
import "./UserProfileGrid.css";

const LazyQuestion = React.lazy(() => import('../Question/Question'));

const UserProfileGrid = ({ images, selectedOption }) => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const { id } = useParams();

    const removeQuestionsFromLocalStorage = () => {
        localStorage.removeItem('questions');
    };

    const removeAnswersFromLocalStorage = () => {
        localStorage.removeItem('answers');
    };

    function getContent() {
        if (selectedOption === Options.questions) return questions.filter(question => question.user.id === parseInt(id));

        let UserAnswers = [];
        let AnswersOfUser = answers.filter(answer => answer.user.id === parseInt(id));
        for (let i = 0; i < questions.length; i++) {
            for (let j = 0; j < AnswersOfUser.length; j++) {
                if (questions[i].id === AnswersOfUser[j].questionId) {
                    UserAnswers.push(questions[i]);
                    break;
                }
            }
        }

        return UserAnswers;
    }

    //For Questions
    useEffect(() => {
        const cachedQuestions = localStorage.getItem('questions');
        if (cachedQuestions && cachedQuestions.length > nothingInLocalStorage) {
            setQuestions(JSON.parse(cachedQuestions));
        }
        else {
            const fetchQuestions = async () => {
                const response = await fetch(url + '/questions');
                const data = await response.json();
                setQuestions(data);
            };

            fetchQuestions();
        }
    }, []);

    useEffect(() => {
        localStorage.removeItem('questions');
        localStorage.setItem('questions', JSON.stringify(questions));
        const timer = setTimeout(() => removeQuestionsFromLocalStorage(), MAX_TIME);
        return () => clearTimeout(timer);
    }, [questions])

    //For Answers
    useEffect(() => {
        const cachedAnswers = localStorage.getItem('answers');
        if (cachedAnswers && cachedAnswers.length > nothingInLocalStorage) {
            setAnswers(JSON.parse(cachedAnswers));
        }
        else {
            const fetchAnswers = async () => {
                const response = await fetch(url + '/answers');
                const data = await response.json();
                setAnswers(data);
            };

            fetchAnswers();
        }
    }, []);

    useEffect(() => {
        localStorage.removeItem('answers');
        localStorage.setItem('answers', JSON.stringify(answers));
        const timer = setTimeout(() => removeAnswersFromLocalStorage(), MAX_TIME);
        return () => clearTimeout(timer);
    }, [answers])

    let content = getContent();

    return (
        <div className="UserQuestionGrid">
            {
                content?.map((question) => (
                    <div key={question.id}>
                        <Suspense fallback={<PersonalizedFallback />}>
                            <LazyQuestion userId={question.user.id} images={images} id={question.id} username={question.user.username} email={question.user.email} userTitle={question.user.title} subject={question.subject} title={question.title} body={question.body} coins={question.coins} />
                        </Suspense>
                    </div>
                ))
            }
        </div>
    );
}

export default UserProfileGrid;