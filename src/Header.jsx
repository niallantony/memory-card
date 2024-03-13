import "./Header.css"

export function Header({score, newGame}) {

    return (<div className="header">
        <button className="new-game" onClick={newGame}>New Game</button>
        <div className="score">Score: {score}</div>
    </div>)
}