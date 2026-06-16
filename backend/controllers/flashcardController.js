import cohere from "../config/cohere.js";

export const generateFlashcards = async (req,res)=>{

  try{

    console.log("BODY =", req.body);

    const { subject } = req.body;

    const response =
      await cohere.chat({

        model:"command-a-03-2025",

        message:`
Generate 10 study flashcards for ${subject}

Return ONLY JSON
`

      });

    console.log("COHERE RESPONSE =", response);

   let flashcardsText = response.text
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

res.json({
  flashcards: flashcardsText
});

  }

  catch(error){

    console.log("FLASHCARD ERROR:");
    console.log(error);

    res.status(500).json({
      message:"Flashcard Generation Failed"
    });

  }

};