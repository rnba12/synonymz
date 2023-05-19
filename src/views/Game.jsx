import { useEffect } from "react";
import { useState } from "react";
import data from '../data.json';

function Game({ view, gameMode, setFinalScore }) {
    // console.log(wordList)
    const [lives, setLives] = useState(3)
    const [score, setScore] = useState(0)
    const [word, setWord] = useState(data[0])
    const [no, setNo] = useState(0)
    const [state, setState] = useState("typing")

    function endGame() {
        setState("wrong")
        setFinalScore(score)
        setTimeout(() => {
            view("result")
            }, 3000)
    }
    
    useEffect(() => {
        if (lives == 0) {
            endGame()
        }
    }, [lives])

    function handleNext(isCorrect) {
        if (isCorrect) {
            setState("correct")
            setScore(score + 1)
        } else {
            setState("wrong")
            if (gameMode == "arcade") setLives(lives - 1)
        }
        setTimeout(() => {
            setState("typing")
            setWord(data[no + 1])
            setNo(prev => prev + 1)
        },2000)
        
    }


    function handleSubmit(e) {
        e.preventDefault()
        const answer = e.target.answer.value
        e.target.answer.value = ""
        const isCorrect = word.synonyms.some((w) => w === answer)
        handleNext(isCorrect)
    }

    return ( 
        <>
            {gameMode === "arcade" && <h3>{lives} Lives Left</h3>}
            <h3>{score}</h3>
            {state === "typing" && <h2>Whats Another Word For:</h2>}
            {state === "correct" && <h2 style={{color: "green"}}>Correct</h2>}
            {state === "wrong" && <h2 style={{color: "red"}}>Wrong</h2>}
            <h1>{word.word}</h1>
            <form onSubmit={handleSubmit}>
                <input name="answer" type="text" disabled={state !== "typing" || lives === 0} />
                <button disabled={state !== "typing" || lives === 0}>Enter</button>
            </form>
        </>
    );
}

export default Game;
