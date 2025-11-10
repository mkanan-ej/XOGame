import { useState } from "react";
import Player from "./Components/Player";
import GameBoard from "./Components/Gameboard";
import Log from "./Components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const initialGB = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currPlayer = "O";
  }
  return currPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  // const [ activePlayer, setActivePlayer ] = useState('X');
  let activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = initialGB;
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = firstSquareSymbol;
    }
  }

  function handleSelected(rIndex, cIndex) {
    // setActivePlayer((currActive) => currActive === 'X' ? 'O' : 'X');
    setGameTurns((prevTurns) => {
      let currPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rIndex, col: cIndex }, player: currPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            isActive={activePlayer === "X"}
            initialName="Player 1"
            symbol="X"
          />
          <Player
            isActive={activePlayer === "O"}
            initialName="Player 2"
            symbol="O"
          />
        </ol>
        {winner && <p>You won, {winner}</p>}
        <GameBoard onSelected={handleSelected} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
