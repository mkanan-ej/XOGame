import { useState } from "react";
const initialGB=[
    [null, null, null],
    [null, null, null],
    [null, null, null]
];
export default function GameBoard({ onSelected, activePlayerSymbol }){
    const [ gameBoard, setGameBoard ] = useState(initialGB);
    function handleSquare(rIndex, cIndex){
        setGameBoard((prevGB) => {
            const updatedGB = [...prevGB.map(innerArr => [...innerArr])];
            updatedGB[rIndex][cIndex] = activePlayerSymbol;
            return updatedGB;
        });

        onSelected();
    }
    return(
        <ol id="game-board">
            {gameBoard.map((row, rIndex) => (<li key={rIndex}>
                <ol>
                    {row.map((playerSymbol, cIndex) => (<li key={cIndex}><button onClick={() => handleSquare(rIndex,cIndex)}>{playerSymbol}</button></li> ))}
                </ol>
            </li>))}
        </ol>
    );
}