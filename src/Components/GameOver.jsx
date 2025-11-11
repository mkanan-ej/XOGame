export default function GameOver({winner, restart}){
    return(
        <div id="game-over">
            <h2>Game over!</h2>
            { winner ? <p>{winner} Won!</p> : <p>Its a draw!</p>}
            <p><button onClick={restart}>Rematch!</button></p>
        </div>
    );

}