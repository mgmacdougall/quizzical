import './App.css';
import {useState} from 'react';
import QuestionSection from './components/QuestionSection';
import Home from './components/Home';

function App() {
  const [data, setData] = useState([]);

  const [section1Data, setSection1Data] = useState([]);
  const [section1AnswerStatus, setSection1AnswerStatus] = useState(false);

  const [section2Data, setSection2Data] = useState([]);
  const [section2AnswerStatus, setSection2AnswerStatus] = useState(false);

  const [section3Data, setSection3Data] = useState([]);
  const [section3AnswerStatus, setSection3AnswerStatus] = useState(false);

  const [section4Data, setSection4Data] = useState([]);
  const [section4AnswerStatus, setSection4AnswerStatus] = useState(false);

  const [startGame, setStartGame] = useState(false);
  const [displayStartGame, setDisplayStartGame] = useState(true);
  const [displayQuestions, setDisplayQuestions] = useState(false);
  const [displayFinishGame, setDisplayFinishGame] = useState(false);
  const [displayNewhGame, setDisplayNewGame] = useState(false);

  const [score, setScore] = useState(0);
  const [answerCounter, setAnswerCounter] = useState(0);

  const handleScoreClick = () => {
    setDisplayFinishGame(true);
    setDisplayStartGame(false);
    setDisplayQuestions(false);
    let total =
      Number(section1AnswerStatus) +
      Number(section2AnswerStatus) +
      Number(section3AnswerStatus) +
      Number(section4AnswerStatus);
    setScore(total);
  };

  const clearData = () => {
    setScore(0);
    setDisplayFinishGame(false);
    setDisplayQuestions(false);
    setDisplayStartGame(true);
  };

  const handleClick = e => {
    e.preventDefault();
    // const {correctAnswer} = section1Data;

    setDisplayFinishGame(false);
    setDisplayQuestions(true);
    setDisplayStartGame(false);

    const answerKey = e.target.id.split('_');
    const [questionKey] = answerKey;
    console.log(questionKey);
    if (questionKey == 0) {
      let ans =
        section1Data.correctAnswer.toLowerCase() ==
        e.target.value.toLowerCase();
      setSection1AnswerStatus(ans);
      let _answerCounter = answerCounter + 1;
      setAnswerCounter(_answerCounter);
    }

    if (questionKey == 1) {
      let ans =
        section2Data.correctAnswer.toLowerCase() ==
        e.target.value.toLowerCase();
      setSection2AnswerStatus(ans);
      let _answerCounter = answerCounter + 1;
      setAnswerCounter(_answerCounter);
    }
    if (questionKey == 2) {
      let ans =
        section3Data.correctAnswer.toLowerCase() ==
        e.target.value.toLowerCase();
      setSection3AnswerStatus(ans);
      let _answerCounter = answerCounter + 1;
      setAnswerCounter(_answerCounter);
    }
    if (questionKey == 3) {
      let ans =
        section4Data.correctAnswer.toLowerCase() ==
        e.target.value.toLowerCase();
      setSection4AnswerStatus(ans);
      let _answerCounter = answerCounter + 1;
      setAnswerCounter(_answerCounter);
    }
  };

  const handleLoad = async () => {
    try {
      const response = await fetch('https://opentdb.com/api.php?amount=5');
      const jsonData = await response.json();
      if (jsonData.response_code === 0) {
        const {results} = jsonData;
        setData(results);

        setStartGame(true);
        setDisplayQuestions(true);
        setDisplayStartGame(false);
        for (let i = 0; i < results.length; i++) {
          let sectionData = {};
          sectionData.question = results[i].question;
          sectionData.correctAnswer = results[i].correct_answer;
          sectionData.answerArray = [
            ...results[i].incorrect_answers,
            results[i].correct_answer
          ];
          if (i === 0) {
            setSection1Data(sectionData);
          }
          if (i === 1) {
            setSection2Data(sectionData);
          }
          if (i === 2) {
            setSection3Data(sectionData);
          }
          if (i === 3) {
            setSection4Data(sectionData);
          }
        }
      }
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="App">
      <Home showView={displayStartGame} handler={handleLoad} />
      <div className={displayQuestions ? 'display' : 'hidden'}>
        <h2>Questions</h2>
        <div>
          <div>
            {startGame
              ? <QuestionSection
                  data={section1Data}
                  answerId={0}
                  handler={handleClick}
                />
              : null}
          </div>
          <div>
            {startGame
              ? <QuestionSection
                  data={section2Data}
                  answerId={1}
                  handler={handleClick}
                />
              : null}
          </div>
          <div>
            {startGame
              ? <QuestionSection
                  data={section3Data}
                  answerId={2}
                  handler={handleClick}
                />
              : null}
          </div>
          <div>
            {startGame
              ? <QuestionSection
                  data={section4Data}
                  answerId={3}
                  handler={handleClick}
                />
              : null}
          </div>
        </div>
      </div>
      <div className={answerCounter === 4 ? 'display' : 'hidden'}>
        <button onClick={() => handleScoreClick()}>Score Game</button>
        <div className={displayFinishGame ? 'display' : 'hidden'}>
          <div className={answerCounter === 4 ? 'display' : 'hidden'}>
            <h1>Score Page</h1>
            <div>
              Score:{score}
            </div>
            <button
              className={displayFinishGame ? 'display' : 'hidden'}
              onClick={() => {
                clearData();
                setDisplayQuestions(false);
                setDisplayFinishGame(false);
                setDisplayStartGame(true);
                setDisplayNewGame(false);
                setAnswerCounter(0);
              }}>
              New Game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
