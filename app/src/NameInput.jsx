import { useState, useEffect } from 'react'
import './NameInput.css'

const NameInput = (props) => {
    const setName = props.set
    const [guessModal, setGuessModal] = useState(false)

    const openGuessModal = () => {
        setGuessModal(true)
    }

    const closeGuessModal = () => {
        setGuessModal(false)
    }
    
    return(
        <>
        <div className="guessName">
            <button type="submit" id="guess" onClick={openGuessModal}> GUESS FULL NAME </button>
        </div>
        {guessModal == true && <InputForm set={setName} close={closeGuessModal}/>}
        </>
    )
}

const InputForm = (props) => {
    const setName = props.set
    const closeModal = props.close

    const[tempValue, setTempValue] = useState("")
    
    const handleSubmit = (e) => {
        e.preventDefault()
        setName(tempValue)
        setTempValue("")
        closeModal()
    }

    return(
        <>
        <div className='guessModal'>         
            <form onSubmit={handleSubmit}>
                <label id='guessLabel'> Guess Name: </label>
                <input type='text' id='guessName' placeholder='e.g PIKACHU' value={tempValue} maxLength={30} onChange={(e) => setTempValue(e.target.value.toUpperCase())}></input>
                <input type='submit' id='nameGuessSubmit'></input>
           </form>
           
           </div>  
       </>
   )
}

export default NameInput