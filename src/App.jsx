import { Board } from './Board'
import { Header } from './Header';
import { useState } from 'react';
import './App.css'

function App() {

  const [game, setGame] = useState(false);
  const [inGame, setInGame] = useState(true);
  const [score, setScore] = useState(0);

  const newGame = () => {
    if (!game) {
      setInGame(true);
      setGame(true)
      setScore(0);
    } else {
      setGame(false);
      setTimeout(() => restartGame(), 0);
    }
  }

  const restartGame = () => {
    setScore(0);
    setGame(true);
    setInGame(true);
  }


  return (
    <>
      <Header score={score} inGame={inGame} newGame={newGame}/>
      {game ? (<Board score={score} increaseScore={setScore} inGame={inGame} setGame={setInGame}/>) : <></>}
    </>
  )
}

export default App
