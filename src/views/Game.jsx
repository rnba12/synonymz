import { useEffect } from "react";
import { useState } from "react";
import data from '../data.json';
import GameData from "../components/GameData";

function Game({ view, gameMode, setFinalScore }) {
    
    const [shuffled, setShuffled] = useState(false)
    const [lives, setLives] = useState(3)
    const [time, setTime] = useState(6060)
    const [score, setScore] = useState(0)
    const [word, setWord] = useState(null)
    const [no, setNo] = useState(0)
    const [state, setState] = useState(null)

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

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
        if (!shuffled) {
            shuffleArray(data)
            setWord(data[0])
            setShuffled(true)
            setState("typing")
        }
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
    }, [lives, time, no])


    function newWord() {
        // TODO use api or add more words to json
        console.log(no)
        if (!data[no + 1] || lives == 0) {
            endGame()
        }
        else {
            setWord(data[no + 1])
            setNo(no + 1)
        }
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
        if (lives !== 0 && time > 2) {
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
            {state && <>
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
            </>}
        </>
    );
}

export default Game;
