import { useState } from "react"
import HowTo from "../components/HowTo"

function Title({view, gameMode}) {
    const [showHowTo, setShow] = useState(false) 

    function startGame(mode) {
        console.log(`Game Started in ${mode} mode`)
        gameMode(mode)
        view("game")
    }
    function handleHowTo() {
        setShow(prev => !prev)
    }

    return ( 
        <>
            {!showHowTo ? 
                <>
                    <h1>Synonymz</h1>
                    <button onClick={() => startGame("arcade")}>Arcade</button>
                    <button onClick={() => startGame("timed")}>Timed</button>
                    <button onClick={handleHowTo}>How to Play</button>
                </> 
            :
                <>
                    <HowTo/>
                    <button onClick={handleHowTo}>Back</button>
                </>
            }
        </>
     );
}

export default Title;
