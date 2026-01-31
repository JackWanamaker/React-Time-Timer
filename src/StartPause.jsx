const StartPause = ({isRunning = false, handleStartPause}) => {

    let pathData = "";

    if (isRunning) {
        pathData = "M7 1H2V15H7V1Z M14 1H9V15H14V1Z"
    }
    else {
        pathData = "M5 16L7 16L15 8L7 -2.7818e-08L5 0L5 16Z"
    }
    
    return (
        <button onClick={handleStartPause}>
        <svg width="25px" height="25px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d={pathData} fill="#ffffff"/>
        </svg>
        </button>
    )
}

export default StartPause