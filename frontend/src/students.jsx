import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import api from './api'

function Students() {
  const [students, setStudents] = useState(null)
  const [singleStudent, setSingleStudent] = useState(null)
  const [studentId, setStudentId] = useState('')

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get("/students/")
        if (response.status === 200) {
          setStudents(response.data)
        } else {
          console.error("failed")
        }
      } catch (error) {
        console.error(error.message)
      }
    }
    fetchStudents()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await api.get(`/students/${studentId}/`)
      setSingleStudent(response.data)
    } catch (error) {
      console.error(error.message)
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/students/${id}/`)
      const response = await api.get("/students/")
      setStudents(response.data)
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Students</h1>
        <form onSubmit={handleSubmit}>
          <input placeholder='enter student id' value={studentId} onChange={(event) => (setStudentId(event.target.value))} />
          <button type='submit'>
            Submit
          </button>
        </form>

        <div className='flex items-center '>
          <Link to='/students/create' className='p-4 border border-black'>Create Student</Link>
        </div>

        {
          singleStudent ? (
            <div>
              <h3 className="text-lg font-semibold">{singleStudent.id} : {singleStudent.name}</h3>
              <p className="text-gray-600">email: {singleStudent.email}</p>
              <p className="text-gray-600">Age: {singleStudent.age}</p>
              <button onClick={() => handleDelete(singleStudent.id)}>Delete</button>
            </div>
          )
            :
            (<div className="grid gap-4">
              {students && students.map((student, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow border border-gray-200">
                  <h3 className="text-lg font-semibold">{student.id} : {student.name}</h3>
                  <p className="text-gray-600">email: {student.email}</p>
                  <p className="text-gray-600">Age: {student.age}</p>
                  <button className='p-4' onClick={() => handleDelete(student.id)}>Delete</button>
                </div>
              ))}
            </div>)
        }

      </div>

    </>
  )
}

export default Students
