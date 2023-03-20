import {useEffect, useState, useRef} from "react";
import RAPID_API_KEY from "./.env";
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
    const [fetchedCharacter, setFetchedCharacter] = useState("")

    // API fetch
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': RAPID_API_KEY,
            'X-RapidAPI-Host': 'kanjialive-api.p.rapidapi.com'
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://kanjialive-api.p.rapidapi.com/api/public/search/advanced/?on=%E3%82%B7%E3%83%B3', options);
            const data = await response.json();
            setFetchedCharacter(data[0].kanji.character);
        };
        fetchData();
    }, []);


// =================================== behaviors ===================================

    /* définit la fonction shuffledCards qui retourne un tableau de cartes mélangées */
    const shuffleCards = () => {
        const shuffledCards = [...Cards, ...Cards]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({...card, id: Math.random() }))

        setChoiceOne(null)
        setChoiceTwo(null)
        setCards(shuffledCards)
        setTurns(0)
    }

    /* définit la fonction handleChoice */
    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
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

    // Reset choices and increments turns
    const resetTurn = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(prevTurns => prevTurns +1)
        setDisabledUI(false)
    }

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
                    character={fetchedCharacter}

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
