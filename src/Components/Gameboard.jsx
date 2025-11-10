
// with later v
// const initialGB=[
//     [null, null, null],
//     [null, null, null],
//     [null, null, null]
// ];
export default function GameBoard({ onSelected, board }){
    // const [ gameBoard, setGameBoard ] = useState(initialGB);
    // function handleSquare(rIndex, cIndex){
    //     setGameBoard((prevGB) => {
    //         const updatedGB = [...prevGB.map(innerArr => [...innerArr])];
    //         updatedGB[rIndex][cIndex] = activePlayerSymbol;
    //         return updatedGB;
    //     });

    //     onSelected();
    // }

    //later v

    // let gameBoard=initialGB;
    // for(const turn of turns){
    //     const { square, player } = turn
    //     const { row, col } =square;
    //     gameBoard[row][col] = player;
    // }
    return(
        <ol id="game-board">
            {board.map((row, rIndex) => (<li key={rIndex}>
                <ol>
                    {row.map((playerSymbol, cIndex) => (<li key={cIndex}><button onClick={() => onSelected(rIndex,cIndex)} disabled={playerSymbol !== null}>{playerSymbol}</button></li> ))}
                </ol>
            </li>))}
        </ol>
    );
}