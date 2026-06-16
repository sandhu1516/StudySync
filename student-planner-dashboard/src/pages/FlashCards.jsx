import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/flashcards.css";

function FlashCards() {

const [subject, setSubject] = useState("");
const [cards, setCards] = useState([]);
const [loading, setLoading] = useState(false);
const [flippedIndex, setFlippedIndex] = useState(null);

const token =
  localStorage.getItem("token");

const fetchCompletedTask = async () => {

  try {

    const response =
      await axios.get(
        "http://localhost:5000/api/tasks",
        {
          headers:{
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    const completedTasks =
      response.data.filter(
        task => task.completed
      );

    if(
      completedTasks.length > 0
    ){

      const latestSubject =
        completedTasks[
          completedTasks.length - 1
        ].title;

      setSubject(
        latestSubject
      );

      generateFlashcards(
        latestSubject
      );

    }

  }

  catch(error){

    console.log(error);

  }

};

const generateFlashcards = async(subjectName)=>{

if (!subjectName?.trim()) {
  return alert("Enter a subject");
}

try {

  setLoading(true);

  const response =
    await axios.post(
      "http://localhost:5000/api/flashcards/generate",
     {
  subject: subjectName
}
    );

    console.log(response.data);

 const parsedData =
  JSON.parse(
    response.data.flashcards
  );

setCards(
  parsedData.flashcards
);

}

catch(error){

  console.log(error);

  alert(
    "Failed to generate flashcards"
  );

}

finally{

  setLoading(false);

}


};


const shuffleCards = () => {


setCards(
  [...cards].sort(
    () => Math.random() - 0.5
  )
);

};

const downloadCards = () => {

  const text = cards
    .map((card) => {
      return `Q: ${card.question}\nA: ${card.answer}`;
    })
    .join("\n\n");

  const blob = new Blob(
    [text],
    {
      type: "text/plain"
    }
  );

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;

  a.download = `${subject}-flashcards.txt`;

  document.body.appendChild(a);

  a.click();

  document.body.removeChild(a);

  URL.revokeObjectURL(url);

};

 useEffect(() => {

    fetchCompletedTask();

  }, []);

return (


<div className= "page-container">

  <div className="flashcard-generator">

    <h1>
      🧠 AI Flashcard Generator
    </h1>

    <p>
      Generate smart study flashcards using  AI
    </p>

    <div className="input-row">

      <input
        type="text"
        placeholder="Enter Subject (e.g. DBMS)"
        value={subject}
        onChange={(e)=>
          setSubject(
            e.target.value
          )
        }
      />

     <button
  onClick={() =>
    generateFlashcards(subject)
  }
>
  Generate
</button>

    </div>

  </div>

  {loading &&

    <p>
      Generating Flashcards...
    </p>

  }

  {cards.length > 0 && (

    <>
      <div className="flashcard-stats">

        <div className="stat-box">
          Cards: {cards.length}
        </div>

        <div className="stat-box">
          Subject: {subject}
        </div>

      </div>

      <div
        style={{
          display:"flex",
          gap:"15px",
          marginBottom:"20px"
        }}
      >

        <button
          onClick={shuffleCards}
        >
          🔀 Shuffle
        </button>

        <button
          onClick={downloadCards}
        >
          📥 Download
        </button>

      </div>

    </>

  )}

  <div className="flashcards-grid">

    {
      cards.map((card,index)=>(

        <div
          key={index}
          className={`flash-card ${
            flippedIndex === index
              ? "flipped"
              : ""
          }`}
          onClick={()=>
            setFlippedIndex(
              flippedIndex === index
                ? null
                : index
            )
          }
        >

          <div className="flash-card-inner">

            <div className="flash-card-front">

              <h3>
  {card.question || card.term}
</h3>

              <span>
                Click to reveal answer
              </span>

            </div>

            <div className="flash-card-back">

              <p>
  {card.answer || card.definition}
</p>

            </div>

          </div>

        </div>

      ))
    }

  </div>

</div>

);

}

export default FlashCards;
