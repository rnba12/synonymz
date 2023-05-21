import { useEffect } from "react";
import { useState } from "react";
import data from '../data.json';
import GameData from "../components/GameData";

function Game({ view, gameMode, setFinalScore }) {

    const [lives, setLives] = useState(3)
    const [time, setTime] = useState(60)
    const [score, setScore] = useState(0)
    const [word, setWord] = useState(data[0])
    const [no, setNo] = useState(0)
    const [state, setState] = useState("typing")

    function endGame() {
        if (gameMode == "arcade") setState("wrong")
        if (gameMode == "timed") setState("time up")
        setFinalScore(score)
        const highScore = window.localStorage.getItem(`${gameMode}-highscore`)
        if (score > highScore || !highScore) window.localStorage.setItem(`${gameMode}-highscore`, score)
        setTimeout(() => {
            view("result")
        }, 3000)
    }

    
    useEffect(() => {
        if (gameMode === "timed") {
            if (time !== 0) {
            let timer = setInterval(() => {
                setTime(time - 1)
                clearInterval(timer)
            }, 1000)
            } else {
                endGame()
            }
        }
        if (lives == 0) {
            endGame()
        }
    }, [lives, time])

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
        if (lives - 1 !== 0 && time > 2) {
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
           <GameData score={score} time={time} lives={lives} gameMode={gameMode}/>
            <div id="prompt">
                {state === "correct" && <span style={{color: "green"}}>Correct</span>}
                {state === "wrong" && <span style={{color: "red"}}>Wrong</span>}
                {state === "typing" && <span>What&apos;s Another Word For</span>}
                {state === "time up" && <span style={{color: "red"}}>Times Up</span>}
            </div>
            <div id="word">{word.word}</div>
            <form className="flex-row" onSubmit={handleSubmit} autoComplete="off">
                <input name="answer" type="text"  disabled={state !== "typing" || lives === 0} />
                <button disabled={state !== "typing" || lives === 0}>Enter</button>
            </form>
        </>
    );
}

export default Game;
