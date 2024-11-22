import { useLocation, useNavigate } from "react-router-dom"

export default function Navbar() {
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    const location = useLocation()
    if (location.pathname === "/login" || location.pathname === "/register") {
        return null
    }
    return <div className="w-full bg-black text-white flex justify-between items-center h-16 fixed top-0 left-0">
        <div className="text-xl">UserWebsite</div>
        <div>
            {token ? <button onClick={() => {
                localStorage.removeItem("token")
                navigate("/login")
            }}>Logout</button> : <button onClick={() => navigate("/login")}>Login</button>}
        </div>
    </div>
}