import {useState} from "react";
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

    /*La fonction shuffleCards est définie.
    Cette fonction ne prend pas d'argument et retourne un tableau de cartes mélangées.*/
    const shuffleCards = () => {
        const shuffledCards = [...kanjiCards, ...kanjiCards]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({...card, id: Math.random() }))

        setCards(shuffledCards)
        setTurns(0)
    }

    console.log(cards, turns)

  return (
    <div className="App">
      <div className="App">
        <h1>Kanji Match</h1>
        <button onClick={shuffleCards}>New Game</button>
        <div className="card-grid">
            {cards.map(card => (
                <SingleCard key ={card.id} card={card}/>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
