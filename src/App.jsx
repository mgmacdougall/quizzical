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
  const[displayNewGame, setDisplayNewGame]=useState(true);


function shuffle(arr){
  let currentIndex=arr.length;
  while(currentIndex!=0){

    let randomIdx = Math.floor(Math.random()*currentIndex);
    currentIndex--;
    [arr[currentIndex],arr[randomIdx]]=[arr[randomIdx], arr[currentIndex]]
  }
  return arr
}

function parseIncomingData(answers){
    const{question, correct_answer,incorrect_answers} = answers;
    let tmp ={};
    tmp.question = decode(question);
    tmp.answers =incorrect_answers.map(item=>({answer: decode(item), correct: false, selected: false}));
    tmp.answers.push({answer: correct_answer, correct: true, selected: false})

    tmp.answers =shuffle(tmp.answers);
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
     setDisplayNewGame(false);
     setDisplayTotal(false);
    }else{
      console.log("Error: no data recieved")
    }
    
    }

  function handleLoadGame(){
    console.log(totalScore) 
    
    
    console.log(totalScore) 
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
  

  function handleScoreClick(){
    setTotalScore(0)
    calculateScore(); 
    setDisplayTotal(true);
    setDisplayNewGame(true);
    setDisplayScoreButton(false);
  }

function appendScoreGameNode(){
  return(
    <>
    <button className="text-bold text-large btn-standard" id='calcScore' onClick={(e)=> handleScoreClick(e)}>Calculate Score</button>
    </>
  )
}

function displayScoreNode(){
  return(
    <>
    {displayScoreNode?<p className='text-bold text-xl'>Your scored {totalScore}</p>:null}
    </>
  )
 
}

  function buildNode(details, qKey){
    return(
      <div className='inner-container' key={uuidv4()}>
        <p className='text-large text-bold'>{details.question}</p>
        <div className='inline-container'>
        {details.answers.map((el,idx)=> <button key={uuidv4()} className={el.selected? "active btn-standard":"in-active btn-standard"} onClick={(e)=> handleButtonClick(e)} id={qKey+"-"+idx} value={el.answer}>{decode(el.answer)}</button>)}
        </div>
      </div>
    )
  }
  return (
    <>
    <h1 className='text-xxl'>The Ultimate Quiz Page</h1>
      <div>
         <div className='flex-center'>
        {
          displayNewGame? <button className="text-bold text-large btn-standard"id='newGame' onClick={()=>handleLoadGame()}>New Game</button>:null
        }
          {displayScoreButton? appendScoreGameNode():null}
          {displayTotal? displayScoreNode(): null}
       </div>
        {
          dataLoaded? buildNode(q1Details,0): null
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
        {/* <div>
          {displayScoreButton? appendScoreGameNode():null}
          {displayTotal? displayScoreNode(): null}
       </div> */}
    </>
  )
}

export default App
