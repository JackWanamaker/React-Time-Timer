const regex = /[0-9]{1,3}h:[0-9]{1,3}m:[0-9]{1,3}s/;
const newTimerValue = (myArray) => `${myArray[0]}${myArray[1]}h:${myArray[2]}${myArray[3]}m:${myArray[4]}${myArray[5]}s`;

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
function setTimerValues(timerNumArray, setTimerValue, setOldTimerNumArray) {
    setOldTimerNumArray(timerNumArray);
    setTimerValue(newTimerValue(timerNumArray));
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
function getNumChangeIndex(oldTimerNumArray, newTimerNumArray, shorterLength) {
    //Variable that stores the index where the value in the array is different from the old one
    let indexFound = -1;
    //Iterator for the loop
    let iterator = 0;
    while (indexFound === -1 & iterator < shorterLength) {
        if (oldTimerNumArray[iterator] != newTimerNumArray[iterator]) {
            indexFound = iterator;
        }
        else {
            iterator += 1;
        }
    }
    
    //Sets the indexFound to the length of the longer array if nothing is found
    if (indexFound === -1) {
        indexFound = shorterLength;
    }
    return indexFound;
}

function arrayLengthHandler(newTimerNumArray, indexFound) {
    if (newTimerNumArray.length === 5) {
        return lengthFiveFunc(newTimerNumArray, indexFound);
    }
    else {
        return lengthSevenFunc(newTimerNumArray, indexFound);
    }
}

//Sets new timer value for length 5 array
function lengthFiveFunc(newTimerNumArray, indexFound) {
    let myArrayIndex = 0;
    let processedArray = [];
    for (let i = 0; i < 6; i++) {
        if (i === indexFound) {
            processedArray[i] = 0;
        }
        else {
            processedArray[i] = newTimerNumArray[myArrayIndex];
            myArrayIndex += 1;
        }
    }

    return processedArray;
}

//Sets new timer value for length 7 array
function lengthSevenFunc(newTimerNumArray, indexFound) {
    let processedArray = [];
    let myArrayIndex = 0;
    for (let i = 0; i < 6; i++) {
        processedArray[i] = newTimerNumArray[myArrayIndex]
        if (i === indexFound) {
            myArrayIndex += 2;
        }
        else {
            myArrayIndex += 1;
        }
    }
    
    return processedArray;
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
            setTimerValues(newTimerNumArray, setTimerValue, setOldTimerNumArray);
        }
        //Otherwise it needs to be processed to add in 0s
        else {
            //Gets the shorter length out of the two arrays
            let shorterLength = getShorterArrayLength(oldTimerNumArray, newTimerNumArray);
            //Gets the index of where a change occurred
            let indexFound = getNumChangeIndex(oldTimerNumArray, newTimerNumArray, shorterLength);
            
            //Returns the original number if there is a 7th number at the end. That is invalid.
            if (indexFound === 6) {
                return;
            }
            else {
                let processedArray = arrayLengthHandler(newTimerNumArray, indexFound);
                setTimerValues(processedArray, setTimerValue, setOldTimerNumArray);
            }
        } 
    }

    return (
        <input type="text" value={timerValue} onChange={handleTimerChange}/>
    )
}

export default TimerInput