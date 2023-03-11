import {useEffect, useState} from "react";
import './App.css';
import SingleCard from "./components/SingleCard";

const kanjiCards = [
   // {   "src": "/img/arbre.png" },
   // {   "src": "/img/argent.png" },
   // {   "src": "/img/bas.png" },
    {   "src": "/img/eau.png" },
    {   "src": "/img/est.png" },
    {   "src": "/img/feu.png" },
   // {   "src": "/img/haut.png" }
   // {   "src": "/img/jour.png" },
   // {   "src": "/img/lune.png" },
    {   "src": "/img/nord.png" },
    {   "src": "/img/ouest.png" },
    {   "src": "/img/sud.png" },
   // {   "src": "/img/terre.png" }
]

function App() {

    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)


    /* La fonction shuffleCards est définie.
    Cette fonction ne prend pas d'argument et retourne un tableau de cartes mélangées.*/
    const shuffleCards = () => {
        const shuffledCards = [...kanjiCards, ...kanjiCards]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({...card, id: Math.random() }))

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
            if (choiceOne.src === choiceTwo.src) {
                console.log("Les cartes correspondent")
                resetTurn()
            }
            else {
                console.log("les cartes ne correspondent pas")
                resetTurn()
            }
        }
    }, [choiceOne, choiceTwo])


    // initialise les choix et incrémente le nombre de tours
    const resetTurn = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(prevTurns => prevTurns +1)
    }

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
                />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
