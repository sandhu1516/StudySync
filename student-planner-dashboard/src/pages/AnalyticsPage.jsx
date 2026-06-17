import { useState, useEffect } from "react";
import axios from "axios";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from "recharts";

import "../styles/analytics.css";

function AnalyticsPage() {

  const [tasks, setTasks] = useState([]);
const [timetable, setTimetable] = useState([]);
const [goals, setGoals] = useState([]);

const token =
localStorage.getItem("token");


useEffect(() => {

  fetchAnalytics();

  const interval =

    setInterval(() => {

      fetchAnalytics();

    }, 5000);

  return () =>
    clearInterval(interval);

}, []);

const fetchAnalytics = async () => {

  try {

    const taskResponse =
      await axios.get(

        "https://studysync-q7ex.onrender.com/api/tasks",

        {
          headers:{
            Authorization:
            `Bearer ${token}`
          }
        }

      );

    const timetableResponse =
      await axios.get(

        "https://studysync-q7ex.onrender.com/api/timetable",

        {
          headers:{
            Authorization:
            `Bearer ${token}`
          }
        }

      );

    const goalsResponse =
      await axios.get(

        "https://studysync-q7ex.onrender.com/api/goals",

        {
          headers:{
            Authorization:
            `Bearer ${token}`
          }
        }

      );

    setTasks(
      taskResponse.data
    );

    setTimetable(
      timetableResponse.data
    );

    setGoals(
      goalsResponse.data
    );

    console.log(
  "TASKS:",
  taskResponse.data
);

console.log(
  "TIMETABLE:",
  timetableResponse.data
);

console.log(
  "GOALS:",
  goalsResponse.data
);

  }

  catch(error){

    console.log(error);

  }

};

  const completedTasks =
    tasks.filter(
      item => item.completed
    ).length;

  const pendingTasks =
    tasks.length -
    completedTasks;

  const completedTimetable =
    timetable.filter(
      item => item.completed
    ).length;

  const pendingTimetable =
    timetable.length -
    completedTimetable;

 const completedGoals =
goals.filter(
 goal => goal.progress === 100
).length;

  const pendingGoals =
    goals.length -
    completedGoals;

  const todoData = [
    {
      name: "Completed",
      value: completedTasks
    },
    {
      name: "Pending",
      value: pendingTasks
    }
  ];

  const timetableData = [
    {
      name: "Completed",
      value: completedTimetable
    },
    {
      name: "Pending",
      value: pendingTimetable
    }
  ];

  const goalsData = [
    {
      name: "Completed",
      value: completedGoals
    },
    {
      name: "Pending",
      value: pendingGoals
    }
  ];

  const overallData = [
    {
      category: "Tasks",
      Completed: completedTasks,
      Pending: pendingTasks
    },
    {
      category: "Timetable",
      Completed: completedTimetable,
      Pending: pendingTimetable
    },
    {
      category: "Goals",
      Completed: completedGoals,
      Pending: pendingGoals
    }
  ];

  const COLORS = [
    "#22c55e",
    "#ef4444"
  ];

  console.log(tasks);
console.log(timetable);
console.log(goals);

  return (

    <div className="analytics-page">

      <h3>
  Tasks: {tasks.length}
</h3>

<h3>
  Timetable: {timetable.length}
</h3>

<h3>
  Goals: {goals.length}
</h3>

      <h1>
        📊 Study Analytics Dashboard
      </h1>

      <div className="graph-grid">

        {/* TODO GRAPH */}

        <div className="graph-card">

          <h2>
            To-Do Task Analytics
          </h2>

          <p>
            Completed vs Pending Tasks
          </p>

          <ResponsiveContainer
            width="100%"
            height={280}
          >

            <PieChart>

              <Pie
                data={todoData}
                dataKey="value"
                outerRadius={90}
                label
              >

                {
                  todoData.map(
                    (entry, index) => (

                      <Cell
                        key={index}
                        fill={
                          COLORS[index]
                        }
                      />

                    )
                  )
                }

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

        {/* TIMETABLE GRAPH */}

        <div className="graph-card">

          <h2>
            Timetable Analytics
          </h2>

          <p>
            Completed Study Sessions
          </p>

          <ResponsiveContainer
            width="100%"
            height={280}
          >

            <PieChart>

              <Pie
                data={timetableData}
                dataKey="value"
                outerRadius={90}
                label
              >

                {
                  timetableData.map(
                    (entry, index) => (

                      <Cell
                        key={index}
                        fill={
                          COLORS[index]
                        }
                      />

                    )
                  )
                }

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

        {/* GOALS GRAPH */}

        <div className="graph-card">

          <h2>
            Goals Analytics
          </h2>

          <p>
            Goal Completion Progress
          </p>

          <ResponsiveContainer
            width="100%"
            height={280}
          >

            <PieChart>

              <Pie
                data={goalsData}
                dataKey="value"
                outerRadius={90}
                label
              >

                {
                  goalsData.map(
                    (entry, index) => (

                      <Cell
                        key={index}
                        fill={
                          COLORS[index]
                        }
                      />

                    )
                  )
                }

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* OVERALL GRAPH */}

      <div className="overall-card">

        <h2>
          Overall Study Progress
        </h2>

        <p>
          Combined comparison of
          Tasks, Timetable and Goals
        </p>

        <ResponsiveContainer
          width="100%"
          height={400}
        >

          <BarChart
            data={overallData}
          >

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="category"
            />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar
              dataKey="Completed"
              fill="#22c55e"
            />

            <Bar
              dataKey="Pending"
              fill="#ef4444"
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>

  );
}

export default AnalyticsPage;