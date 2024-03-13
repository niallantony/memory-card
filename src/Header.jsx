import "./Header.css"

export function Header({score, newGame, inGame}) {

    return (<div className="header">
        <button className="new-game" onClick={newGame}>New Game</button>
        <div className="game-over">{inGame ? "" : "Game Over!"}</div>
        <div className="score">Score: {score}</div>
    </div>)
}