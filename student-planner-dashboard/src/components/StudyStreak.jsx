import '../styles/streak.css'

function StudyStreak({ streak }) {

  let badge = '🥉 Bronze'

  if(streak >= 7)
    badge = '🥈 Silver'

  if(streak >= 15)
    badge = '🥇 Gold'

  if(streak >= 30)
    badge = '👑 Master'

  return (

    <div className="streak card">

      <h2>
        Study Streak 🔥
      </h2>

      <h1>
        {streak} Days
      </h1>

      <div className="badge-box">

        <h3>
          Current Reward
        </h3>

        <h2>
          {badge}
        </h2>

      </div>

    </div>

  )

}

export default StudyStreak