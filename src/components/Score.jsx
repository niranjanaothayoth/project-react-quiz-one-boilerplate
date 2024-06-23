import '../styles/Score.css'
import Quiz from './Quiz';

const Score = ({score, selectedQuiz, color, icon, quizData, setPageState, setScore, setSelectedQuiz}) => {

    const resetQuiz = () => {
        setPageState('opening');
        setScore(0);
        setSelectedQuiz('');
    }
    return (
        <>
            <div className="quiz-title">
                <div className="img-icon-wrapper" style={{backgroundColor: color}}><img src={icon} alt={Quiz} /></div>
                <h1>Quiz</h1>
            </div>
            <div className="score-panel">
                <div className="score-title">
                    Quiz completed<span>You scored...</span>
                </div>
                <div className="display-panel">
                    <div className="display-score">
                        <div className="display-icon">
                            <div className="img-icon-wrapper" style={{backgroundColor: color}}><img src={icon} alt={selectedQuiz.title} /></div>
                            <h1>Quiz</h1>
                        </div>
                        <div className="out-of-score">
                            {score} <span>out of {quizData.length}</span>
                        </div>
                    </div>
                    <button className="play-again" onClick={resetQuiz}>Play Again</button>
                </div>
            </div>
        </>
    );
};

export default Score;