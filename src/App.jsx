import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Arc from './Arc'

function App() {
  const [arcAngle, setArcAngle] = useState(359.99);
  const [timerLength, setTimerLength] = useState(1);
  const refreshTime = useRef(5);
  const [timeLeft, setTimeLeft] = useState(Infinity);
  const startTime = useRef(Date.now());
  const [cachedTime, setCachedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  function handleChange(e) {
    setTimerLength(e.target.value);
  }

  function startTimer() {
    startTime.current = Date.now();
    setTimeLeft(Infinity);
    setArcAngle(359.99);
    setCachedTime(0);
    setIsRunning(true);
    console.log("Started");
    console.log("Timer Length Currently " + timerLength);
  }

  function resumeTimer() {
    startTime.current = Date.now();
    setIsRunning(true);
    console.log("Resumed");
    console.log("Time Left: " + timeLeft);
    console.log("Timer Length Currently " + timerLength);
    console.log("Cached Time: " + cachedTime);
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
        console.log("I'm here");
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
      if (timeLeft == timerLength*1000){
        setArcAngle(359.99);
      }
      else {
        setArcAngle((timeLeft/(timerLength*1000))*360);
      }
    }, refreshTime.current);
    return () => clearInterval(timer); // cleanup when unmounted
      
    }

  }, [isRunning, timeLeft]);

  return (
    <>
      <Arc radius={80} startAngle={0} endAngle={arcAngle} stroke="black" strokeWidth={1.5} />
      <button onClick={startTimer}>Start Timer </button>
      <button onClick={resumeTimer}>Resume Timer </button>
      <button onClick={pauseTimer}>Pause Timer </button>
      <button onClick={stopTimer}>Stop Timer</button>
      <label>Time (seconds):</label>
        <input type="number" value={timerLength} onChange={handleChange} min="1" max="60"/>
    </>
  )
}

export default App
