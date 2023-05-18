function Result({ view }) {
    return ( 
        <>
            <h1>Game Over</h1>
            <div className="score">0</div>
            <button onClick={() => view("game")}>Play Again</button>
            <button onClick={() => view("title")}>Title Screen</button>
        </>
     );
}

export default Result;
