function Title({view, gameMode}) {

    function startGame(mode) {
        console.log(`Game Started in ${mode} mode`)
        gameMode(mode)
        view("game")
    }
    function handleDocs() {
        console.log("Show how to play")
    }

    return ( 
        <>
        <h1>Synonymz</h1>
        <button onClick={() => startGame("arcade")}>Arcade</button>
        <button onClick={() => startGame("timed")}>Timed</button>
        <button onClick={handleDocs}>How to Play</button>
        </>
     );
}

export default Title;
