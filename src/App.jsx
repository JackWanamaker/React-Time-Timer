import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Arc from './Arc'
import Para from './Para'

function App() {
  const [count, setCount] = useState(0)
  const [arcAngle, setArcAngle] = useState(359.99)
  const [timeLeft, setTimeLeft] = useState(30);


  useEffect(() => {
    if (timeLeft <= 0) {
      setArcAngle(359.99);
      return; // stop when 0
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
      if (timeLeft == 30){
        setArcAngle(359.99)
      }
      else {
        setArcAngle((timeLeft/30)*360)
      }
    }, 1000);

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
      <Arc radius={80} startAngle={0} endAngle={arcAngle} stroke="black" strokeWidth={2} />
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
