import { useState } from 'react'
import {
  FaTrash,
  FaEdit
} from 'react-icons/fa'

import '../styles/timetable.css'

function Timetable({
  timetable,
  setTimetable
}) {

  const [day, setDay] = useState('')
  const [subject, setSubject] =
    useState('')

  const [editIndex, setEditIndex] =
    useState(null)

  // ADD OR UPDATE
  const addSchedule = () => {

    if (
      day.trim() === '' ||
      subject.trim() === ''
    ) return

    if (editIndex !== null) {

      const updated = [...timetable]

      updated[editIndex] = {
        ...updated[editIndex],
        day,
        subject
      }

      setTimetable(updated)

      setEditIndex(null)

    } else {

      setTimetable([
        ...timetable,
        {
          day,
          subject,
          completed: false
        }
      ])
    }

    setDay('')
    setSubject('')
  }

  // DELETE
  const deleteSchedule = (index) => {

    const updated = timetable.filter(
      (_, i) => i !== index
    )

    setTimetable(updated)
  }

  // EDIT
  const editSchedule = (index) => {

    setDay(timetable[index].day)

    setSubject(
      timetable[index].subject
    )

    setEditIndex(index)
  }

  // COMPLETE
  const toggleComplete = (index) => {

    const updated = [...timetable]

    updated[index].completed =
      !updated[index].completed

    setTimetable(updated)
  }

  return (

    <div className="timetable card">

      <h2>Weekly Timetable</h2>

      <div className="table-inputs">

        <input
          type="text"
          placeholder="Day"
          value={day}
          onChange={(e) =>
            setDay(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) =>
            setSubject(e.target.value)
          }
        />

        <button onClick={addSchedule}>

          {
            editIndex !== null
              ? 'Update'
              : 'Add'
          }

        </button>

      </div>

      <div className="table-list">

        {
          timetable.map(
            (item, index) => (

            <div
              className="table-row"
              key={index}
            >

              <div className="table-left">

                <input
                  type="checkbox"
                  checked={
                    item.completed
                  }
                  onChange={() =>
                    toggleComplete(index)
                  }
                />

                <div>

                  <h3
                    className={
                      item.completed
                        ? 'done'
                        : ''
                    }
                  >
                    {item.day}
                  </h3>

                  <p
                    className={
                      item.completed
                        ? 'done'
                        : ''
                    }
                  >
                    {item.subject}
                  </p>

                </div>

              </div>

              <div className="table-actions">

                <FaEdit
                  className="edit-icon"
                  onClick={() =>
                    editSchedule(index)
                  }
                />

                <FaTrash
                  className="delete-icon"
                  onClick={() =>
                    deleteSchedule(index)
                  }
                />

              </div>

            </div>

          ))
        }

      </div>

    </div>
  )
}

export default Timetable