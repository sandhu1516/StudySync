import "../styles/dashboard.css";
import FeatureCard from "../components/FeatureCard";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme")
      ? localStorage.getItem("theme") === "dark"
      : true
  );


  const [currentTime, setCurrentTime] = useState(new Date());
  const [tasks, setTasks] = useState([]);
 const [badges, setBadges] = useState([]);

const [sidebarOpen, setSidebarOpen] = useState(true);

const [streak, setStreak] = useState(0);


const navigate = useNavigate();

const user =
JSON.parse(
  localStorage.getItem("user")
);

const [showSettings, setShowSettings] =
useState(false);

const [newName, setNewName] =
useState(user?.name || "");

const [currentPassword, setCurrentPassword] =
useState("");

const [newPassword, setNewPassword] =
useState("");

const [studyHours, setStudyHours] =
useState("0h 0m 0s");

  // ⏰ Clock updater
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // 🌗 Theme persistence
  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // 📊 Fetch tasks + pomodoro data together
useEffect(() => {

  fetchTasks();

  fetchPomodoroData();

fetchBadges();
fetchStreak();
  const interval =

    setInterval(() => {

      fetchPomodoroData();

    }, 10000);

  return () =>
    clearInterval(interval);

}, []);

      const fetchBadges = async () => {

  try {

    const response =
      await axios.get(

        "http://studysync-q7ex.onrender.com/api/badges",

        {
          headers:{
            Authorization:
            `Bearer ${localStorage.getItem("token")}`
          }
        }

      );

    setBadges(response.data);

  }

  catch(error){

    console.log(error);

  }

};

const fetchStreak = async () => {

  try {

    const response = await axios.get(

      "http://studysync-q7ex.onrender.com/api/streak",

      {
        headers: {
          Authorization:
            `Bearer ${localStorage.getItem("token")}`
        }
      }

    );

    setStreak(response.data.currentStreak);

  }

  catch (error) {

    console.log(error);

  }

};


  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://studysync-q7ex.onrender.com/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPomodoroData = async () => {

  try {

    const response =
      await axios.get(

        "http://studysync-q7ex.onrender.com/api/pomodoro",

        {
          headers:{
            Authorization:
            `Bearer ${localStorage.getItem("token")}`
          }
        }

      );

   const totalSeconds =

  response.data.reduce(

    (sum,item)=>

      sum + item.duration,

    0

  );

    const hours =

      Math.floor(
        totalSeconds / 3600
      );

    const minutes =

      Math.floor(
        (totalSeconds % 3600) / 60
      );

    const seconds =

      totalSeconds % 60;

    setStudyHours(

      `${hours}h ${minutes}m ${seconds}s`

    );

  }

  catch(error){

    console.log(error);

  }

};

  // 📈 Stats
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.length - completedTasks;

  const completionRate =
    tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  const totalPomodoroSessions =
  Number(localStorage.getItem("pomodoroCount")) || 0;

const earnedBadges = [];

if (completedTasks >= 5)
  earnedBadges.push("🏅 Task Master");

if (completedTasks >= 20)
  earnedBadges.push("🥇 Productivity Pro");

if (totalPomodoroSessions >= 10)
  earnedBadges.push("🍅 Pomodoro Champion");

if (completionRate === 100 && tasks.length > 0)
  earnedBadges.push("🔥 Perfect Completion");


  // 🔥 Streak (currently localStorage only)

  const handleSaveSettings = async () => {

  try{

    const response =
      await axios.put(

        "http://studysync-q7ex.onrender.com/api/auth/profile",

        {

          name:newName,

          currentPassword,

          newPassword

        },

        {

          headers:{

            Authorization:
            `Bearer ${localStorage.getItem("token")}`

          }

        }

      );

    localStorage.setItem(

      "user",

      JSON.stringify(
        response.data.user
      )

    );

    alert(
      "Profile Updated Successfully"
    );

    setShowSettings(false);

    window.location.reload();

  }

  catch(error){

    alert(

      error.response?.data?.message ||

      "Update Failed"

    );

  }

};

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className={`dashboard-home ${darkMode ? "dark-theme" : "light-theme"}`}>
      {/* SIDEBAR */}
      <div
  className={`sidebar ${
    sidebarOpen ? "sidebar-open" : "sidebar-closed"
  }`}
