import { useEffect } from "react";
import { useState } from "react";

function Game({ view, gameMode, setFinalScore }) {
    
    const [lives, setLives] = useState(3)
    const [score, setScore] = useState(0)
    const [disabled, setDisabled] = useState(false)
    const [word, setWord] = useState({word: "hello", synonyms: ["hi", "greetings", "howdy"]})
    
    useEffect(() => {
        if (lives == 0) {
            setDisabled(true)
            setFinalScore(score)
            setTimeout(() => {
            view("result")
            }, 3000)
        }
    }, [lives, view, score, setFinalScore])


    function handleSubmit(e) {
        e.preventDefault()
        const answer = e.target.answer.value
        if (word.synonyms.some((w) => w === answer)) {
            setScore(score + 1)
            e.target.answer.value = ""
            // TODO Set new word
            return "correct"
        }
        if (gameMode == "arcade") setLives(prevLives => prevLives - 1)
        console.log(`${lives} left`)
        e.target.answer.value = ""
        // TODO Set new word 
        return "wrong"
    }

    return ( 
        <>
            {gameMode === "arcade" && <h3>{lives} Lives Left</h3>}
            <h3>{score}</h3>
            <h2>Whats Another Word For:</h2>
            <h1>{word.word}</h1>
            <form onSubmit={handleSubmit}>
                <input name="answer" type="text" disabled={disabled} />
                <button disabled={disabled}>Enter</button>
            </form>
        </>
    );
}

export default Game;
