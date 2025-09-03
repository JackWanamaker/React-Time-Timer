import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Arc from './Arc'
import Para from './Para'

function App() {
  const [count, setCount] = useState(0)
  const [arcAngle, setArcAngle] = useState(359.99)
  const timerLength = useRef(600000)
  const refreshTime = useRef(5)
  const [timeLeft, setTimeLeft] = useState(timerLength.current);
  const startTime = useRef(Date.now())

  useEffect(() => {
    if (timeLeft <= 0) {
      setArcAngle(359.99);
      return; // stop when 0
    }

    const timer = setInterval(() => {
      let currentTime = Date.now()
      console.log("Start Time: " + startTime.current)
      console.log("Current Time: " + currentTime)
      setTimeLeft(timerLength.current - (currentTime - startTime.current));
      console.log(timeLeft)
      if (timeLeft == timerLength.current){
        setArcAngle(359.99)
      }
      else {
        setArcAngle((timeLeft/timerLength.current)*360)
      }
    }, refreshTime.current);

    return () => clearInterval(timer); // cleanup when unmounted
  }, [timeLeft]);

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
       <label for="quantity">Quantity (between 1 and 5):</label>
        <input type="number" id="quantity" name="quantity" min="1" max="5"/> 
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
