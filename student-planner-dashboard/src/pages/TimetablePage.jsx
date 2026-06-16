import {
  useState,
  useEffect
}
from "react";

import axios from "axios";

import "../styles/timetable.css";

function TimetablePage() {

  const [subject,setSubject] =
    useState("");

  const [day,setDay] =
    useState("");

  const [time,setTime] =
    useState("");

  const [schedules,setSchedules] =
    useState([]);
    const [editId, setEditId] = useState(null);

  const token =
    localStorage.getItem("token");

  useEffect(() => {

    fetchSchedules();

  }, []);

  const fetchSchedules =
  async () => {

    try {

      const response =
        await axios.get(

          "http://localhost:5000/api/timetable",

          {
            headers:{
              Authorization:
              `Bearer ${token}`
            }
          }

        );

      setSchedules(
        response.data
      );

    }

    catch(error){

      console.log(error);

    }

  };

const addSchedule = async () => {

  if (!subject || !day || !time) {
    alert("Please fill all fields");
    return;
  }

  try {

    if(editId){

      await axios.put(

        `http://localhost:5000/api/timetable/${editId}`,

        {
          subject,
          day,
          time
        },

        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }

      );

      setEditId(null);

    }

    else{

      await axios.post(

        "http://localhost:5000/api/timetable",

        {
          subject,
          day,
          time
        },

        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }

      );

    }

    setSubject("");
    setDay("");
    setTime("");

    fetchSchedules();

  }

  catch(error){

    console.log(error);

  }

};

  const toggleComplete =
  async (id,completed) => {

    await axios.put(

      `http://localhost:5000/api/timetable/${id}`,

      {
        completed:
        !completed
      },

      {
        headers:{
          Authorization:
          `Bearer ${token}`
        }
      }

    );

    fetchSchedules();

  };

  const editSchedule = (item) => {

  setSubject(item.subject);

  setDay(item.day);

  setTime(item.time);

  setEditId(item._id);

};

  const deleteSchedule =
  async (id) => {

    await axios.delete(

      `http://localhost:5000/api/timetable/${id}`,

      {
        headers:{
          Authorization:
          `Bearer ${token}`
        }
      }

    );

    fetchSchedules();

  };

  return (

    <div className="page-container">

      <h1>
        📅 Timetable
      </h1>

      <div className="table-inputs">

        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e)=>
            setSubject(
              e.target.value
            )
          }
        />

        <input
          type="text"
          placeholder="Day"
          value={day}
          onChange={(e)=>
            setDay(
              e.target.value
            )
          }
        />

        <input
          type="time"
          value={time}
          onChange={(e)=>
            setTime(
              e.target.value
            )
          }
        />

       <button onClick={addSchedule}>
  {editId ? "Update" : "Add"}
</button>

      </div>

      <div className="table-list">

        {schedules.map((item)=>(

          <div
            key={item._id}
            className="table-row"
          >

            <div className="table-left">

              <input
                type="checkbox"
                checked={
                  item.completed
                }
                onChange={()=>
                  toggleComplete(
                    item._id,
                    item.completed
                  )
                }
              />

              <div>

                <h3>
                  {item.subject}
                </h3>

                <p>
                  {item.day}
                  {" | "}
                  {item.time}
                </p>

              </div>

            </div>

            <div
              className="table-actions"
            >

              <button

                className={
                  item.completed
                  ? "completed-btn"
                  : "pending-btn"
                }

                onClick={()=>
                  toggleComplete(
                    item._id,
                    item.completed
                  )
                }

              >

                {
                  item.completed
                  ? "Completed"
                  : "Pending"
                }

              </button>

              <div className="table-actions">

  <span
    className="edit-icon"
    onClick={() =>
      editSchedule(item)
    }
  >
    ✏️
  </span>

  <span
    className="delete-icon"
    onClick={() =>
      deleteSchedule(item._id)
    }
  >
    🗑
  </span>

</div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default TimetablePage;