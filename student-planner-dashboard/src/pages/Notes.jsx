import { useState, useEffect } from "react";
import "../styles/notes.css";
import axios from "axios";
const token = localStorage.getItem("token");

function Notes() {

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  const [search, setSearch] = useState("");

  const [notes, setNotes] = useState([]);

  const [editId, setEditId] = useState(null);

  /* LOAD NOTES */

  useEffect(() => {

  fetchNotes();

}, []);

const fetchNotes = async () => {

  try {

    const response =
      await axios.get(

        "http://localhost:5000/api/notes",

        {
          headers:{
            Authorization:
            `Bearer ${token}`
          }
        }

      );

    setNotes(response.data);

  }

  catch(error){

    console.log(error);

  }

};


  /* ADD OR UPDATE NOTE */

  const addNote = async () => {

  if (
    !title.trim() ||
    !subject.trim() ||
    !content.trim()
  ) {
    alert("Please fill all fields");
    return;
  }

  try {

    // UPDATE

    if(editId){

      await axios.put(

        `http://localhost:5000/api/notes/${editId}`,

        {
          title,
          subject,
          content
        },

        {
          headers:{
            Authorization:
            `Bearer ${token}`
          }
        }

      );

      alert(
        "Note Updated Successfully"
      );

      setEditId(null);

    }

    // ADD

    else{

      await axios.post(

        "http://localhost:5000/api/notes",

        {
          title,
          subject,
          content
        },

        {
          headers:{
            Authorization:
            `Bearer ${token}`
          }
        }

      );

      alert(
        "Note Added Successfully"
      );

    }

    setTitle("");
    setSubject("");
    setContent("");

    fetchNotes();

  }

  catch(error){

    console.log(error);

  }

};

  /* DELETE NOTE */

  const deleteNote = async(id) => {

  try{

    await axios.delete(

      `http://localhost:5000/api/notes/${id}`,

      {
        headers:{
          Authorization:
          `Bearer ${token}`
        }
      }

    );

    fetchNotes();

  }

  catch(error){

    console.log(error);

  }

};

  /* EDIT NOTE */

  const editNote = (note) => {

    setTitle(note.title);

    setSubject(note.subject);

    setContent(note.content);

    setEditId(note._id);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  /* SEARCH */

  const filteredNotes =

    notes.filter(note =>

      note.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )

      ||

      note.subject
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )

      ||

      note.content
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (

    <div className="notes-page">

      {/* HEADER */}

      <div className="notes-header">

        <h1>
          📝 Study Notes
        </h1>

        <p>
          Organize all your study notes
          subject-wise
        </p>

      </div>

      {/* CREATE NOTE */}

      <div className="note-form">

        <input
          type="text"
          placeholder="Note Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Subject Name"
          value={subject}
          onChange={(e) =>
            setSubject(e.target.value)
          }
        />

        <textarea
          placeholder="Write your notes here..."
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
        />

        <button
          onClick={addNote}
        >
          {editId
            ? "Update Note"
            : "Add Note"}
        </button>

      </div>

      {/* SEARCH */}

      <input
        className="search-box"
        type="text"
        placeholder="Search Notes..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      {/* NOTES COUNT */}

      <div className="notes-count">

        Total Notes:
        {" "}
        {filteredNotes.length}

      </div>

      {/* NOTES GRID */}

      <div className="notes-grid">

        {

          filteredNotes.length === 0

            ?

            (

              <div
                className="empty-notes"
              >

                No Notes Found 📭

              </div>

            )

            :

            (

              filteredNotes.map(note => (

                <div
                  key={note._id}
                  className="note-card"
                >

                  <div>

                    <h2>
                      {note.title}
                    </h2>

                    <div
                      className="subject-badge"
                    >
                      {note.subject}
                    </div>

                    <p
                      className="note-content"
                    >
                      {note.content}
                    </p>

                  </div>

                  <div
                    className="note-footer"
                  >

                    <small>
                      {
                      new Date(
                        note.createdAt
                      ).toLocaleString()
                    }
                    </small>

                    <div
                      className="action-buttons"
                    >

                      <button
                        className="edit-btn"
                        onClick={() =>
                          editNote(note)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() =>
                         deleteNote(
                         note._id
                          )
                        }
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </div>

              ))

            )

        }

      </div>

    </div>

  );

}

export default Notes;