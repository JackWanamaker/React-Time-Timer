import './TimerInput.css'

const TimerInput2 = ({refs, ref0, ref1, ref2, timerValue, setTimerValue, oldTimerNumArray, setOldTimerNumArray, startCaretPosition, setStartCaretPosition, canBackSpace}) => {

    function handleChange(e) {
        console.log("Handle Change");
        console.log(e.target.value);
        const currentBox = e.target.id;
        if (e.target.value.length != 1 & e.target.value.length != 3) {
            return;
        }
        else if (e.target.value.length == 1) {
            if (e.target.selectionStart == 0) {
                setTimerValue([
                    currentBox == "0" ? "0" + timerValue[0][1] : timerValue[0],
                    currentBox == "1" ? "0" + timerValue[1][1] : timerValue[1],
                    currentBox == "2" ? "0" + timerValue[2][1] : timerValue[2]
                ]);

            }
            else {
                setTimerValue([
                    currentBox == "0" ? timerValue[0][0] + "0" : timerValue[0],
                    currentBox == "1" ? timerValue[1][0] + "0" : timerValue[1],
                    currentBox == "2" ? timerValue[2][0] + "0" : timerValue[2]
                ]);
            }
            setStartCaretPosition([parseInt(currentBox), e.target.selectionStart]);
            canBackSpace.current = false;
        }
        else {
            console.log("Three Characters Inputted");
            console.log("Selection Start: " + e.target.selectionStart);
            if (e.target.selectionStart == 1) {
                setTimerValue([
                    currentBox == "0" ? e.target.value[0] + e.target.value[2] : timerValue[0],
                    currentBox == "1" ? e.target.value[0] + e.target.value[2] : timerValue[1],
                    currentBox == "2" ? e.target.value[0] + e.target.value[2] : timerValue[2]
                ]);
            }
            else if (e.target.selectionStart == 2) {
                setTimerValue([
                    currentBox == "0" ? e.target.value[0] + e.target.value[1] : timerValue[0],
                    currentBox == "1" ? e.target.value[0] + e.target.value[1] : timerValue[1],
                    currentBox == "2" ? e.target.value[0] + e.target.value[1] : timerValue[2]
                ]);
            }
            else {
                setTimerValue([
                    timerValue[0],
                    currentBox == "0" ? e.target.value[2] + timerValue[1][1] : timerValue[1],
                    currentBox == "1" ? e.target.value[2] + timerValue[2][1] : timerValue[2]
                ]);
            }
        }

    }
    
    function handleSelect(e) {
        //console.log("Handle Select");
        if (e.target.selectionStart == e.target.selectionEnd) {
            //console.log("No Selection Made");
            return;
        }
        e.target.selectionStart = startCaretPosition[1];
        e.target.selectionEnd = startCaretPosition[1];
    }
    
    function handleClick(e) {
        console.log("Handle Click");
        if (e.target.selectionStart == e.target.selectionEnd) {
            setStartCaretPosition([parseInt(e.target.id), e.target.selectionStart]);
        }
    }
    
    function handleKeyboardKeys(e) {
        console.log(refs);
        if (e.key === "ArrowLeft") {
            if ((e.target.id == "1" || e.target.id == "2") && e.target.selectionStart == 0 && startCaretPosition[1] == 0) {
                if (e.target.id == "1") {
                    refs[0].current.focus();
                    setStartCaretPosition([0, 2]);
                }
                else if (e.target.id == "2") {
                    refs[1].current.focus();
                    setStartCaretPosition([1, 2]);
                }
            }
            else {
                setStartCaretPosition([parseInt(e.target.id), e.target.selectionStart]);
            }
        }
        else if (e.key === "ArrowRight") {
            if ((e.target.id == "0" || e.target.id == "1") && e.target.selectionStart == 2 && startCaretPosition[1] == 2) {
                if (e.target.id == "0") {
                    refs[1].current.focus();
                    setStartCaretPosition([1, 0]);
                }
                else if (e.target.id == "1") {
                    refs[2].current.focus();
                    setStartCaretPosition([2, 0]);
                }
            }
            else {
                setStartCaretPosition([parseInt(e.target.id), e.target.selectionStart]);
            }
        }
        else if (e.key === "Backspace") {
            console.log(e.target.selectionStart);
            if (e.target.selectionStart == 0 && startCaretPosition[1] == 0 & (e.target.id == "1" || e.target.id == "2") & canBackSpace.current == true) {
                if (e.target.id == "1") {
                    refs[0].current.focus();
                    setStartCaretPosition([0, 1]);
                    refs[0].current.selectionStart = 1;
                    refs[0].current.selectionEnd = 1;
                    setTimerValue([timerValue[0][0] + "0", timerValue[1], timerValue[2]]);
                }
                else if (e.target.id == "2") {
                    refs[1].current.focus();
                    setStartCaretPosition([1, 1]);
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