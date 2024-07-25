import { useState, useEffect } from 'react'
import './PokemonType.css'

const Type = (props) => {
    const pokemon_type = props.type

    return(
        <>
        <div className='typeContainer'> 
            <label id='typeLabel'> Type: </label>
            <h3 id='typeHeading'> {pokemon_type.toUpperCase()} </h3>
        </div>
        </>
    )
}



export default Type