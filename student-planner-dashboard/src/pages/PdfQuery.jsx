import { useState } from "react";
import axios from "axios";
import "../styles/pdfquery.css";

function PdfQuery() {

  const [file, setFile] = useState(null);

  const [query, setQuery] =
    useState("");

  const [answer, setAnswer] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async () => {

    if (!file || !query)
      return alert(
        "Upload PDF and enter query"
      );

    const formData =
      new FormData();

    formData.append(
      "pdf",
      file
    );

    formData.append(
      "query",
      query
    );

    try {

      setLoading(true);

      const res =
        await axios.post(
  "http://localhost:5000/api/pdf/ask",
  formData
);

      setAnswer(
        res.data.answer
      );

    }

    catch (err) {

      console.log(err);

      alert(
        "Failed to get answer"
      );

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <div className="pdf-page">

      <h1>
        📄 PDF Query Assistant
      </h1>

      <div className="pdf-card">

        <input
          type="file"
          accept=".pdf"
          onChange={(e)=>
            setFile(
              e.target.files[0]
            )
          }
        />

        <textarea
          placeholder="Ask your question..."
          value={query}
          onChange={(e)=>
            setQuery(
              e.target.value
            )
          }
        />

        <button
          onClick={handleSubmit}
        >
          Ask AI
        </button>

      </div>

      {loading &&

        <p>
          Analyzing PDF...
        </p>

      }

      {answer && (

        <div className="answer-box">

          <h2>
            AI Answer
          </h2>

          <p>
            {answer}
          </p>

        </div>

      )}

    </div>

  );

}

export default PdfQuery;