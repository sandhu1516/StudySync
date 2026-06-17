import { useState, useEffect } from "react";import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../styles/login.css";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {

  const savedEmail =
    localStorage.getItem("rememberEmail");

  if(savedEmail){

    setEmail(savedEmail);
    setRememberMe(true);

  }

}, []);

  const handleLogin = async () => {

    try {

      const response = await axios.post(
        "https://studysync-q7ex.onrender.com/api/auth/login",
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      if(rememberMe){

  localStorage.setItem(
    "rememberEmail",
    email
  );

}

else{

  localStorage.removeItem(
    "rememberEmail"
  );

}

      alert("Login Successful");

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );

    }

  };

  return (

    <div className="auth-page">

      {/* LEFT SIDE */}

      <div className="auth-left">

        <div className="overlay">

          <h1>📚 StudySync</h1>

          <p>
            Organize your studies,
            track productivity,
            and achieve your goals.
          </p>

        </div>

      </div>

      {/* RIGHT SIDE */}

      <div className="auth-right">

        <div className="auth-card">

          <h1>Login</h1>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <div className="remember-row">

  <label>

    <input
      type="checkbox"
      checked={rememberMe}
      onChange={(e)=>
        setRememberMe(
          e.target.checked
        )
      }
    />

    Remember Me

  </label>

</div>

          <button
            onClick={handleLogin}
          >
            Login
          </button>

          <p className="auth-link">

            New User?

            <span
              onClick={() =>
                navigate("/register")
              }
            >
              Sign Up Here
            </span>

          </p>

        </div>

      </div>

    </div>

  );
}

export default Login;