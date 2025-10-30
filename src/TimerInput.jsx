import './TimerInput.css'

const regex = /[0-9]{1,3}h{0,1}[0-9]{0,1}:{0,1}[0-9]{1,3}m{0,1}[0-9]{0,1}:{0,1}[0-9]{1,3}s{0,1}[0-9]{0,1}/;
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
function getEntryInformation(myValue) {
    let newTimerNumArray = [];
    let colonCount = 0;
    let letterCount = 0;
    for (let i = 0; i < myValue.length; i++) {
        let tempVal = parseInt(myValue[i]);
        if (!isNaN(tempVal)) {
            newTimerNumArray[newTimerNumArray.length] = tempVal;
        }
        else {
            if (myValue[i] === ":") {
                colonCount += 1;
            }
            else {
                letterCount += 1;
            }
        }
    }
    return [newTimerNumArray, colonCount, letterCount];
}

//Sets the timer values given an array of numbers
function setTimerValues(timerNumArray, setTimerValue, setOldTimerNumArray) {
    //console.log("Setting Timer Values");
    setOldTimerNumArray(timerNumArray);
    setTimerValue(newTimerValue(timerNumArray));
}

//Gets the shorter length out of two arrays, and returns -1 if equal.
function getShorterArrayLength(array1, array2) {
    //console.log("Array1: " + array1);
    //console.log("Array2: " + array2);
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

function getNumChangeIndex2(newTimerNumArray, caretPosition) {
    //console.log("Caret Position: " + caretPosition);
    if (newTimerNumArray.length == 5) {
        return ((caretPosition % 2) + ((caretPosition - (caretPosition % 2)) * 0.5));
    }
    else {
        return (((caretPosition + (caretPosition % 2)) * 0.5) - (caretPosition % 2));
    }
}

//Handler function that calls an additional function based on array length. Returns processed array and length of original array.
function arrayLengthHandler(newTimerNumArray, indexFound) {
    if (newTimerNumArray.length === 5) {
        return [lengthFiveFunc(newTimerNumArray, indexFound), 5];
    }
    else {
        return [lengthSevenFunc(newTimerNumArray, indexFound), 7];
    }
}

//Sets new timer value for length 5 array
function lengthFiveFunc(newTimerNumArray, indexFound) {
    //console.log("Length Five Function Called");
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

//Moves the caret forward, skipping over non number characters
function moveCaretForward(setStartCaretPosition, newCaretPosition, ref) {
    //console.log("Moved Caret Forward");
    if (newCaretPosition == 11) {
        ref.current.blur();
        setStartCaretPosition(0);
    }
    else if (newCaretPosition == 3 | newCaretPosition == 7) {
        setStartCaretPosition(newCaretPosition + 2);
    }
    else {
        setStartCaretPosition(newCaretPosition);
    }
}

//Moves the caret backward
function moveCaretBackward(setStartCaretPosition, newCaretPosition) {
    //console.log("Moved Caret Backward");
    //console.log("New Caret Position: " + newCaretPosition);
    if (newCaretPosition == 4 | newCaretPosition == 8 | newCaretPosition == 3 | newCaretPosition == 7) {
        setStartCaretPosition(newCaretPosition - 2);
    }
    else {
        setStartCaretPosition(newCaretPosition);
    }
}


const TimerInput = ({ref, timerValue, setTimerValue, oldTimerNumArray, setOldTimerNumArray, startCaretPosition, setStartCaretPosition, endCaretPosition, setEndCaretPosition}) => {
    
    function handleTimerChange(e) {
        //Current string value in the text box
        const myValue = e.target.value;
        console.log(myValue);
        //Gets the current caret position
        let newCaretPosition = e.target.selectionStart;
        
        //Checks for valid regex and length and returns original value if invalid.
        if (regexFail(myValue) | lengthFail(myValue)) {
            console.log("Regex fail")
            newCaretPosition = startCaretPosition;
            return;
        }
        
        //Puts the numbers in the string in order in an array
        let tempReturn = getEntryInformation(myValue);
        let newTimerNumArray = tempReturn[0];

        if (tempReturn[1] < 2 | tempReturn[2] < 3) {
            if (newCaretPosition % 2 == 1) {
                newTimerNumArray.splice(((newCaretPosition + 1) * 0.5) - 1, 1);
                newCaretPosition -= 2;
            }
            else {
                newTimerNumArray.splice(((newCaretPosition*0.5) + 1) - 1, 1);
                newCaretPosition -= 1;
            }
        }

        else if (tempReturn[1] > 2 | tempReturn[2] > 3) {
            return;
        }

        //Otherwise it needs to be processed to add in 0s
        //Gets the shorter length out of the two arrays
        //let shorterLength = getShorterArrayLength(oldTimerNumArray, newTimerNumArray);
        //Gets the index of where a change occurred
        let indexFound = getNumChangeIndex2(newTimerNumArray, newCaretPosition);
        //console.log("Index Found: " + indexFound);
        
        //Returns the original number if there is a 7th number at the end. That is invalid.
        if (indexFound === 6) {
            return;
        }
        else {
            let processedArray = arrayLengthHandler(newTimerNumArray, indexFound);
            setTimerValues(processedArray[0], setTimerValue, setOldTimerNumArray);
            if (processedArray[1] === 5) {
                moveCaretBackward(setStartCaretPosition, newCaretPosition);
            }
            else {
                moveCaretForward(setStartCaretPosition, newCaretPosition, ref);
            }

            //If the caret is at the end we blur the input
            if (newCaretPosition == 10) {
                ref.current.blur();
            }
        } 
    }

    function handleSelect(e) {
        //console.log("Handle Select");
        if (e.target.selectionStart == e.target.selectionEnd) {
            //console.log("No Selection Made");
            return;
        }
        //console.log("Current Selection");
        //console.log("Start Caret Position: " + e.target.selectionStart);
        //console.log("End Caret Position: " + e.target.selectionEnd);
        //console.log("Stored Values");
        //console.log("Start Caret Position: " + startCaretPosition);
        //console.log("End Caret Position: " + endCaretPosition);
        e.target.selectionStart = startCaretPosition;
        e.target.selectionEnd = startCaretPosition;
    }

    function handleMouseKey(e) {
        //console.log("Handle Mouse Key");
        //console.log("Selection Start: " + e.target.selectionStart);
        //console.log("Selection End: " + e.target.selectionEnd);
        //console.log("Start Caret Position: " + startCaretPosition);
        //console.log("End Caret Position: " + endCaretPosition);
        if (e.target.selectionStart != e.target.selectionEnd) {
            if (e.target.selectionStart == startCaretPosition) {
                e.target.selectionEnd = startCaretPosition;
            }
            else {
                e.target.selectionStart = startCaretPosition;
            }
        }
        else {
            setStartCaretPosition(e.target.selectionStart);
            setEndCaretPosition(e.target.selectionStart);
        }
    }

    return (
        <input ref={ref} type="text" value={timerValue} onChange={handleTimerChange} onSelect={handleSelect} onMouseUp={handleMouseKey} onKeyUp={handleMouseKey}/>
    )
}

export default TimerInput