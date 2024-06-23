import { useEffect, useState } from 'react';
import Opening from './components/Opening';
import Quiz from './components/Quiz';
import Score from "./components/Score";
import './styles/App.css';

// Import the icons 
import htmlIcon from './assets/icon-html.svg';

// Import the background icons for light mode
import backgroundIconDesktop from './assets/pattern-background-desktop-light.svg';
import backgroundIconMobile from './assets/pattern-background-mobile-light.svg';
import backgroundIconTablet from './assets/pattern-background-tablet-light.svg';

// Import the Data
import HTMLData from './data/HTMLData.json';

const quizes = [
  {
    title: 'HTML',
    icon: htmlIcon,
    color: '#FFF1E9',
  }
];

function App() {
  const [pageState, setPageState] = useState('opening');
  const [selectedQuiz, setSelectedQuiz] = useState('');
  const [quizData, setQuizData] = useState(HTMLData);
  const [icon, setIcon] = useState(null);
  const [color, setColor] = useState(null);
  const [score, setScore] = useState(0);
  const [backgroundIcon, setBackgroundIcon] = useState(backgroundIconDesktop);

  useEffect(() => {
    const updateBackgroundIcon = () => {
      if (window.innerWidth < 700) {
        setBackgroundIcon(backgroundIconMobile);
      } else if (window.innerWidth < 1200) {
        setBackgroundIcon(backgroundIconTablet);
      } else {
        setBackgroundIcon(backgroundIconDesktop);
      }
    };

    updateBackgroundIcon();
    window.addEventListener('resize', updateBackgroundIcon);

    return () => {
      window.removeEventListener('resize', updateBackgroundIcon);
    };
  }, []);

  useEffect(() => {
    if (selectedQuiz) {
      setPageState('game');
    }

    if (selectedQuiz === 'HTML') {
      setQuizData(HTMLData);
      setIcon(htmlIcon);
      setColor(quizes[0].color);
    }
  }, [selectedQuiz]);

  return (
    <div className="center">
      <img
        src={backgroundIcon}
        alt="background"
        className="background-icon"
      />
      <div className="wrapper">
        <div className="panel-wrapper">
          {pageState === 'opening' && <Opening quizes={quizes} setSelectedQuiz={setSelectedQuiz} />}
          {pageState === 'game' && <Quiz selectedQuiz={selectedQuiz} quizData={quizData} icon={icon} color={color} setPageState={setPageState} setScore={setScore} />}
          {pageState === 'score' && <Score score={score} selectedQuiz={selectedQuiz} quizData={quizData} icon={icon} color={color} setPageState={setPageState} setScore={setScore} setSelectedQuiz={setSelectedQuiz} />}
        </div>
      </div>
    </div>
  );
}

export default App;
