import { useState } from "react"
import HowTo from "../components/HowTo"
import NavBar from "../components/NavBar"

function Title({view, gameMode}) {
    const [showHowTo, setShow] = useState(false) 

    function startGame(mode) {
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
                    <div id="logo">
                        <h1>Synonymz</h1>
                        {/* <div>High Score: 3</div> */}
                    </div>
                    <div className="buttons">
                        <button onClick={() => startGame("arcade")}>Arcade</button>
                        <button onClick={() => startGame("timed")}>Timed</button>
                        <button onClick={handleHowTo}>How to Play</button>
                    </div>
                    <br />
                <NavBar/>
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
