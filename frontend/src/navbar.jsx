import { Link } from "react-router-dom"

function Navbar() {
    return (
        <nav className="flex gap-8 items-center p-4 bg-gray-800 text-white">
            <Link to='/students'>
                Students
            </Link>

            <Link to='/teams'>
                Team
            </Link>
        </nav>
    )
}

export default Navbar