>

        <div className="logo">📚 StudySync</div>

        <div className="nav-menu">
          <div className="nav-item" onClick={() => navigate("/dashboard")}>
            Dashboard
          </div>
          <div className="nav-item" onClick={() => navigate("/todo")}>
            To-Do Tasks
          </div>
          <div className="nav-item" onClick={() => navigate("/timer")}>
            Pomodoro Timer
          </div>
          <div className="nav-item" onClick={() => navigate("/timetable")}>
            Timetable
          </div>
          <div className="nav-item" onClick={() => navigate("/goals")}>
            Goals
          </div>
          <div className="nav-item" onClick={() => navigate("/flashcards")}>
            Flash Cards
          </div>
          <div className="nav-item" onClick={() => navigate("/notes")}>
            Notes
          </div>
          <div className="nav-item" onClick={() => navigate("/analytics")}>
            Analytics
          </div>
          <div className="nav-item" onClick={() => navigate("/pdf-query")}>
            PDF Query AI
          </div>
        </div>
        <div className="sidebar-bottom">

  <button
    className="settings-btn"
    onClick={() =>
      setShowSettings(true)
    }
  >
    ⚙️ Settings
  </button>

  <button
    className="logout-btn"
    onClick={handleLogout}
  >
    Logout
  </button>

</div>
      </div>

      {/* MAIN CONTENT */}
      <div
  className={`main-content ${
    sidebarOpen ? "" : "full-width"
  }`}
>
        <div className="hero">
          <div className="hero-header">

  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "15px"
    }}
  >

    <button
      className="sidebar-toggle"
      onClick={() =>
        setSidebarOpen(!sidebarOpen)
      }
    >
      ☰
    </button>

            <div className="user-info">

  <img
    className="profile-avatar"
    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
      user?.name || "Student"
    )}&background=random&color=fff&size=128`}
    alt="avatar"
  />

  <div>

    <h1>
      Welcome Back {user?.name || "Student"} 👋
    </h1>

    <p>
      Stay focused and achieve your goals.
    </p>

  </div>
</div>
</div>
            <button className="theme-btn" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>
          <div className="date-time-box">
            <div>
              📅{" "}
              {currentTime.toLocaleDateString("en-IN", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
            <div>⏰ {currentTime.toLocaleTimeString()}</div>
          </div>
        </div>

        {/* STATS */}
        <div className="stats">
          <div className="stat-card">
            <p>Total Tasks</p>
            <h2>{tasks.length}</h2>
          </div>
          <div className="stat-card">
            <p>Completed Tasks</p>
            <h2>{completedTasks}</h2>
          </div>
          <div className="stat-card">
            <p>Pending Tasks</p>
            <h2>{pendingTasks}</h2>
          </div>
          <div className="stat-card">
            <p>Completion Rate</p>
            <h2>{completionRate}%</h2>
          </div>
          <div className="stat-card">
            <p>Study Hours</p>
            <h2>{studyHours}</h2>
          </div>
          <div className="stat-card">
  <p>Study Streak 🔥</p>
  <h2>{streak}</h2>
</div>
        </div>

         {/* ACHIEVEMENT BADGES */}

<div className="badges-section">

  <h2>🏆 Achievement Badges</h2>

  <div className="badges-grid">

    {earnedBadges.length > 0 ? (
  earnedBadges.map((badge, index) => (

        <div
          key={index}
          className="badge-card"
        >
          {badge}
        </div>

      ))

    ) : (

      <p>No badges earned yet.</p>

    )}

  </div>

</div>

        {/* FEATURES */}
        <div className="feature-grid">
          
          <FeatureCard icon="📅" title="Timetable" description="Weekly schedule." route="/timetable" />
        </div>

      <footer className="footer">

  <p>
    © 2026 StudySync AI | Built with ❤️ by Gurleen
  </p>

</footer>

        {
showSettings && (

<div
  className="settings-overlay"
  onClick={() =>
    setShowSettings(false)
  }
>

<div
  className="settings-modal"
  onClick={(e)=>
    e.stopPropagation()
  }
>

<h2>
  ⚙️ Settings
</h2>

<input
  type="text"
  placeholder="Change Name"
  value={newName}
  onChange={(e)=>
    setNewName(
      e.target.value
    )
  }
/>

<input
  type="password"
  placeholder="Current Password"
  value={currentPassword}
  onChange={(e)=>
    setCurrentPassword(
      e.target.value
    )
  }
/>

<input
  type="password"
  placeholder="New Password"
  value={newPassword}
  onChange={(e)=>
    setNewPassword(
      e.target.value
    )
  }
/>

<button
  className="save-btn"
  onClick={handleSaveSettings}
>
  Save Changes
</button>

<button
  className="logout-btn"
  onClick={handleLogout}
>
  Logout
</button>

</div>

</div>

)}
      </div>
    </div>
  );
}

export default Dashboard;
