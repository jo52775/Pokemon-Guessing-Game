import { useState } from "react"
import './LetterInput.css'

const LetterInput = (props) => {
    const setGuessLetter = props.set
    
    // Temp variables
    const [tempValue, setTempValue] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        setGuessLetter(tempValue)
        setTempValue("")
    }
    
    return(
        <div className="letterBox">
            <form onSubmit={handleSubmit}>
                <label id="letterLabel"> Guess a Letter: </label>
                <input type="text" id="box" placeholder = "?" value={tempValue} maxLength="1" onChange={(e) => setTempValue(e.target.value.toUpperCase())}></input>
            </form>
        </div>
    )
}

export default LetterInput