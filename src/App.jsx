import { useState } from "react"
import Player from "./Components/Player"
import GameBoard from "./Components/Gameboard"
function App() {
  const [ activePlayer, setActivePlayer ] = useState('X');
  function handleSelected(){
    setActivePlayer((currActive) => currActive === 'X' ? 'O' : 'X');
  };
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player isActive={activePlayer === 'X'} initialName="Player 1" symbol="X"/>
          <Player isActive={activePlayer === 'O'} initialName="Player 2" symbol="O"/>
        </ol>
        <GameBoard onSelected={handleSelected} activePlayerSymbol={activePlayer}/>
      </div>
    </main>
  )
}

export default App
