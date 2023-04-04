import "./SingleCard.css"
export default function SingleCard({card, handleChoice, flipped, disabledUI, audioRef}){

    const handleClick = () => {
        if (!disabledUI){
            handleChoice(card)
            audioRef.current.play();
        }
    }

    return (
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
                <img className="front" src={card.src} alt="card front"/>
                <img
                    className="back"
                    src="/img/cover.png"
                    onClick={handleClick}
                    alt="card back"/>
                <audio ref={audioRef}>
                    <source src="/sounds/drum.mp3" type="audio/mpeg" />
                    <source src="/sounds/drum.wav" type="audio/wav" />
                </audio>

            </div>
        </div>
    );
};

