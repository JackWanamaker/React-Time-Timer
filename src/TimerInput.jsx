const regex = /[0-9]{1,3}h:[0-9]{1,3}m:[0-9]{1,3}s/;

//Returns true if regex doesn't match
function regexFail(myValue) {
    if (!regex.test(myValue)) {
        console.log("Regex Failed");
        return true;
    }
    return false;
}

//Returns true if length is too short or too long.
function lengthFail(myValue) {
    if (myValue.length < 10 | myValue.length > 12) {
        return true;
    }
    return false;
}

//Adds all numbers present to an array and returns the array
function getNewNumArray(myValue) {
    let newTimerNumArray = [];
    for (let i = 0; i < myValue.length; i++) {
        let tempVal = parseInt(myValue[i]);
        if (!isNaN(tempVal)) {
            newTimerNumArray[newTimerNumArray.length] = tempVal;
        }
    }
    console.log(newTimerNumArray)
    return newTimerNumArray;
}

//Sets the timer values given an array of numbers
function setTimerValues(timerNumArray) {
    setOldTimerNumArray(timerNumArray);
    setTimerValue(`${timerNumArray[0]}${timerNumArray[1]}h:${timerNumArray[2]}${timerNumArray[3]}m:${timerNumArray[4]}${timerNumArray[5]}s`);
}

//Gets the shorter length out of two arrays, and returns -1 if equal.
function getShorterArrayLength(array1, array2) {
    if (array1.length > array2.length) {
        return array2.length;
    }
    else if (array2.length > array1.length) {
        return array1.length;
    }
    else {
        console.log("Error. Arrays are same length")
        return -1;
    }
}

//Gets the index of where the change occurred. This code still needs cleanup
function getNumChangeIndex(oldTimerNumArray, newTimerNumArray) {
    let shorterLength = getShorterArrayLength(oldTimerNumArray, newTimerNumArray);
    let indexFound = -1;
    let shorterLengthLoopIndex = 0;
    while (indexFound === -1 & shorterLengthLoopIndex < shorterLength) {
        if (oldTimerNumArray[shorterLengthLoopIndex] != newTimerNumArray[shorterLengthLoopIndex]) {
            indexFound = shorterLengthLoopIndex;
        }
        else {
            shorterLengthLoopIndex += 1;
        }
    }
    
    //Sets the indexFound to the length of the longer array if nothing is found
    if (indexFound === -1) {
        indexFound = shorterLength;
    }
    return indexFound;
}

const TimerInput = ({timerValue, setTimerValue, oldTimerNumArray, setOldTimerNumArray}) => {
    
    function handleTimerChange(e) {
        //Current string value in the text box
        const myValue = e.target.value;
        
        //Checks for valid regex and length and returns original value if invalid.
        if (regexFail(myValue) | lengthFail(myValue)) {
            return;
        }
        
        //Puts the numbers in the string in order in an arrayS
        let newTimerNumArray = getNewNumArray(myValue);
        console.log("Finished getting num Loop");

        //If there are 6 numbers in the array, no processing is needed and it can be returned.
        if (newTimerNumArray.length === 6) {
            console.log("Six numbers present");
            setTimerValues(newTimerNumArray);
        }
        //Otherwise it needs to be processed to add in 0s
        else {
            //Gets the index of where a change occurred
            let indexFound = getNumChangeIndex(oldTimerNumArray, newTimerNumArray);
            
            //Returns the original number if there is a 7th number at the end. That is invalid.
            if (indexFound === 6) {
                return;
            }
            else {
                if (newTimerNumArray.length === 5) {
                let myArrayIndex = 0;
                let newArray = [];
                for (let i = 0; i < 6; i++) {
                    if (i === indexFound) {
                    newArray[i] = 0;
                    }
                    else {
                    newArray[i] = newTimerNumArray[myArrayIndex];
                    myArrayIndex += 1;
                    }
                }
                setOldTimerNumArray(newArray);
                setTimerValue(`${newArray[0]}${newArray[1]}h:${newArray[2]}${newArray[3]}m:${newArray[4]}${newArray[5]}s`);
                }
                else {
                let newArray = [];
                let myArrayIndex = 0;
                let startIndex = 0;
                while (startIndex <= 7) {
                    newArray[startIndex] = newTimerNumArray[myArrayIndex]
                    if (startIndex === indexFound) {
                    myArrayIndex += 2;
                    startIndex += 1;
                    }
                    else {
                    myArrayIndex += 1;
                    startIndex += 1;
                    }
                }
                setOldTimerNumArray(newArray);
                setTimerValue(`${newArray[0]}${newArray[1]}h:${newArray[2]}${newArray[3]}m:${newArray[4]}${newArray[5]}s`);
        }
      }
    } 
  }

    return (
        <input type="text" value={timerValue} onChange={handleTimerChange}/>
    )
}

export default TimerInput