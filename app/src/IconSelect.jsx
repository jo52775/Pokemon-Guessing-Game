import { useState, useEffect } from 'react'
import './IconSelect.css'

const IconSelect = (props) => {
    const openIconSelect = props.open
    const closeIconSelect = props.close
    const setIcon = props.setIcon
    
    return(
        <>
        <div className='iconSelectContainer'>
                <ul>
                    <li className='iconList' onClick={() => setIcon("Icon3")}> <img className='iconImage' src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/722.png"}/></li>
                    <li className='iconList' onClick={() => setIcon("Icon2")}> <img className='iconImage' src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"}/></li>
                    <li className='iconList' onClick={() => setIcon("Icon1")}> <img className='iconImage' src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/393.png"}/></li>
                    <li className='iconList'> <button id='closeIconSelectButton' onClick={closeIconSelect}> x </button> </li>
                </ul>
        </div>
        </>
    )
}

export default IconSelect