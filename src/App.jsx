import { useState } from 'react'
import './App.css'
import Game from './views/Game'
import Result from './views/Result'
import Title from './views/Title'

function App() {
    const [view, setView] = useState("title")
    const [gameMode, setMode] = useState(null)

    return (
        <>
            {view == "title" && <Title view={setView} gameMode={setMode}/>}
            {view == "game" && <Game view={setView} gameMode={gameMode}/>}
            {view == "result" && <Result view={setView}/>}
        </>
    )
}

export default App
