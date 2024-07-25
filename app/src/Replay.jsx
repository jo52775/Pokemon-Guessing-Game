import { useState, useEffect } from 'react'
import './Replay.css'

const Replay = (props) => {
    const winner = props.winner
    const reset = props.setGameStatus

    const resetGame = (e) => {
        e.preventDefault()
        reset(true)
    }

    return(
        <>
        <div className='gameEndBox'>
            {winner == true && <WinnerMessage/>}
            {winner == false && <LossMessage/>}

            <button id='playAgainButton' onClick={resetGame}> PLAY AGAIN </button>

            <img id='meowthImage' src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/52.png"}/>
        </div>
        </>
    )
}

const WinnerMessage = () => {
    return(
        <h2 id='winnerMessage'> Nice, you got it! Click the button below to play again. </h2>
    )
}

const LossMessage = () => {
    return(
        <h2 id='lossMessage'> Better luck next time. Click the button below to play again. </h2>
    )
}

export default Replay