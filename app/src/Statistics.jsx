import { useState } from 'react'
import './Statistics.css'
import { BsFire } from "react-icons/bs";

const Statistics = (props) => {
    const closeStats = props.close
    const totalGames = props.totalGames
    const totalWins = props.totalWins
    const winStreak = props.winStreak

    
    return(
        <>
            <div className='statisticsContainer'>
                <ul>
                    <li className='statsList'> Total Games Played:  {totalGames} </li>
                    <li className='statsList'> Total Correct Guesses:  {totalWins} </li>
                    <li className='statsList'> Current Streak:  {winStreak} <BsFire style={{color:'orange'}}/></li>
                </ul>
                <button id='closeStatsButton' onClick={closeStats}> Close </button>
            </div>
        </>   
    )
}


export default Statistics