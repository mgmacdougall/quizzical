import { useState } from 'react';
import {decode} from 'html-entities';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

function App() {

  const[dataLoaded, setDataLoaded] = useState(false);

  const[q1Details, setQ1Details]=useState({})
  const[isAnswer1Correct, setAnswer1Correct]=useState(false);

  const[q2Details, setQ2Details]=useState({})
  const[isAnswer2Correct, setAnswer2Correct]=useState(false);
  
  const[q3Details, setQ3Details]=useState({})
  const[isAnswer3Correct, setAnswer3Correct]=useState(false);
  
  const[q4Details, setQ4Details]=useState({})
  const[isAnswer4Correct, setAnswer4Correct]=useState(false);
  
  const[q5Details, setQ5Details]=useState({})
  const[isAnswer5Correct, setAnswer5Correct]=useState(false);

  const[totalScore, setTotalScore] =useState(0)
  const[displayScoreButton, setDisplayScoreButton]=useState(false);
  const[displayTotal, setDisplayTotal] = useState(false);

function parseIncomingData(answers){
    const{question, correct_answer,incorrect_answers} = answers;
    let tmp ={};
    tmp.question = decode(question);
    tmp.answers =incorrect_answers.map(item=>({answer: decode(item), correct: false, selected: false}));
    tmp.answers.push({answer: correct_answer, correct: true, selected: false})
    setDataLoaded(true);
    return tmp
  }

  const processData= _data=>{
      if(_data.response_code===0){
     setQ1Details(parseIncomingData(_data.results[0]))
     setQ2Details(parseIncomingData(_data.results[1]))
     setQ3Details(parseIncomingData(_data.results[2]))
     setQ4Details(parseIncomingData(_data.results[3]))
     setQ5Details(parseIncomingData(_data.results[4]))
     setDisplayScoreButton(true);
    }else{
      console.log("Error: no data recieved")
    }
    }

  function handleLoadGame(){
      fetch('https://opentdb.com/api.php?amount=5').then(resp=> resp.json()).then(data=> processData(data)).catch(e=> console.log(e))
  }

  function resetButtonState(qIndex){
    let detailsByIndex;
    if(qIndex=="0"){
      detailsByIndex=q1Details;
    }
     
    if(qIndex=="1"){
      detailsByIndex=q2Details;
    }

    if(qIndex=="2"){
      detailsByIndex=q3Details;
    }

    if(qIndex=="3"){
      detailsByIndex=q4Details;
    }
    
    if(qIndex=="4"){
      detailsByIndex=q5Details;
    }
    

    let temp = Object.assign({},detailsByIndex);
    let answersTemp=temp.answers;
    console.log(answersTemp)
    let reset = answersTemp.map(e=>{
      return {
        answer:e.answer,
        correct: e.correct,
        selected: false
      };

    })
    temp.answers=reset;
    return temp
   
  }
  function handleButtonClick(e){
    let [questionIndex, answerIndex] = (e.target.id.split('-'));
    let v={};
    let temp;
    switch (questionIndex) {
      case "0":
        // Reset all questoins
       v = resetButtonState(0);

      temp = Object.assign({},v);

        temp.answers[answerIndex].selected=temp.answers[answerIndex].selected= true;
      
        setQ1Details(temp)
        q1Details.answers[answerIndex].correct? setAnswer1Correct(true): setAnswer1Correct(false);

        break;
      case "1":
        v = resetButtonState(1);
        temp = Object.assign({},v);
        temp.answers[answerIndex].selected=temp.answers[answerIndex].selected? false: true;

        setQ2Details(temp)
        q2Details.answers[answerIndex].correct? setAnswer2Correct(true): setAnswer2Correct(false);

        break;

      case "2":
         v = resetButtonState(2);
         temp = Object.assign({},v);
         temp.answers[answerIndex].selected=temp.answers[answerIndex].selected? false: true;
         
         setQ3Details(temp)
         q3Details.answers[answerIndex].correct? setAnswer3Correct(true): setAnswer3Correct(false);
         
         break;
         
         case "3":
        v = resetButtonState(3);
        temp = Object.assign({},v);
        temp.answers[answerIndex].selected=temp.answers[answerIndex].selected? false: true;
        
        setQ4Details(temp)
        
        q4Details.answers[answerIndex].correct? setAnswer4Correct(true): setAnswer4Correct(false);
        break;
        
        case "4":
        v = resetButtonState(4);
        temp = Object.assign({},v);
        temp.answers[answerIndex].selected=temp.answers[answerIndex].selected? false: true;

        setQ5Details(temp)
        q5Details.answers[answerIndex].correct? setAnswer5Correct(true): setAnswer5Correct(false);
        break;

      default:
        break;
    }
  }
  function calculateScore(){

    let score=0;
    if(isAnswer1Correct){
      score++;
    }if(isAnswer2Correct){
      score++;
    }if(isAnswer3Correct){
      score++;
    }if(isAnswer4Correct){
      score++;
    }if(isAnswer5Correct){
      score++;
    }
    setTotalScore(score);
  }
  
  function handleScoreClick(e){
    // console.log(e.target)
    alert("Clicked scored")
    calculateScore(); 
   setDisplayTotal(true);
    
  }


function appendScoreGameNode(){
  return(
    <>
    <button  onClick={(e)=> handleScoreClick(e)}>Score</button>
    </>
  )
}
function displayScoreNode(){
  return(
    <>
    <p>Score is: {totalScore}</p>
    </>
  )
 
}

  function buildNode(details, qKey){
    return(
      <div key={uuidv4()}>
        <p>{details.question}</p>
        <div>
        {details.answers.map((el,idx)=> <button key={uuidv4()} className={el.selected? "active":"in-active"} onClick={(e)=> handleButtonClick(e)} id={qKey+"-"+idx} value={el.answer}>{decode(el.answer)}</button>)}
        </div>
      </div>
    )
  }
  return (
    <>
    <h1>Quiz Page</h1>
      <div>
        <button onClick={()=>handleLoadGame()}>New Game</button>
        {
          dataLoaded? buildNode(q1Details,0):null
        }
      
        {
          dataLoaded? buildNode(q2Details,1):null
        }
        {
          dataLoaded? buildNode(q3Details,2):null
        }
        {
          dataLoaded? buildNode(q4Details,3):null
        }
        {
          dataLoaded? buildNode(q5Details,4):null
        }
        
      </div>
        <div>
          {displayScoreButton? appendScoreGameNode():null}
          {displayTotal? displayScoreNode(): null}
       </div>
    </>
  )
}

export default App
