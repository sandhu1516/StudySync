import { useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import '../styles/todo.css'

function Todo({ tasks, setTasks }) {
  const [task, setTask] = useState('')

  const addTask = () => {
    if (task.trim() === '') return

    setTasks([
      ...tasks,
      {
        text: task,
        completed: false
      }
    ])

    setTask('')
  }

  const toggleTask = (index) => {
    const updated = [...tasks]

    updated[index].completed =
      !updated[index].completed

    setTasks(updated)
  }

  const deleteTask = (index) => {
    const updated = tasks.filter(
      (_, i) => i !== index
    )

    setTasks(updated)
  }

  return (
    <div className="todo card">
      <h2>To-Do Tasks</h2>

      <div className="todo-input">
        <input
          type="text"
          placeholder="Add a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <button onClick={addTask}>
          Add
        </button>
      </div>

      <ul>
        {tasks.map((item, index) => (
          <li key={index}>
            <div className="task-left">
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleTask(index)}
              />

              <span
                className={
                  item.completed
                    ? 'completed'
                    : ''
                }
              >
                {item.text}
              </span>
            </div>

                <button
    className={
        item.completed
        ? 'complete-btn completed-btn'
        : 'complete-btn pending-btn'
    }

    onClick={() => toggleTask(index)}
    >

    {
        item.completed
        ? 'Completed'
        : 'Mark Done'
    }

    </button>

            <FaTrash
              className="delete-icon"
              onClick={() => deleteTask(index)}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Todo