import { useState, useEffect, useRef } from 'react'
import './App.css'
import Arc from './Arc'
import TimerInput from './TimerInput'
import TimerInput2 from './TimerInput2'
import { use } from 'react'

function App() {
  const [arcAngle, setArcAngle] = useState(359.99);
  const [timerLength, setTimerLength] = useState(3600);
  const refreshTime = 5;
  const [timeLeft, setTimeLeft] = useState(Infinity);
  const startTime = useRef(Date.now());
  const [cachedTime, setCachedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const [timerValue2, setTimerValue2] = useState(["01", "00", "00"]);
  const [startCaret, setStartCaret] = useState([0, 1]);
  const timerRef0 = useRef(null);
  const timerRef1 = useRef(null);
  const timerRef2 = useRef(null);
  const timerRefs = [timerRef0, timerRef1, timerRef2];
  const canBackSpace = useRef(true);
  
  function handleChange(e) {
    setTimerLength(e.target.value);
  }

  function startTimer() {
    startTime.current = Date.now();
    setTimeLeft(Infinity);
    setCachedTime(0);
    setIsRunning(true);
    console.log("Started");
    //console.log("Timer Length Currently " + timerLength);
  }

  function resetTimer() {
    setTimeLeft(Infinity);
    setCachedTime(0);
    
  }

  function resumeTimer() {
    startTime.current = Date.now();
    setIsRunning(true);
    console.log("Resumed");
    //console.log("Time Left: " + timeLeft);
    //console.log("Timer Length Currently " + timerLength);
    //console.log("Cached Time: " + cachedTime);
  }

  function pauseTimer() {
    setIsRunning(false);
    setCachedTime(timerLength*1000 - timeLeft);
    console.log("Paused");
  }

  function stopTimer() {
    setIsRunning(false);
    setTimeLeft(Infinity);
    setArcAngle(359.99);
    setCachedTime(0);
    console.log("Stopped");
  }

  useEffect(() => {
    if (isRunning) {
      if (timeLeft <= 0) {
        console.log("Timer Finished");
        stopTimer();
        return; // stop when 0
      }
      
      const timer = setInterval(() => {
      let currentTime = Date.now();
      //console.log("Start Time: " + startTime.current);
      //console.log("Current Time: " + currentTime);
      //console.log(currentTime-startTime.current);
      //setTimeElapsed(timeElapsed + (currentTime));
      setTimeLeft(((timerLength*1000) - cachedTime) - (currentTime - startTime.current));
      //console.log(timeLeft);
      if (timeLeft == Infinity) {
        setArcAngle(359.99);
      }
      else {
        setArcAngle((timeLeft/(timerLength*1000))*360);
      }
      //console.log("Current Arc Angle: " + arcAngle);
    }, refreshTime);
    return () => clearInterval(timer); // cleanup when unmounted
      
    }

  }, [isRunning, timeLeft]);

  useEffect(() => {
        console.log("Current Box: " + startCaret[0]);
        console.log("Current Caret: " + startCaret[1]);
        console.log(timerValue2);
        timerRefs[startCaret[0]].current.focus();
        timerRefs[startCaret[0]].current.selectionStart = startCaret[1];
        setTimerLength((parseInt(timerValue2[0])*3600) + (parseInt(timerValue2[1])*60) + (parseInt(timerValue2[2])));
    }, [timerValue2]);

  return (
    <>
      <Arc radius={80} startAngle={0} endAngle={arcAngle} stroke="black" strokeWidth={1.5} />
      <br></br>
      <button onClick={startTimer}>
        
      </button>
      <button onClick={resumeTimer}>
        <svg width="25px" height="25px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 16L7 16L15 8L7 -2.7818e-08L5 0L5 16Z" fill="#000000"/>
        </svg>
      </button>
      <button onClick={pauseTimer}>Pause Timer </button>
      <button onClick={stopTimer}>Stop Timer</button>
      <br></br>
      <br></br>
      <TimerInput2 refs={timerRefs} ref0={timerRef0} ref1={timerRef1} ref2={timerRef2} timerValue={timerValue2} setTimerValue={setTimerValue2} startCaretPosition={startCaret} setStartCaretPosition={setStartCaret} canBackSpace={canBackSpace}/>
    </>
  )
}

export default App
