import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from './api'

function CreateStudent() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: ''
    })

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await api.post('/students/', {
                name: formData.name,
                email: formData.email,
                age: formData.age
            })
            if (response.status === 201) {
                navigate('/students')
            }
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Create Student</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
                <input
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="border p-2 rounded"
                />
                <input
                    type="text"
                    placeholder="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="border p-2 rounded"
                />
                <input
                    type="text"
                    placeholder="Age"
                    value={formData.age}
                    onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                    className="border p-2 rounded"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                    Create Student
                </button>
            </form>
        </div>
    )
}

export default CreateStudent
