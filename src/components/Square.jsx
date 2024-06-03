import React from 'react';

//Destructuring of Props
// const props = {
//     onClick: () => "function",
//     value: "X"
// };

const Square = ({ className, value, onClick, playerTurn }) => {
    let hoverClass = null;
    if (value == null && playerTurn != null) {
        hoverClass = `${playerTurn.toLowerCase()}-hover`;
    }
    return(
    <div onClick={onClick} className={`square ${className} ${hoverClass}`}>
        {value}
    </div>
    )
};

export default Square;  