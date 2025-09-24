import { useState, useEffect, useRef } from 'react'
import './App.css'
import Arc from './Arc'

function App() {
  const [arcAngle, setArcAngle] = useState(359.99);
  const [timerLength, setTimerLength] = useState(1);
  const refreshTime = 5;
  const [timeLeft, setTimeLeft] = useState(Infinity);
  const startTime = useRef(Date.now());
  const [cachedTime, setCachedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timerValue, setTimerValue] = useState("00h:00m:00s");
  const [timerValueArray, setTimerValueArray] = useState([0,0,0,0,0,0]);
 
  function handleTimerChange(e) {
    let numArray = []
    const myValue = e.target.value;
    let colonsPresent = 0;
    let charsPresent = [0, 0, 0];

    //Returns the original timer Value if the lengths are too short, too long, or the last value is not s
    if (myValue.length < 10 | myValue.length > 12 | (myValue.length === 12 & myValue[11] != "s")) {
        return;
    }
    
    console.log(myValue);
    console.log(myValue.length);
    
    //Adds all numbers present to numArray, tracks number of colons, and checks digits present
    for (let i = 0; i < myValue.length; i++) {
      let tempVal = parseInt(myValue[i]);

      if (!isNaN(tempVal)) {
        numArray[numArray.length] = tempVal;
      }
      else {
        if (myValue[i] === ":") {
          colonsPresent += 1;
        }
        else if (myValue[i] === "h") {
          charsPresent[0] += 1;
        }
        else if (myValue[i] === "m") {
          charsPresent[1] += 1;
        }
        else if (myValue[i] === "s") {
          charsPresent[2] += 1;
        }
        else {
          return;
        }
      }
    }

    //If any values besides the numbers were modifited, we return the original value.
    if (colonsPresent != 2 | charsPresent[0] != 1 | charsPresent[1] != 1 | charsPresent[2] != 1) {
      return;
    }
    //Otherwise, we try and get the new one
    else {
      console.log("We have arried!!!")
      //If there are 6 numbers, we return the expression as such.
      if (numArray.length === 6) {
        setTimerValueArray(numArray);
        setTimerValue(`${numArray[0]}${numArray[1]}h:${numArray[2]}${numArray[3]}m:${numArray[4]}${numArray[5]}s`);
      }
      //Otherwise it needs to be processed to add in 0s
      else {
        //Determines how long the loop should go for
        whileLength = 0;
        if (numArray.length > timerValueArray.length) {
          whileLength = timerValueArray.length;
        }
        else {
          whileLength = numArray.length;
        }
        //Loop to find the index where the user put their number
        let indexFound = -1;
        currentIndex = 0;
        while (indexFound === -1 & currentIndex < whileLength) {
          if (timerValueArray[currentIndex] != numArray[currentIndex]) {
            indexFound = currentIndex;
          }
          else {
            currentIndex += 1;
          }
        }
        //Sets the indexFound to the length of the longer array if nothing is found
        if (indexFound === -1) {
          indexFound = whileLength + 1;
        }
        //
        if ((indexFound === whileLength + 1) & (numArray[indexFound] === 0)) {
          return;
        }
        else if (indexFound === 6) {
          return;
        }
        else {
          if (numArray.length === 5) {
            myArrayIndex = 0;
            newArray = [];
            for (let i = 0; i < 6; i++) {
              if (i === indexFound) {
                newArray[i] = 0;
              }
              else {
                newArray[i] = numArray[myArrayIndex];
                myArrayIndex += 1;
              }
            }
            setTimerValueArray(newArray);
            setTimerValue(`${newArray[0]}${newArray[1]}h:${newArray[2]}${newArray[3]}m:${newArray[4]}${newArray[5]}s`);
          }
          else {
            newArray = [];
            myArrayIndex = 0;
            startIndex = 0;
            while (startIndex <= 7) {
              newArray[i] = numArray[myArrayIndex]
              if (i === indexFound) {
                myArrayIndex += 2;
                startIndex += 1;
              }
              else {
                myArrayIndex += 1;
                startIndex += 1;
              }
            }
            setTimerValueArray(newArray);
            setTimerValue(`${newArray[0]}${newArray[1]}h:${newArray[2]}${newArray[3]}m:${newArray[4]}${newArray[5]}s`);
          }
        }
      } 
    }
  }
  
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
      <label>Time (seconds):</label>
      <input type="number" value={timerLength} onChange={handleChange} min="1" max="60"/>
      <br></br>
      <input type="text" value={timerValue} onChange={handleTimerChange} />
    </>
  )
}

export default App
