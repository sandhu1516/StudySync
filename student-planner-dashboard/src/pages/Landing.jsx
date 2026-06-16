import { useNavigate } from "react-router-dom";
import "../styles/landing.css";

function Landing() {

  const navigate = useNavigate();

  return (

    <div className="landing">

      <div className="landing-content">

        <h1>
          📚 StudySync
        </h1>

        <p>
          Organize your studies,
          boost productivity,
          and achieve your goals.
        </p>

        <div className="landing-buttons">

          <button
            onClick={() =>
              navigate("/register")
            }
          >
            Sign Up
          </button>

          <button
            className="login-btn"
            onClick={() =>
              navigate("/login")
            }
          >
            Login
          </button>

        </div>

      </div>

      <footer className="landing-footer">

      <h3>
        📚 StudySync AI
      </h3>

      <p>
        Smart Student Planner • Pomodoro • Goals • Notes • Analytics
      </p>

      <p>
        © 2026 StudySync AI | Built with ❤️ by Gurleen
      </p>

    </footer>

  </div>

);

}

export default Landing;