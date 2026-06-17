import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/todo.css";

function TodoPage() {

  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const token =
    localStorage.getItem("token");

  useEffect(() => {

    fetchTasks();

  }, []);

  const fetchTasks = async () => {

    try {

      const response =
        await axios.get(

          "http://studysync-q7ex.onrender.com/api/tasks",

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }

        );

      setTasks(response.data);

    }

    catch (error) {

      console.log(error);

    }

  };

  const addTask = async () => {

    if (!task.trim()) return;

    try {

      await axios.post(

        "http://studysync-q7ex.onrender.com/api/tasks",

        {
          title: task
        },

        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }

      );

      setTask("");

      fetchTasks();

    }

    catch (error) {

      console.log(error);

    }

  };

  const toggleTask = async (
    id,
    completed
  ) => {

    try {

      await axios.put(

        `http://studysync-q7ex.onrender.com/api/tasks/${id}`,

        {
          completed:
            !completed
        },

        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }

      );

      fetchTasks();

    }

    catch (error) {

      console.log(error);

    }

  };

  const deleteTask = async (id) => {

    try {

      await axios.delete(

        `http://studysync-q7ex.onrender.com/api/tasks/${id}`,

        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }

      );

      fetchTasks();

    }

    catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="page-container">

      <h1>📋 To-Do Manager</h1>

      <div className="todo-input">

        <input
          type="text"
          placeholder="Enter Task"
          value={task}
          onChange={(e) =>
            setTask(
              e.target.value
            )
          }
        />

        <button
          onClick={addTask}
        >
          Add Task
        </button>

      </div>

      <div className="todo">

        <ul>

          {tasks.map((item) => (

            <li key={item._id}>

              <div
                className="task-left"
              >

                <input
                  type="checkbox"
                  checked={
                    item.completed
                  }
                  onChange={() =>
                    toggleTask(
                      item._id,
                      item.completed
                    )
                  }
                />

                <span
                  className={
                    item.completed
                      ? "completed"
                      : ""
                  }
                >
                  {item.title}
                </span>

              </div>

              <button
                className={`complete-btn ${
                  item.completed
                    ? "completed-btn"
                    : "pending-btn"
                }`}
                onClick={() =>
                  toggleTask(
                    item._id,
                    item.completed
                  )
                }
              >
                {item.completed
                  ? "Completed"
                  : "Pending"}
              </button>

              <span
                className="delete-icon"
                onClick={() =>
                  deleteTask(
                    item._id
                  )
                }
              >
                🗑
              </span>

            </li>

          ))}

        </ul>

      </div>

    </div>

  );

}

export default TodoPage;