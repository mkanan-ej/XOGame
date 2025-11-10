import { useState } from "react"
import Player from "./Components/Player"
import GameBoard from "./Components/Gameboard"
import Log from "./Components/Log";
function deriveActivePlayer(gameTurns){
  let currPlayer = 'X';
  if(gameTurns.length > 0 && gameTurns[0].player === 'X'){ currPlayer = 'O'}
  return currPlayer;
};
function App() {
  const [ gameTurns, setGameTurns ] = useState([]);
  // const [ activePlayer, setActivePlayer ] = useState('X');
  let activePlayer=deriveActivePlayer(gameTurns);
  
  function handleSelected(rIndex,cIndex){
    // setActivePlayer((currActive) => currActive === 'X' ? 'O' : 'X');
    setGameTurns(prevTurns => {
      let currPlayer = deriveActivePlayer(prevTurns);
      
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
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
