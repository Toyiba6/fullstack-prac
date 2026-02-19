import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import api from './api'

function Teams() {
  const [teams, setTeams] = useState(null)
  const [singleTeam, setSingleTeam] = useState(null)
  const [teamId, setTeamId] = useState('')

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await api.get("/teams/")
        if (response.status === 200) {
          setTeams(response.data)
        } else {
          console.error("failed")
        }

      } catch (error) {
        console.error(error.message)
      }
    }
    fetchTeams();
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await api.get(`/teams/${teamId}/`)
      setSingleTeam(response.data)
    } catch (error) {
      console.error(error.message)
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/teams/${id}/`)
      const response = await api.get("/teams/")
      setTeams(response.data)
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Teams</h1>
        <form onSubmit={handleSubmit}>
          <input placeholder='enter student id' value={teamId} onChange={(event) => (setTeamId(event.target.value))} />
          <button type='submit'>
            Submit
          </button>
        </form>

        <div className='flex items-center '>
          <Link to='/teams/create' className='p-4 border border-black'>Create Team</Link>
        </div>

        {
          singleTeam ? (
            <div>
              <h3 className="text-lg font-semibold">{singleTeam.id} : {singleTeam.name}</h3>
              <p className="text-gray-600">Students:</p>
              {singleTeam.students.map(student => (
                <div key={student.id} className="ml-4">{student.name}</div>
              ))}
              <button onClick={() => handleDelete(singleTeam.id)}>Delete</button>
            </div>
          )
            :
            (<div className="grid gap-4">
              {teams && teams.map((team, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow border border-gray-200">
                  <h3 className="text-lg font-semibold">{team.id} : {team.name}</h3>
                  <p className="text-gray-600">Students:</p>
                  {team.students.map(student => (
                    <div key={student.id} className="ml-4">{student.name}</div>
                  ))}
                  <button className='p-4' onClick={() => handleDelete(team.id)}>Delete</button>
                </div>
              ))}
            </div>)
        }

      </div>
    </>
  )
}

export default Teams
