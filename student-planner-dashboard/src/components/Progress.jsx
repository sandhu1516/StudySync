import '../styles/progress.css'

function Progress({ tasks }) {

  const completed =
    tasks.filter(
      task => task.completed
    ).length

  const percentage =
    tasks.length
      ? Math.floor(
          (completed / tasks.length) * 100
        )
      : 0

  return (

    <div className="progress card">

      <h2>Daily Task Progress</h2>

      <div className="progress-bar">

        <div
          className="progress-fill"
          style={{
            width: `${percentage}%`
          }}
        ></div>

      </div>

      <h3>
        {percentage}% Completed
      </h3>

    </div>
  )
}

export default Progress