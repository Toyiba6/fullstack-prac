import Students from "./students.jsx"
import Teams from "./teams.jsx"
import CreateTeam from "./createTeam.jsx"
import Navbar from './navbar.jsx'
import CreateStudent from './createStudent.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/students' element={<Students />} />
        <Route path='/students/create' element={<CreateStudent />} />
        <Route path='/teams' element={<Teams />} />
        <Route path='/teams/create' element={<CreateTeam />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
