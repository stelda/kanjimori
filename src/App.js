import {useEffect, useState, useRef} from "react";
import SingleCard from "./components/SingleCard";
import './App.css';


function App() {

//  =================================== data ===================================

    const Cards = [
        {   "src": "/img/arbre.png", matched: false },
        {   "src": "/img/bas.png", matched: false },
        {   "src": "/img/haut.png", matched: false },
        {   "src": "/img/jour.png", matched: false },
        {   "src": "/img/lune.png", matched: false },
        {   "src": "/img/terre.png", matched: false },
        {   "src": "/img/feu.png", matched: false },
        {   "src": "/img/eau.png", matched: false },
        {   "src": "/img/nord.png", matched: false },
        {   "src": "/img/est.png", matched: false },
        {   "src": "/img/sud.png", matched: false },
        {   "src": "/img/ouest.png", matched: false },
    ]
    
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [disabled, setDisabledUI] = useState(false)
    
    const audioRef = useRef(null);

    
// =================================== behaviors ===================================

    // Shuffles cards
    const shuffleCards = () => {
        const shuffledCards = [...Cards, ...Cards]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({...card, id: Math.random() }))

        setChoiceOne(null)
        setChoiceTwo(null)
        setCards(shuffledCards)
        setTurns(0)
    }

    // Handles card selection
    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }

    // Reset choices and increments turns
    const resetTurn = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(prevTurns => prevTurns +1)
        setDisabledUI(false)
    }
    
    // Compares two selected cards
    useEffect(()=>{
        if (choiceOne && choiceTwo) {
            setDisabledUI(true)
            if (choiceOne.src === choiceTwo.src) {
                setCards(prevCards => {
                    return prevCards.map(card => {
                        if (card.src === choiceOne.src) {
                            return {...card, matched:true}
                        }
                        else {
                            return card
                        }
                    })
                })
                resetTurn()
            }
            else {
                setTimeout(() => resetTurn(), 1000)
            }
        }
    }, [choiceOne, choiceTwo])

    // Starts a game automatically
    useEffect(() => {
        shuffleCards()
    }, [])


// =================================== render ===================================
return (
    <div className="App">
        <h1>kanjimori</h1>
        <button onClick={shuffleCards}>New Game</button>
        <div className="card-grid">
            {cards.map(card => (
                <SingleCard
                    key ={card.id}
                    card={card}
                    handleChoice={handleChoice}
                    flipped={card === choiceOne || card === choiceTwo || card.matched}
                    disabled={disabled}
                    audioRef={audioRef}                    
                />
            ))}
        </div>
        <div>
            <p>Turns: {turns}</p>
        </div>
    </div>
);
}

export default App;
