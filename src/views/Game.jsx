function Game({ view, gameMode}) {
    console.log(`${gameMode} mode`)

    return ( 
        <>
            
            <div className="score">0</div>
            <h1>Whats Another Word For:</h1>
            <input type="text" />
            <button>Enter</button>
        </>
    );
}

export default Game;
