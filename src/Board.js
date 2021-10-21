import { useState } from "react";


function calculateWinner(squares){
    const condition = [
        [3, 4, 5],
        [0, 1, 2],
        [2, 5, 8],
        [6, 7, 8],
        [2, 4, 6],
        [1, 4, 7],
        [0, 3, 6],
        [0, 4, 8],
    ]
    for(let i = 0; i < condition.length; i++){
        const [x,y,z] = condition[i]
        if(squares[x] === squares[y] && squares[x] === squares[z] && squares[x]){
            return squares[x]
        }
    }
    return null
}

function calculateNextValue(squares){
    if(squares.filter(Boolean).length % 2 === 0){
        return 'X'
    }else{
        return 'O'
    }
}

function calculateStatus(winner,squares,nextValue){
    if(winner){
        return `Winner:${winner}`
    }
    // return draw if every place in board is filled
    if(squares.every(Boolean)){
        return 'Draw'
    }else{
        return `Next player:${nextValue}`
    }
}

function Board(){
    const [squares,setSquares] = useState(Array(9).fill(null))
    // squares[0] = "X"
    // squares[1] = "O"
    // squares[3] = "X"
    // squares[2] = "O"
    // squares[6] = "X"

    const nextValue = calculateNextValue(squares)
    const winner = calculateWinner(squares)
    const status = calculateStatus(winner,squares,nextValue)

    function showSquare(any){
        return(
            <button className="square" onClick={()=>selectSquare(any)}>
                {squares[any]}
            </button>
        )
    }

    function selectSquare(square){
        if(winner || squares[square]){
            return
        }
        const squaresCopy = [...squares]
        squaresCopy[square] = nextValue
        setSquares(squaresCopy)
    }


    function restart(){
        setSquares(Array(9).fill(null))
    }

    return(
        <>
        <div className="game-status">{status}</div>
        <div>
            <div className="row">
                {showSquare(0)}
                {showSquare(1)}
                {showSquare(2)}
            </div>
            <div className="row">
                {showSquare(3)}
                {showSquare(4)}
                {showSquare(5)}
            </div>
            <div className="row">
                {showSquare(6)}
                {showSquare(7)}
                {showSquare(8)}
            </div>
            <button className="restart" onClick={restart}>
                Restart
            </button>
        </div>
        </>
    )
}
export default Board;