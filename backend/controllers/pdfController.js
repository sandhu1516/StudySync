import { PdfReader } from "pdfreader";
import cohere from "../config/cohere.js";

export const askPdfQuestion = async (req, res) => {

try {

const pdfBuffer = req.file.buffer;

let pdfText = "";

await new Promise((resolve, reject) => {

  new PdfReader().parseBuffer(

    pdfBuffer,

    (err, item) => {

      if (err) {

        reject(err);

      }

      else if (!item) {

        resolve();

      }

      else if (item.text) {

        pdfText += item.text + " ";

      }

    }

  );

});

const question = req.body.query;

const response =
  await cohere.chat({

    model: "command-r-08-2024",

    message: `

PDF Content:

${pdfText}

Question:

${question}

Answer according to PDF only.

`

  });

res.json({

  answer:
    response.text

});


}

catch (error) {


console.log(error);

res.status(500).json({

  message: "AI Error"

});


}

};
