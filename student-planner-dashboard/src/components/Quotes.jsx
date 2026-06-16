import '../styles/quotes.css'

function Quotes() {
  const quotes = [
    'Success is the sum of small efforts repeated daily.',
    'Discipline beats motivation.',
    'Push yourself because no one else will do it for you.',
    'Dream big. Start small. Act now.'
  ]

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]

  return (
    <div className="quotes card">
      <h2>Motivational Quote</h2>
      <p>“{randomQuote}”</p>
    </div>
  )
  }

export default Quotes