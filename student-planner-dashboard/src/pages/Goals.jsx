import {
  useState,
  useEffect
} from "react";

import axios from "axios";

import "../styles/goals.css";

function Goals() {

  const [title, setTitle] =
    useState("");

  const [type, setType] =
    useState("Weekly");

  const [goals, setGoals] =
    useState([]);

  const token =
    localStorage.getItem("token");

  useEffect(() => {

    fetchGoals();

  }, []);

  const fetchGoals =
    async () => {

      try {

        const response =
          await axios.get(

            "http://studysync-q7ex.onrender.com/api/goals",

            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }

          );

        setGoals(
          response.data
        );

      }

      catch (error) {

        console.log(error);

      }

    };

  const addGoal =
    async () => {

      if (!title.trim())
        return;

      try {

        await axios.post(

          "http://studysync-q7ex.onrender.com/api/goals",

          {
            title,
            type
          },

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }

        );

        setTitle("");

        fetchGoals();

      }

      catch (error) {

        console.log(error);

      }

    };

  const updateProgress =
    async (
      id,
      currentProgress
    ) => {

      const newProgress =
        Math.min(
          currentProgress + 10,
          100
        );

      try {

        await axios.put(

          `http://studysync-q7ex.onrender.com/api/goals/${id}`,

          {
            progress:
              newProgress,

            completed:
              newProgress === 100
          },

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }

        );

        fetchGoals();

      }

      catch (error) {

        console.log(error);

      }

    };

  const deleteGoal =
    async (id) => {

      try {

        await axios.delete(

          `http://studysync-q7ex.onrender.com/api/goals/${id}`,

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }

        );

        fetchGoals();

      }

      catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="page-container">

      <h1>
        🎯 Goals
      </h1>

      {/* INPUT SECTION */}

      <div className="goal-input">

        <input
          type="text"
          placeholder="Enter Goal"
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
        />

        <select
          value={type}
          onChange={(e) =>
            setType(
              e.target.value
            )
          }
        >

          <option>
            Weekly
          </option>

          <option>
            Monthly
          </option>

          <option>
            Yearly
          </option>

        </select>

        <button
          onClick={addGoal}
        >
          Add Goal
        </button>

      </div>

      {/* GOALS LIST */}

      <div className="goals-grid">

        {

          goals.map((goal) => (

            <div
              key={goal._id}
              className="goal-card"
            >

              <div className="goal-title">

                {goal.title}

              </div>

              <div className="goal-type">

                {goal.type}

              </div>

              <div className="progress-label">

                <span>
                  Progress
                </span>

                <span>
                  {goal.progress}%
                </span>

              </div>

              <div className="progress-bar">

                <div
                  className="progress-fill"
                  style={{
                    width:
                      `${goal.progress}%`
                  }}
                />

              </div>

              {

                goal.completed && (

                  <div
                    className="completed-badge"
                  >
                    ✅ Completed
                  </div>

                )

              }

              <div
                className="goal-actions"
              >

                <button
                  className="update-btn"
                  disabled={
                    goal.progress >= 100
                  }
                  onClick={() =>
                    updateProgress(
                      goal._id,
                      goal.progress
                    )
                  }
                >

                  {

                    goal.progress >= 100

                      ? "Completed"

                      : "+10%"

                  }

                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteGoal(
                      goal._id
                    )
                  }
                >
                  Delete
                </button>

              </div>

            </div>

          ))

        }

      </div>

    </div>

  );

}

export default Goals;