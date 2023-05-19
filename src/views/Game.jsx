import { useEffect } from "react";
import { useState } from "react";
import data from '../data.json';

function Game({ view, gameMode, setFinalScore }) {

    const [lives, setLives] = useState(3)
    const [score, setScore] = useState(0)
    const [word, setWord] = useState(data[0])
    const [no, setNo] = useState(0)
    const [state, setState] = useState("typing")

    function endGame() {
        if (gameMode == "arcade") setState("wrong")
        if (gameMode == "timed") setState("time up")
        setFinalScore(score)
        setTimeout(() => {
            view("result")
        }, 3000)
    }
    
    useEffect(() => {
        if (gameMode === "timed") {
            setTimeout(() => {
                endGame()
            }, 10000)
        }
        if (lives == 0) {
            endGame()
        }
    }, [lives])

    function newWord() {
        // TODO use api or add more words to json
        setWord(data[no + 1])
        setNo(prev => prev + 1)
    }

    function handleNext(isCorrect) {
        if (isCorrect) {
            setState("correct")
            setScore(score + 1)
        } else {
            setState("wrong")
            if (gameMode == "arcade") setLives(lives - 1)
        }
        setTimeout(() => {
        if (lives - 1 !== 0) {
            setState("typing")
            newWord()
        }
        },2000)
    }


    function handleSubmit(e) {
        e.preventDefault()
        const answer = e.target.answer.value
        e.target.answer.value = ""
        if (answer !== "") {
            const isCorrect = word.synonyms.some((w) => w === answer)
            handleNext(isCorrect)
        }
    }

    return ( 
        <>
            {gameMode === "arcade" && <h3>{lives} Lives Left</h3>}
            <h3>{score}</h3>
            {state === "correct" && <h2 style={{color: "green"}}>Correct</h2>}
            {state === "wrong" && <h2 style={{color: "red"}}>Wrong</h2>}
            {state === "typing" && <h2>Whats Another Word For:</h2>}
            {state === "time up" && <h2>Times Up</h2>}
            <h1>{word.word}</h1>
            <form onSubmit={handleSubmit}>
                <input name="answer" type="text" disabled={state !== "typing" || lives === 0} />
                <button disabled={state !== "typing" || lives === 0}>Enter</button>
            </form>
        </>
    );
}

export default Game;
