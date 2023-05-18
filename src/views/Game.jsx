import { useEffect } from "react";
import { useState } from "react";

function Game({ view, gameMode, setFinalScore }) {
    
    const [lives, setLives] = useState(3)
    const [score, setScore] = useState(0)
    const [word, setWord] = useState({word: "hello", synonyms: ["hi", "greetings", "howdy"]})
    
    useEffect(() => {
        if (lives == 0) {
            setFinalScore(score)
            view("result")
        }
    }, [lives, view, score, setFinalScore])


    function handleSubmit(e) {
        e.preventDefault()
        const answer = e.target.answer.value
        if (word.synonyms.some((w) => w === answer)) {
            setScore(score + 1)
            e.target.answer.value = ""
            return "correct"
        }
        if (gameMode == "arcade") setLives(prevLives => prevLives - 1)
        console.log(`${lives} left`)
        e.target.answer.value = ""
        
        return "wrong"
    }

    return ( 
        <>
            <div className="lives">{lives} Lives Left</div>
            <div className="score">{score}</div>
            <h2>Whats Another Word For:</h2>
            <h1>{word.word}</h1>
            <form onSubmit={handleSubmit}>
                <input name="answer" type="text" />
                <button>Enter</button>
            </form>
        </>
    );
}

export default Game;
