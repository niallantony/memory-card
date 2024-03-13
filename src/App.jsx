import { Board } from './Board'
import { Header } from './Header';
import { useState } from 'react';
import './App.css'

function App() {

  const [game, setGame] = useState(false);
  const [inGame, setInGame] = useState(false);
  const [score, setScore] = useState(0);

  const newGame = () => {
    setInGame(true);
    setGame(true)
    setScore(0);
  }



  return (
    <>
      <Header score={score} newGame={newGame}/>
      {game ? (<Board score={score} increaseScore={setScore} inGame={inGame} setGame={setInGame}/>) : <></>}
    </>
  )
}

export default App
