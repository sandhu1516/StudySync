import '../styles/ai.css'

function AISuggestion({ tasks }) {

  const pending = tasks.filter(
    task => !task.completed
  )

  let suggestion = 'Great work today!'

  if (pending.length > 3) {

    suggestion =
      'Focus on completing pending tasks first.'

  } else if (pending.length > 0) {
    suggestion =
      'You are close to finishing your goals.'
  }

  return (
    <div className="ai card">

      <h2>AI Study Suggestion 🤖</h2>

      <p>{suggestion}</p>

    </div>
  )
}

export default AISuggestion