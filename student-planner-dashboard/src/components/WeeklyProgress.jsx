import '../styles/progress.css'

function WeeklyProgress({
  timetable
}) {

  const completed =
    timetable.filter(
      item => item.completed
    ).length

  const percentage =
    timetable.length
      ? Math.floor(
          (completed / timetable.length) * 100
        )
      : 0

  return (

    <div className="progress card">

      <h2>
        Weekly Study Progress
      </h2>

      <div className="progress-bar">

        <div
          className="progress-fill"
          style={{
            width: `${percentage}%`
          }}
        ></div>

      </div>

      <h3>
        {percentage}% Weekly Goals Completed
      </h3>

    </div>
  )
}

export default WeeklyProgress