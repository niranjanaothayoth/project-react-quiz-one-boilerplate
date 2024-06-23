import { useState } from "react";
import '../styles/Quiz.css';
import errorIcon from '../assets/icon-error.svg';
import correctIcon from '../assets/icon-correct.svg';
import incorrectIcon from '../assets/icon-incorrect.svg';

const alfabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

const Quiz = ({selectedQuiz, quizData, icon, color, setPageState, setScore}) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [pickedAnswer, setPickedAnswer] = useState(null);
    const [notPickedError, setNotPickedError] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const handleSubmit = () => {
        if(currentQuestion === quizData.length - 1 && isSubmitted) {
            setPageState('score');
            return;
        }
        if(isSubmitted) {
            setCurrentQuestion(currentQuestion + 1);
            setIsSubmitted(false);
            setPickedAnswer(null);
            setIsCorrect(false);
            return;
        }
        if(pickedAnswer === null) {
            setNotPickedError(true);
            return;
        } else {
            setNotPickedError(false);
        }
        if(quizData[currentQuestion].answer === pickedAnswer) {
            setScore((prevScore) => prevScore + 1);
            setIsCorrect(true);
        } 
        setIsSubmitted(true);

    };


    return (
        <div className="quiz">
            <div className="quiz-title">
                <div className="img-icon-wrapper" style={{backgroundColor: color}}><img src={icon} alt={selectedQuiz.title} /></div>
                <h1>{selectedQuiz}</h1>
            </div>
            <div className="quiz-panel">
                <div className="question-part">
                    <h2 className="meter">
                        <span className="current-question">Question {currentQuestion + 1}</span> of <span className="total-questions">{quizData.length}</span>
                    </h2>
                    <h1 className="question">
                        {quizData[currentQuestion].question}
                    </h1>
                    <div className="progress-bar">
                        <div className="progress" style={{width: `${(currentQuestion + 1) * 100 / quizData.length}%`}}></div>
                    </div>
                </div>
                <div className="answer-part">
                    {quizData[currentQuestion].options.map((answer, index) => (
                        <div key={index} className={`answer ${pickedAnswer === answer ? 'active' : null} ${(pickedAnswer === answer && isSubmitted) && (isCorrect ? 'correct' : 'incorrect')}`} onClick={()=>!isSubmitted ? setPickedAnswer(answer) : null}>
                            <div className="answer-icon">{alfabet[index]}</div><div className="answer-text">{answer}</div>
                            <div className="cor-icon-wrapper">
                                {isSubmitted && quizData[currentQuestion].answer === answer && <div className="correct-icon"><img src={correctIcon} alt="correct icon" /></div>}
                                {isSubmitted && pickedAnswer === answer && quizData[currentQuestion].answer !== answer && <div className="correct-icon"><img src={incorrectIcon} alt="incorrect icon" /></div>}
                            </div>
                        </div>
                    ))}
                    <button className="submit-answer" onClick={handleSubmit}>{isSubmitted ? 'Next Question' : 'Submit Answer'}</button>
                    <p className="error" style={{opacity: notPickedError ? 1 : 0}}> <img src={errorIcon} alt="error icon" />Please select an answer</p>
                </div>
            </div>
        </div>
    );
};

export default Quiz;