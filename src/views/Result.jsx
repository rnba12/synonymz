function Result({ view, score }) {
    return ( 
        <>
            <h1  style={{marginBottom: "0px"}}>Game Over</h1>
            <div className=" score final-score">{score}</div>
            <div className="high-score">High Score: 4</div>
            <div className="flex-row">
                <button onClick={() => view("game")}>Play Again</button>
                <button onClick={() => view("title")}>Change Mode</button>
            </div>
        </>
     );
}

export default Result;
