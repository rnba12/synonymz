import { useState } from 'react'
import './App.css'
import Game from './views/Game'
import Result from './views/Result'
import Title from './views/Title'

function App() {
    const [view, setView] = useState("title")

    return (
        <>
            {view == "title" && <Title/>}
            {view == "game" && <Game/>}
            {view == "result" && <Result/>}
        </>
    )
}

export default App
