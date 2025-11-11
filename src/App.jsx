import { useState } from "react";
import Player from "./Components/Player";
import GameBoard from "./Components/Gameboard";
import Log from "./Components/Log";
import GameOver from "./Components/GameOver";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const PLAYERS = {
  X: "Player 1",
  O: "Player 2"
}

function deriveActivePlayer(gameTurns) {
  let currPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currPlayer = "O";
  }
  return currPlayer;
};

function deriveGameBoard(gameTurns){
  let gameBoard = [...INITIAL_GAME_BOARD.map(arr => [...arr])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
};

function deriveWinner(gameBoard, players){
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
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
};

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  let activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players)

  
  function handlePlayerNameChange(symbol, newName){
    setPlayers(prevPlayers => {
      return {...prevPlayers,[symbol]:newName};
    })
  }
  const draw = gameTurns.length === 9 && !winner;
  function handleRestart(){
    setGameTurns([]);
  }

  function handleSelected(rIndex, cIndex) {
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
            initialName={PLAYERS.X}
            symbol="X"
            onChangeName={handlePlayerNameChange}
          />
          <Player
            isActive={activePlayer === "O"}
            initialName={PLAYERS.O}
            symbol="O"
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || draw) && <GameOver winner={winner} restart={handleRestart} />}
        <GameBoard onSelected={handleSelected} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
