import Pomodoro from "../components/Pomodoro";
import axios from "axios";

function Timer() {
  return (
    <div style={{padding:"40px"}}>
      <Pomodoro />
    </div>
  );
}

export default Timer;