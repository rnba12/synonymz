function Result({ view, score }) {
    return ( 
        <>
            <h1>Game Over</h1>
            <div className="score">{score}</div>
            <div className="buttons">
                <button onClick={() => view("game")}>Play Again</button>
                <button onClick={() => view("title")}>Change Mode</button>
            </div>
        </>
     );
}

export default Result;
