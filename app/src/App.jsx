import { useState, useEffect } from 'react'
import NavigationBar from './NavBar'
import NameDisplay from './NameDisplay'
import LetterInput from './LetterInput'
import NameInput from './NameInput'
import Counter from './Counter'
import Type from './PokemonType'
import GuessHistory from './GuessHistory'
import Replay from './Replay'

const App = () => {
    const [pokemonName, setPokemonName] = useState("")
    const [pokemonDisplayName, setPokemonDisplayName] = useState("")
    const [pokemonImageLink, setPokemonImageLink] = useState("")
    const [pokemonType, setPokemonType] = useState("")
    
    const [correctLetters, setCorrectLetters] = useState([])
    const [failedLetters, setFailedLetters] = useState([])
    const [failedNames, setFailedNames] = useState([])
    
    const [guessLetter, setGuessLetter] = useState("")
    const [guessName, setGuessName] = useState("")

    const[count, setCount] = useState(6)
    const[winner, setWinner] = useState(false)
    const[gameEnd, setGameEnd] = useState(false)
    const[gameReset, setGameReset] = useState(false)

    // State variables related to session statistics
    const [numberOfGames, setNumberOfGames] = useState(0)
    const [numberOfWins, setNumberOfWins] = useState(0)
    const [winStreak, setWinStreak] = useState(0)

    useEffect(() => {
        fetchPokemonName()
    }, [gameReset])

    useEffect(() => {
        displayName()
    }, [pokemonName, correctLetters])

    useEffect(() => {
        if(guessLetter != ""){
            checkLetterInput()
        }
    }, [guessLetter])

    useEffect(() => {
        if(guessName != ""){
            checkNameInput()
        }
    }, [guessName])

    // Checking if the game has ended 
    useEffect(() => {
        if(winner == true || count == 0){
            setPokemonDisplayName(pokemonName)
            setGameEnd(true)
        }
    }, [winner, count, pokemonDisplayName])

    // Checking to see if user won the game by guessing all correct letters
    useEffect(() => {
        if(pokemonName.length > 0){
            const uniqueLettersInName = new Set(pokemonName)
            const correctLetterGuesses = new Set(correctLetters)
            if(correctLetterGuesses.size == uniqueLettersInName.size){    
                setWinner(true)
            }
    }
    }, [pokemonName, correctLetters])

    // Reset variables and functions for the next game
    useEffect(() => {
        if(gameReset == true){
            setCount(6)
            setGameEnd(false)
            setWinner(false)
            setCorrectLetters([]) 
            setFailedLetters([])
            setFailedNames([])
            setGuessLetter("")
            setGuessName("")
            setGameReset(false)
        }
        }, [gameReset])
    

    // Updates session statistics appropriately
    useEffect(() => {
      if(gameEnd == true){
        setNumberOfGames(prevCount => prevCount + 1)

        if(winner == true){
            setNumberOfWins(prevCount => prevCount + 1)
            setWinStreak(prevCount => prevCount + 1)
        }

        else{
            setWinStreak(0)
        }
      }
    }, [gameEnd])
    
    // Sending GET request to backend to acquire random Pokemon name string (along with image and type)
    const fetchPokemonName = async() => {
        const url = "http://127.0.0.1:5000/pokemon"
        const response = await fetch(url)

        if(response.status == 200){
            const data = await response.json()
            const pokemon = data.pokemon.name
            const image = data.pokemon.link
            const pokemon_type = data.pokemon.type

            setPokemonName(pokemon.toUpperCase())
            setPokemonImageLink(image)
            setPokemonType(pokemon_type)
        }
    }

    // Sending POST request to backend to handle name box display
    const displayName = async () => {
        const name = pokemonName
        const letters = correctLetters
        
        const displayData = {
            name,
            letters
        }

        const url = "http://127.0.0.1:5000/nameDisplay"
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(displayData)
        }

        const response = await fetch(url, options)

        if(response.status == 200 || response.status == 201){
            const data = await response.json()
            const display = data.display
            console.log(display)
            setPokemonDisplayName(display)            
        }
    }

    // Sending POST request to backend to determine validity of guessed single letter.
    const checkLetterInput = async() => {
        const name = pokemonName
        const letter = guessLetter

        const letterData = {
            name, 
            letter
        }

        const url = "http://127.0.0.1:5000/letterInput"
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(letterData)
        }
        
        const response = await fetch(url, options)
        if(response.status == 200 || response.status == 201){
            const data = await response.json()
            const result = data.result

            if(result == "correct"){
                setCorrectLetters(prev => [...prev, letter])
            }

            else{
                setCount(prevCount => prevCount - 1)
                setFailedLetters(prev => [...prev, letter])
            }
        }

    }

    // Sending POST request to backend to check if user guessed the entire name correctly
    const checkNameInput = async() => {
        const name = pokemonName
        const guess = guessName

        const nameData  = {
            name,
            guess
        }

        const url = "http://127.0.0.1:5000/nameInput"
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(nameData)
        }
        const response = await fetch(url, options)
        if(response.status == 200 || response.status == 201){
            const data = await response.json()
            const result = data.result

            if(result == "correct guess"){
                setWinner(true)
            }

            else{
                setCount(prevCount => prevCount - 1)
                setFailedNames(prev => [...prev, guess])
            }

        }
    }
        

    return(
        <>
        <NavigationBar totalGames = {numberOfGames} totalWins = {numberOfWins} streak = {winStreak}/>
        <NameDisplay name = {pokemonDisplayName} image = {pokemonImageLink} gameStatus = {gameEnd}/>

        {gameEnd == false && (
        <>
        <LetterInput set = {setGuessLetter}/>
        <NameInput set = {setGuessName}/>
        </>
        )}

        <Counter count = {count}/>
        <Type type = {pokemonType}/>
        <GuessHistory failedLetters = {failedLetters} failedNames = {failedNames}/>
        
        {gameEnd == true && <Replay winner = {winner} setGameStatus = {setGameReset}/>}
        </>            
    )
}

export default App