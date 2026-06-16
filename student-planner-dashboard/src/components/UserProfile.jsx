import '../styles/profile.css'

function UserProfile({ tasks }) {

  const completed = tasks.filter(
    task => task.completed
  ).length

  return (
    <div className="profile card">

      <h2>Welcome Gurleen 👋</h2>

      <p>
        Today's Goal: {tasks.length} Tasks
      </p>
      <p>
        Completed: {completed}
      </p>

    </div>
  )
}

export default UserProfile