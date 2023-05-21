import { useState } from 'react'
import './App.css'
import Game from './views/Game'
import Result from './views/Result'
import Title from './views/Title'
import { useEffect } from 'react'

function App() {
    const [theme, setTheme] = useState(window.localStorage.getItem("theme"))
    const [view, setView] = useState("title")
    const [gameMode, setMode] = useState(null)
    const [finalScore, setFinalScore] = useState(0)

    useEffect(() => {
        if (!theme) {
            window.localStorage.setItem("theme", "dark")
            setTheme("dark")
        }
        if (window.localStorage.getItem("theme") === "light") {
            setTheme("light")
        }
    }, [theme])

    return (
        <>
            <main data-theme={theme}>
                {view == "title" && <Title view={setView} gameMode={setMode} theme={setTheme}/>}
                {view == "game" && <Game view={setView} gameMode={gameMode} setFinalScore={setFinalScore}/>}
                {view == "result" && <Result view={setView} score={finalScore} gameMode={gameMode}/>}
            </main>
        </>
    )
}

export default App
