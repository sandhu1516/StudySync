import '../styles/header.css'

function Header({
  darkMode,
  setDarkMode
}) {

  const today = new Date()

  const currentDate =
    today.toDateString()

  return (

    <div className="header card">

      {/* LEFT SIDE */}

      <div className="header-left">

        <h1>
          📚 Student Planner Dashboard
        </h1>

      </div>

      {/* RIGHT SIDE */}

      <div className="header-right">

        <p className="date">
          {currentDate}
        </p>

        <button
          className="theme-btn"

          onClick={() =>
            setDarkMode(!darkMode)
          }
        >

          {
            darkMode
              ? '☀ Light'
              : '🌙 Dark'
          }

        </button>

      </div>

    </div>
  )
}

export default Header