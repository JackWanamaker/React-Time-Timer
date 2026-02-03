import './TimerInput.css'

const TimerInput2 = ({refs, timerValue, setTimerValue, caret, setCaret}) => {

    /*
    e.target.value is the value of the current box
    e.target.value.length is the length of the value of the current box
    e.target.selectionStart is the position of the caret in the current box
    e.target.selectionEnd is the position of the end of the selection in the current box
    e.target.id is the id of the current box (0, 1, or 2)
    */
    
    function oneNumHandler(e, boxIndex) {
        const isFirstPosition = e.target.selectionStart === 0;
        const newTimerValue = timerValue.map((value, index) => {
            if (index !== boxIndex) return value;

            return isFirstPosition
                ? "0" + value[1]
                : value[0] + "0"
            });

        setTimerValue(newTimerValue);

        if (isFirstPosition && boxIndex > 0) {
            setCaret([boxIndex - 1, 2])
        } else {
            setCaret([boxIndex, e.target.selectionStart])
        }
        
    }

    function threeNumHandler(e, boxIndex) {
        const isSecondPosition = e.target.selectionStart === 1;
        const isThirdPosition = e.target.selectionStart === 2;

        const newTimerValue = timerValue.map((value, index) => {
            if (index !== boxIndex) return value;

            if (isSecondPosition) {
                setCaret([boxIndex, 1]);
                return e.target.value[0] + e.target.value[2];
            } else if (isThirdPosition) {
                setCaret(boxIndex !==2 ? [boxIndex + 1, 0] : [boxIndex, 2]);
                return e.target.value[0] + e.target.value[1];
            } else {
                setCaret([boxIndex + 1, 1]);
                return e.target.value[2] + value[1];
            }
        });

        setTimerValue(newTimerValue);
    }
    
    function handleChange(e) {
        console.log("Handle Change");
        console.log(e.target.value);
        const boxIndex = parseInt(e.target.id);
        
        //DENIALS
        
        //Denial of 2 character input (user selected a number and replaced it)
        if (e.target.value.length !== 1 & e.target.value.length !== 3) {
            return;
        }

        //Denial of 3 character input where the input is put in at the very end (invalid)
        if (e.target.value.length === 3 && caret[0] === 2 && caret[1] === 2) {
            return;
        }
        //ACCEPTANCES

        //User removed a number (please make this a separate function later)
        else if (e.target.value.length == 1) {
            oneNumHandler(e, boxIndex);
        }
        //User added a number (please make this a separate function later)
        else {
            threeNumHandler(e, boxIndex);
        }

    }
    
    function handleSelect(e) {
        //console.log("Handle Select");
        if (e.target.selectionStart == e.target.selectionEnd) {
            //console.log("No Selection Made");
            return;
        }
        e.target.selectionStart = caret[1];
        e.target.selectionEnd = caret[1];
    }
    
    function handleClick(e) {
        console.log("Handle Click");
        if (e.target.selectionStart == e.target.selectionEnd) {
            setCaret([parseInt(e.target.id), e.target.selectionStart]);
        }
    }
    
    function handleKeyboardKeys(e) {
        const currentID = parseInt(e.target.id);
        if (e.key === "ArrowLeft") {
            if (currentID > 0 && e.target.selectionStart === 0 && caret[1] === 0) {
                refs[currentID-1].current.focus();
                setCaret([currentID-1, 2])
            } else {
                setCaret([currentID, e.target.selectionStart]);
            }
        } else if (e.key === "ArrowRight") {
            if (currentID < 2 && e.target.selectionStart === 2 && caret[1] == 2) {
                refs[currentID+1].current.focus();
                refs[currentID+1].current.selectionStart = 0;
                refs[currentID+1].current.selectionEnd = 0;
                setCaret([currentID+1, 0]);
            } else {
                setCaret([currentID, e.target.selectionStart]);
            }
        } else if (e.key === "Backspace") {
            if (currentID > 0 && e.target.selectionStart === 0 && caret[1] === 0) {
                refs[currentID-1].current.focus();
                setCaret([currentID-1, 1]);
                refs[currentID-1].current.selectionStart = 1;
                refs[currentID-1].current.selectionEnd = 1;
                setTimerValue(currentID === 0
                              ? [timerValue[0][0] + "0", timerValue[1], timerValue[2]]
                              : [timerValue[0], timerValue[1][0] + "0", timerValue[2]]
                )
        }
    }
}
    
    return (
        <>
            <div className="no-space">
                <input ref={refs[0]} id="0" type="text" value={timerValue[0]} onChange={handleChange} onSelect={handleSelect} onKeyUp={handleKeyboardKeys} onMouseUp={handleClick}/>
                <p>H:</p>
                <input ref={refs[1]} id="1" type="text" value={timerValue[1]} onChange={handleChange} onSelect={handleSelect} onKeyUp={handleKeyboardKeys} onMouseUp={handleClick}/>
                <p>M:</p>
                <input ref={refs[2]} id="2" type="text" value={timerValue[2]} onChange={handleChange} onSelect={handleSelect} onKeyUp={handleKeyboardKeys} onMouseUp={handleClick}/>
                <p>S</p>
            </div>
        </>
    )
}

export default TimerInput2