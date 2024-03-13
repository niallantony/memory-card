import { Board } from './Board'
import { Header } from './Header';
import { useState } from 'react';
import './App.css'

function App() {

  const [game, setGame] = useState(null);
  const [score, setScore] = useState(0);

  const newGame = () => {
    setGame(<Board onSuccess={increaseScore} />)
    setScore(0);
  }

  const increaseScore = () => {
    setScore(score + 1);
  }

  return (
    <>
      <Header score={score} newGame={newGame}/>
      {game}
    </>
  )
}

export default App
