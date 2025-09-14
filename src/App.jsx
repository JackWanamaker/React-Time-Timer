import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Arc from './Arc'

function App() {
  //Template variable
  const [count, setCount] = useState(0)
  const [arcAngle, setArcAngle] = useState(359.99);
  const [timerLength, setTimerLength] = useState(1);
  const refreshTime = useRef(5);
  const [timeLeft, setTimeLeft] = useState(Infinity);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const startTime = useRef(Date.now());
  const [isRunning, setIsRunning] = useState(false);

  function handleChange(e) {
    setTimerLength(e.target.value)
  }

  function startTimer() {
    setIsRunning(true);
    startTime.current = Date.now();
    console.log("Started");
    console.log("Timer Length Currently " + timerLength);
  }

  function resumeTimer() {
    setIsRunning(true);
    startTime.current = Date.now()
    console.log("Resumed");
    console.log("Time Left: " + timeLeft);
  }

  function pauseTimer() {
    setIsRunning(false);
    setTimerLength(timerLength)
    console.log("Paused")
  }

  function stopTimer() {
    setIsRunning(false);
    setTimeLeft(Infinity);
    setArcAngle(359.99);
    console.log("Stopped");
  }

  useEffect(() => {
    if (isRunning) {
      if (timeLeft <= 0) {
        console.log("I'm here")
        stopTimer();
        return; // stop when 0
      }
      
      const timer = setInterval(() => {
      let currentTime = Date.now()
      //console.log("Start Time: " + startTime.current)
      //console.log("Current Time: " + currentTime)
      //console.log(currentTime-startTime.current)
      setTimeElapsed(timeElapsed + (currentTime));
      setTimeLeft(timerLength*1000 - (currentTime - startTime.current));
      //console.log(timeLeft)
      if (timeLeft == timerLength*1000){
        setArcAngle(359.99)
      }
      else {
        setArcAngle((timeLeft/(timerLength*1000))*360)
      }
    }, refreshTime.current);
    return () => clearInterval(timer); // cleanup when unmounted
      
    }

  }, [isRunning, timeLeft]);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <Arc radius={80} startAngle={0} endAngle={arcAngle} stroke="black" strokeWidth={1.5} />
      <button onClick={startTimer}>Start Timer </button>
      <button onClick={resumeTimer}>Resume Timer </button>
      <button onClick={pauseTimer}>Pause Timer </button>
      <button onClick={stopTimer}>Stop Timer</button>
      <label>Time (seconds):</label>
        <input type="number" value={timerLength} onChange={handleChange} min="1" max="60"/>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
