import './TimerInput.css'

const TimerInput2 = ({refs, timerValue, setTimerValue, caret, setCaret, canBackSpace}) => {

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

    function threeNumHandler(e, currentBox) {
        if (e.target.selectionStart == 1) {
            console.log("Here");
            setTimerValue([
                currentBox == "0" ? e.target.value[0] + e.target.value[2] : timerValue[0],
                currentBox == "1" ? e.target.value[0] + e.target.value[2] : timerValue[1],
                currentBox == "2" ? e.target.value[0] + e.target.value[2] : timerValue[2]
            ]);
            setCaret([parseInt(currentBox),1]);
            }
        else if (e.target.selectionStart == 2) {
            setTimerValue([
                currentBox == "0" ? e.target.value[0] + e.target.value[1] : timerValue[0],
                currentBox == "1" ? e.target.value[0] + e.target.value[1] : timerValue[1],
                currentBox == "2" ? e.target.value[0] + e.target.value[1] : timerValue[2]
            ]);
            setCaret([parseInt(currentBox),2]);
            if (parseInt(currentBox) == 0 | parseInt(currentBox) == 1) {
                console.log("I'm here");
                setCaret([parseInt(currentBox) + 1, 0]);
            }
            }
        else {
            setTimerValue([
                timerValue[0],
                currentBox == "0" ? e.target.value[2] + timerValue[1][1] : timerValue[1],
                currentBox == "1" ? e.target.value[2] + timerValue[2][1] : timerValue[2]
            ]);
            if (parseInt(currentBox) == 0 | parseInt(currentBox) == 1) {
                console.log("I'm here");
                setCaret([parseInt(currentBox) + 1, 1]);
            }
            else {
                setCaret([2,2]);
            }
        }
    }
    
    function handleChange(e) {
        console.log("Handle Change");
        console.log(e.target.value);
        const boxIndex = parseInt(e.target.id);
        
        //DENIALS
        
        //Denial of 2 character input (user selected a number and replaced it)
        if (e.target.value.length != 1 & e.target.value.length != 3) {
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
        if (e.key === "ArrowLeft") {
            if ((e.target.id == "1" || e.target.id == "2") && e.target.selectionStart == 0 && caret[1] == 0) {
                if (e.target.id == "1") {
                    refs[0].current.focus();
                    setCaret([0, 2]);
                }
                else if (e.target.id == "2") {
                    refs[1].current.focus();
                    setCaret([1, 2]);
                }
            }
            else {
                setCaret([parseInt(e.target.id), e.target.selectionStart]);
            }
        }
        else if (e.key === "ArrowRight") {
            if ((e.target.id == "0" || e.target.id == "1") && e.target.selectionStart == 2 && caret[1] == 2) {
                if (e.target.id == "0") {
                    console.log("Option One")
                    refs[1].current.focus();
                    refs[1].current.selectionStart = 0;
                    setCaret([1, 0]);
                }
                else if (e.target.id == "1") {
                    console.log("Option Two")
                    refs[2].current.focus();
                    refs[2].current.selectionStart = 0;
                    setCaret([2, 0]);
                }
            }
            else {
                console.log("Option Three");
                setCaret([parseInt(e.target.id), e.target.selectionStart]);
            }
        }
        else if (e.key === "Backspace") {
            console.log(e.target.selectionStart);
            if (e.target.selectionStart == 0 && caret[1] == 0 & (e.target.id == "1" || e.target.id == "2") & canBackSpace.current == true) {
                if (e.target.id == "1") {
                    refs[0].current.focus();
                    setCaret([0, 1]);
                    refs[0].current.selectionStart = 1;
                    refs[0].current.selectionEnd = 1;
                    setTimerValue([timerValue[0][0] + "0", timerValue[1], timerValue[2]]);
                }
                else if (e.target.id == "2") {
                    refs[1].current.focus();
                    setCaret([1, 1]);
                    refs[1].current.selectionStart = 1;
                    refs[1].current.selectionEnd = 1;
                    setTimerValue([timerValue[0], timerValue[1][0] + "0", timerValue[2]]);
                }
            }
            canBackSpace.current = true;
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