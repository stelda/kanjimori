import {useEffect, useState} from "react";
import './App.css';
import SingleCard from "./components/SingleCard";

const kanjiCards = [
   // {   "src": "/img/arbre.png", matched: false },
   // {   "src": "/img/argent.png", matched: false },
   // {   "src": "/img/bas.png", matched: false },
    {   "src": "/img/eau.png", matched: false },
    {   "src": "/img/est.png", matched: false },
    {   "src": "/img/feu.png", matched: false },
   // {   "src": "/img/haut.png", matched: false }
   // {   "src": "/img/jour.png", matched: false },
   // {   "src": "/img/lune.png", matched: false },
    {   "src": "/img/nord.png", matched: false },
    {   "src": "/img/ouest.png", matched: false },
    {   "src": "/img/sud.png", matched: false },
   // {   "src": "/img/terre.png", matched: false }
]

function App() {

    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [disabled, setDisabled] = useState(false)

    /* La fonction shuffleCards est définie.
    Cette fonction ne prend pas d'argument et retourne un tableau de cartes mélangées.*/
    const shuffleCards = () => {
        const shuffledCards = [...kanjiCards, ...kanjiCards]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({...card, id: Math.random() }))

        setChoiceOne(null)
        setChoiceTwo(null)
        setCards(shuffledCards)
        setTurns(0)
    }

    /* La fonction handleChoice prend une carte en paramètre
    et utilise une expression conditionnelle ternaire pour déterminer si choiceOne a une valeur.*/

    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }

    // compare deux cartes selectionnées
    useEffect(()=>{
        if (choiceOne && choiceTwo) {
            setDisabled(true)
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

    // initialise les choix et incrémente le nombre de tours
    const resetTurn = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(prevTurns => prevTurns +1)
        setDisabled(false)
    }

    // commence automatiquement un jeu
    useEffect(() => {
        shuffleCards()
    }, [])


    // render
  return (
    <div className="App">
      <div className="App">
        <h1>Kanji Match</h1>
        <button onClick={shuffleCards}>New Game</button>
        <div className="card-grid">
            {cards.map(card => (
                <SingleCard
                    key ={card.id}
                    card={card}
                    handleChoice={handleChoice}
                    flipped={card === choiceOne || card === choiceTwo || card.matched}
                    disabled={disabled}
                />
            ))}
        </div>
        <p>Turns: {turns}</p>
      </div>
    </div>
  );
}

export default App;
