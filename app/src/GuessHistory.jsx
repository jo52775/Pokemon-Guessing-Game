import { useState, useEffect } from 'react'
import './GuessHistory.css'

const GuessHistory = (props) => {
    const [combinedFailedGuesses, setCombinedFailedGuesses] = useState([])

    // For updating list of unique failed guesses
    useEffect(() => {
        const combinedArray = props.failedLetters.concat(props.failedNames)
        const combinedSet = new Set(combinedArray) 
        setCombinedFailedGuesses(Array.from(combinedSet)) 
    }, [props.failedLetters, props.failedNames])
    
    return(
        <div className='historyBox'>
            <h3 id='historyTitle'> Incorrect Guesses </h3>
            {combinedFailedGuesses.map((entry, index) => (<GuessEntry key = {index} entry = {entry}/>))}
        </div>
    )

}

const GuessEntry = (props) => {
    const entry = props.entry
    return(
        <p className='guessEntry'> {entry} </p>
    )
}



export default GuessHistory