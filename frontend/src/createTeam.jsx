import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from './api'

function CreateTeam() {
    const [formData, setFormData] = useState({
        name: '',
        students: []
    })
    const [availableStudents, setAvailableStudents] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await api.get('/students/names/')
                setAvailableStudents(response.data)
            } catch (error) {
                console.error(error.message)
            }
        }
        fetchStudents()
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await api.post('/teams/', {
                name: formData.name,
                students: formData.students
            })
            if (response.status === 201) {
                navigate('/teams')
            }
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Create Team</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
                <input
                    type="text"
                    placeholder="Team Name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="border p-2 rounded"
                    required
                />

                <select
                    name="students"
                    id="students"
                    multiple={true}
                    value={formData.students.map(String)}
                    onChange={(event) => {
                        const selected = Array.from(event.target.selectedOptions).map((option) => Number(option.value))
                        setFormData(prev => ({ ...prev, students: selected }))
                    }}
                >
                    {
                        availableStudents.map((student) => (
                            <option key={student.id} value={student.id}>{student.name}</option>
                        ))
                    }
                </select>

                <button
                    type="submit"
                    disabled={!formData.name.trim() || formData.students.length === 0}
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Create Team
                </button>
            </form>
        </div>
    )
}

export default CreateTeam
