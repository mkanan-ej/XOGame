import { useState } from "react"
import Player from "./Components/Player"
import GameBoard from "./Components/Gameboard"
import Log from "./Components/Log";
function App() {
  const [ activePlayer, setActivePlayer ] = useState('X');
  const [ gameTurns, setGameTurns ] = useState([]);
  function handleSelected(rIndex,cIndex){
    setActivePlayer((currActive) => currActive === 'X' ? 'O' : 'X');
    setGameTurns(prevTurns => {
      let currPlayer = 'X';

      if(prevTurns.length > 0 && prevTurns[0].player === 'X'){ currPlayer = 'O' }
      
      const updatedTurns = [{ square: { row: rIndex, col: cIndex }, player: currPlayer },...prevTurns];
      
      return updatedTurns;
    });
  };

  
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player isActive={activePlayer === 'X'} initialName="Player 1" symbol="X"/>
          <Player isActive={activePlayer === 'O'} initialName="Player 2" symbol="O"/>
        </ol>
        <GameBoard onSelected={handleSelected} turns={gameTurns} />
      </div>
      <Log />
    </main>
  )
}

export default App
