import { useEffect } from "react";
import { useState } from "react";

function Game({ view, gameMode }) {
    
    const [gameActive, setActive] = useState(true)
    
    const [lives, setLives] = useState(3)
    const [score, setScore] = useState(0)
    const [word, setWord] = useState({word: "hello", synonyms: ["hi", "greetings", "howdy"]})
    
    useEffect(() => {
        if (lives == 0) {
            view("result")
        }
    }, [lives, view])

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
        
        // if (lives == 0) {
        //     console.log("game over")
        //     view("result")
        // }
        return "wrong"
    }

    return ( 
        <>
            <div className="lives">{lives} Lives Left</div>
            <div className="score">{score}</div>
            <h1>Whats Another Word For:</h1>
            <h2>{word.word}</h2>
            <form onSubmit={handleSubmit}>
                <input name="answer" type="text" />
                <button>Enter</button>
            </form>
        </>
    );
}

export default Game;
