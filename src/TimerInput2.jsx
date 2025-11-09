import './TimerInput.css'

const TimerInput2 = ({ref0, ref1, ref2, timerValue, setTimerValue, oldTimerNumArray, setOldTimerNumArray, startCaretPosition, setStartCaretPosition, endCaretPosition, setEndCaretPosition}) => {

    function handleChange(e) {
        return;

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

    function handleMouse(e) {
        se
    }
    
    function handleKeyboardKeys(e) {
        
        if (e.key === "ArrowLeft") {
            if ((e.target.id == "1" || e.target.id == "2") && e.target.selectionStart == 0) {

            }
        
    }
    
    return (
        <>
            <div className="no-space">
                <input ref={ref0} id="0" type="text" value={timerValue[0]} onChange={handleChange} onSelect={handleSelect} onKeyUp={handleKeyboardKeys}/>
                <p>H:</p>
                <input ref={ref1} id="1" type="text" value={timerValue[1]} onChange={handleChange} onSelect={handleSelect} onKeyUp={handleKeyboardKeys}/>
                <p>M:</p>
                <input ref={ref2} id="2" type="text" value={timerValue[2]} onChange={handleChange} onSelect={handleSelect} onKeyUp={handleKeyboardKeys}/>
                <p>S</p>
            </div>
        </>
    )

}

export default TimerInput2