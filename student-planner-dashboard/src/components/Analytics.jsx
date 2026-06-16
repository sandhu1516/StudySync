import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

import '../styles/analytics.css'

function Analytics({ tasks }) {

  const completed = tasks.filter(
    task => task.completed
    ).length

  const pending = tasks.length - completed

  const data = [
    {
      name: 'Completed',
      value: completed
    },
    {
      name: 'Pending',
      value: pending
    }
  ]

  const COLORS = [
    '#22c55e',
    '#38bdf8'
  ]

  return (
    <div className="analytics card">

      <h2>Task Analytics 📊</h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <PieChart>
            <Pie
            data={data}
            dataKey="value"
            outerRadius={100}
            label
          >

            {
              data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))
            }

          </Pie>
          <Tooltip />
        </PieChart>

        </ResponsiveContainer>

    </div>
  )
}

export default Analytics