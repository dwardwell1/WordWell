import { useState } from "react"

const useWordle = (solution) => {
    const [turn, setTurn] = useState(0);
    const [currentGuess, setCurrentGuess] = useState('');
    const [guesses, setGuesses] = useState([...Array(6)]); //each guess is an array
    const [history, setHistory] = useState([]); //each guess is an string
    const [isCorrect, setIsCorrect] = useState(false);
    const [usedKeys, setUsedKeys] = useState({}); // {a: "green", b: "yellow", c: "grey"}


    //format a guess into an array of letter objects
    //e.g. [{key: 'a', color: 'green'}, {key: 'b', color: 'yellow'}, {key: 'c', color: 'grey'}]
    const formatGuess = () => {
        let solutionArray = [...solution]
        let formattedGuess = [...currentGuess].map((l) => {
            return {key:l, color: 'grey'}
        })

        //find any green letters in the solution
        formattedGuess.forEach((l, i) => {
            if(solutionArray[i] === l.key){
                formattedGuess[i].color = 'green'
                solutionArray[i] = null
            }
        })

        //find any yellow letters in the solution
        formattedGuess.forEach((l,i) => {
            if(solutionArray.includes(l.key) && l.color !== 'green'){
                formattedGuess[i].color = 'yellow'
                solutionArray[solutionArray.indexOf(l.key)] = null
        }
    })
        return formattedGuess
}
    //add a new guess t othe guesses state
    //update the isCorrect state if the sugess is correct
    //add one to  the turns state
    const addNewGuess = (formattedGuess) => {
        if(currentGuess === solution){
            setIsCorrect(true)
        }
        setGuesses((prevGuesses) => {
            let newGuesses = [...prevGuesses]
            newGuesses[turn] = formattedGuess
            return newGuesses
        })
        setHistory((prevHistory) => {
            return [...prevHistory, currentGuess]
        })
        setTurn (prevTurn => prevTurn + 1)

        setUsedKeys((prevUsedKeys) => {
            let newKeys = {...prevUsedKeys}
            formattedGuess.forEach((l) => {
                const currentColor = newKeys[l.key]

                if(l.color === 'green'){
                    newKeys[l.key] = 'green'
                    return
                }
                if(l.color === 'yellow' && currentColor !== 'green'){
                    newKeys[l.key] = 'yellow'
                    return
                }
                if(l.color === 'grey' && currentColor !== 'green' && currentColor !== 'yellow'){
                    newKeys[l.key] = 'grey'
                    return
                }
            })
            return newKeys
        })

        setCurrentGuess('')
    }

    //update the keypad letters state
    //if the user presses enter, add the new guess
    //if the user presses delete, delete the last guess
    const handleKeyup = ({key}) => {
        
        if(key === 'Enter') {
            //only add guess if turn is less than 5
            if(turn > 5){
                console.log("You've reached the maximum number of turns");
                return
            }
            //do not allow duplicate words
            if(history.includes(currentGuess)) {
                console.log("You've already used that word");
                return
            }
            //check if 5 letters
            if(currentGuess.length !== 5){
                console.log("Your guess must be 5 letters long");
                return
            }
           const formatted = formatGuess();
           addNewGuess(formatted)
        }

        if(key === 'Backspace') {
            setCurrentGuess((prev) => {
                return prev.slice(0, -1)
            })
            return
        }

        if(/^[A-Za-z]$/.test(key)){
            if (currentGuess.length < 5){
                setCurrentGuess((prev) => {
                    return prev + key;
                });
            }
        }

    }

    return {turn, currentGuess, guesses, history, isCorrect, usedKeys, handleKeyup}

}

export default useWordle;