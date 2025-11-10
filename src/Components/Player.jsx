import { useState } from 'react'

export default function PLayer({initialName, symbol}){
    const [ playerName, setPlayerName ] = useState(initialName)
    const [ isEditing, setIsEditing ] = useState(false);
    playerName
    function edit(){
        setIsEditing(isEditing => !isEditing);
    };
    function handleChange(event){
        setPlayerName(event.target.value)

    };
    let nameHolder= isEditing ? <input type="text" required value={playerName} onChange={handleChange}/> : <span className="player-name">{playerName}</span>;
    return(
        <li>
            <span className="player">
                {nameHolder}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={edit}>{!isEditing ? "Edit" : "Save"}</button>
          </li>


    );

}