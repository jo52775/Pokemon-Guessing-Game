import { useState } from 'react'
import './NavBar.css'
import Rules from './Rules'
import IconSelect from './IconSelect'
import Statistics from './Statistics'

const NavigationBar = (props) => {
    const [rulesModal, setRulesModal] = useState(false)
    const[iconModal, setIconModal] = useState(false)
    const[statisticsModal, setStatisticsModal] = useState(false)
    const[userIcon, setUserIcon] = useState("Icon1")

    const openRulesModal = () => {
        setRulesModal(true)
        setIconModal(false)
        setStatisticsModal(false)
    }

    const closeRulesModal = () => {
        setRulesModal(false)
    }

    const openIconModal = () => {
        setIconModal(true)
        setRulesModal(false)
        setStatisticsModal(false)
    }

    const closeIconModal = () => {
        setIconModal(false)
    }

    const openStatisticsModal = () => {
        setStatisticsModal(true)
        setRulesModal(false)
        setIconModal(false)
    }

    const closeStatisticsModal = () => {
        setStatisticsModal(false)
    }

    return(
        <>
        <nav className='nav'>
           <h1 id='gameTitle'> Pokémon Guessing Game </h1> 
           <ul id='navList'>
            <li className='links'> <a onClick={openRulesModal}> Rules </a> </li>
            <li className='links'> <a onClick={openIconModal}> Select Icon </a> </li>
            <li className='links'> <a onClick={openStatisticsModal}> User Statistics </a> </li>
            </ul>
        {userIcon == "Icon1" && <img className='icon' src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/393.png"}/>}
        {userIcon == "Icon2" && <img className='icon' src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"}/>}
        {userIcon == "Icon3" && <img className='icon' src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/722.png"}/>}

        </nav>
        {rulesModal == true && <Rules open={openRulesModal} close={closeRulesModal}/>}
        {iconModal == true && <IconSelect open={openIconModal} close={closeIconModal} setIcon = {setUserIcon}/>}
        {statisticsModal == true && <Statistics totalGames = {props.totalGames} totalWins = {props.totalWins} winStreak = {props.streak} close = {closeStatisticsModal}/>}
        </>
    )
}

export default NavigationBar
