import { useState, useEffect } from 'react'
import '../styles/pomodoro.css'
import axios from "axios";

function Pomodoro() {

  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [mode, setMode] = useState("pomodoro");

  const [timeLeft, setTimeLeft] =
    useState(25 * 60)

  const [isRunning, setIsRunning] =
    useState(false)

  const [warning, setWarning] =
    useState('')

  // UPDATE TOTAL TIME
  useEffect(() => {

    const totalSeconds =

      Number(hours) * 3600 +
      Number(minutes) * 60 +
      Number(seconds)

    setTimeLeft(totalSeconds)

  }, [hours, minutes, seconds])

  // TIMER LOGIC
  useEffect(() => {

    let timer

    if (isRunning && timeLeft > 0) {

      timer = setInterval(() => {

        setTimeLeft(prev => prev - 1)

      }, 1000)

    }

    // WARNING
    if (timeLeft === 90) {

      setWarning(
        '⚠ Only 1.5 minutes left!'
      )
    }

    if (timeLeft === 60) {

      setWarning(
        '⏰ Only 1 minute left!'
      )
    }

    // TIMER END
    if (timeLeft === 0 && isRunning) {

  const saveSession = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const totalSeconds =

  Number(hours) * 3600 +
  Number(minutes) * 60 +
  Number(seconds);

await axios.post(
  "https://studysync-q7ex.onrender.com/api/pomodoro",
  {
    duration: totalSeconds
  },
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }

      );

      console.log(
        "Pomodoro Saved"
      );

    }

    catch(error) {

      console.log(error);

    }

  };

  saveSession();

  if(mode === "pomodoro"){

  setWarning(
    "🎉 Study Session Completed!"
  );

}
else{

  setWarning(
    "✅ Break Finished!"
  );

}

  const audio = new Audio(
    "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
  );

  audio.play();

  setIsRunning(false);
}

    return () => clearInterval(timer)

  }, [isRunning, timeLeft])

  // FORMAT
  const formatTime = () => {

    const hrs = Math.floor(
      timeLeft / 3600
    )

    const mins = Math.floor(
      (timeLeft % 3600) / 60
    )

    const secs = timeLeft % 60

    return `${hrs
      .toString()
      .padStart(2, '0')}
      :
      ${mins
        .toString()
        .padStart(2, '0')}
      :
      ${secs
        .toString()
        .padStart(2, '0')}`
  }

  // START
  const startTimer = () => {
    setIsRunning(true)
  }

  // PAUSE
  const pauseTimer = () => {
    setIsRunning(false)
  }

  // RESET
  const resetTimer = () => {

    setIsRunning(false)

    const totalSeconds =

      Number(hours) * 3600 +
      Number(minutes) * 60 +
      Number(seconds)

    setTimeLeft(totalSeconds)

    setWarning('')
  }

  return (

    <div className="pomodoro card">

      <h2>

{
  mode === "pomodoro"
  ? "🍅 Pomodoro Timer"
  : mode === "short"
  ? "☕ Short Break (10 min)"
  : "🌴 Long Break (30 min)"
}

</h2>

      <div className="timer-content">

        <div className="timer-modes">

  <button
    onClick={() => {

      setMode("pomodoro");

      setHours(0);
      setMinutes(25);
      setSeconds(0);

    }}
  >
    🍅 Pomodoro
  </button>

  <button
    onClick={() => {

      setMode("short");

      setHours(0);
      setMinutes(10);
      setSeconds(0);

    }}
  >
    ☕ Short Break
  </button>

  <button
    onClick={() => {

      setMode("long");

      setHours(0);
      setMinutes(30);
      setSeconds(0);

    }}
  >
    🌴 Long Break
  </button>

</div>

        {/* TIME INPUTS */}

        <div className="time-inputs">

         <input
  type="number"
  min="0"
  placeholder="HH"
  value={hours}
  disabled={mode !== "pomodoro"}
  onChange={(e) =>
    setHours(e.target.value)
  }
/>

          <span>:</span>

        <input
  type="number"
  min="0"
  placeholder="MM"
  value={minutes}
  disabled={mode !== "pomodoro"}
  onChange={(e) =>
    setMinutes(e.target.value)
  }
/>

          <span>:</span>

         <input
  type="number"
  min="0"
  placeholder="SS"
  value={seconds}
  disabled={mode !== "pomodoro"}
  onChange={(e) =>
    setSeconds(e.target.value)
  }
/>

        </div>

        {/* TIMER */}

        <h1 className="timer">
          {formatTime()}
        </h1>

        {/* WARNING */}

        {
          warning && (
            <p className="warning">
              {warning}
            </p>
          )
        }

        {/* BUTTONS */}

        <div className="timer-buttons">

          <button onClick={startTimer}>
            Start
          </button>

          <button onClick={pauseTimer}>
            Pause
          </button>

          <button onClick={resetTimer}>
            Reset
          </button>

        </div>

      </div>

    </div>
  )
}

export default Pomodoro