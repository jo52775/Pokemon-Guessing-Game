import { useState } from 'react'
import './Rules.css'

const Rules = (props) => {
    const openRules = props.open
    const closeRules = props.close
    
    return(
        <>
            <div className='rulesContainer'>
                <h3 id='rulesHeading'> Welcome to The Pokémon Guessing Game! </h3>
                <ul>
                    <li className='rulesParagraph'> You will be given an empty word - this is the name of the Pokémon you have to guess!</li>
                    <li className='rulesParagraph'> The Pokémon's silhouette and its type(s) are provided as hints. </li>
                    <li className='rulesParagraph'> You have <span id='turns'> six </span> turns to guess the Pokémon. Each wrong guess will cost you a turn!</li>
                    <li className='rulesParagraph'> On each turn, you may either guess a letter in the input box or guess the entire name of the Pokémon by clicking the 'GUESS FULL NAME' button and entering your guess.</li>
                    <li className='rulesParagraph'> The game will end when you guess the name correctly, or when all six turns are completed. HAVE FUN! </li>
                </ul>
                <button id='closeRulesButton' onClick={closeRules}> Close </button>
            </div>
        </>   
    )
}


export default Rules