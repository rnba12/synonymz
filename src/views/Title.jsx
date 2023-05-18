function Title() {

    function startGame(mode) {
        console.log(`Game Started in ${mode} mode`)
    }
    function handleDocs() {
        console.log("Show how to play")
    }

    return ( 
        <>
        <h1>Synonymz</h1>
        <button onClick={() => startGame("Arcade")}>Arcade</button>
        <button onClick={() => startGame("Timed")}>Timed</button>
        <button onClick={handleDocs}>How to Play</button>
        </>
     );
}

export default Title;
