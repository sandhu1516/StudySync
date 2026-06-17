import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../styles/login.css";

function Register() {

  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleRegister = async () => {

    try {

      const response =
        await axios.post(

          "http://studysync-q7ex.onrender.com/api/auth/register",

          {
            name,
            email,
            password
          }

        );

      alert(
        "Account Created Successfully!"
      );

      console.log(
        response.data
      );

      navigate("/login");

    }

    catch (error) {

      console.log(error);

      alert(

        error.response?.data?.message ||

        "Registration Failed"

      );

    }

  };

  return (

    <div className="auth-page">

      {/* LEFT SIDE */}

      <div className="auth-left">

        <div className="overlay">

          <h1>
            📚 StudySync
          </h1>

          <p>

            Create your account and start
            organizing your studies,
            tracking productivity,
            and achieving your goals.

          </p>

        </div>

      </div>

      {/* RIGHT SIDE */}

      <div className="auth-right">

        <div className="auth-card">

          <h1>
            Create Account
          </h1>

          <input
            type="text"
            placeholder="Full Name"

            value={name}

            onChange={(e) =>
              setName(
                e.target.value
              )
            }
          />

          <input
            type="email"
            placeholder="Email"

            value={email}

            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
          />

          <input
            type="password"
            placeholder="Password"

            value={password}

            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />

          <button
            onClick={handleRegister}
          >
            Sign Up
          </button>

          <p className="auth-link">

            Already have an account?

            <span
              onClick={() =>
                navigate("/login")
              }
            >
              Login Here
            </span>

          </p>

        </div>

      </div>

    </div>

  );
}

export default Register;