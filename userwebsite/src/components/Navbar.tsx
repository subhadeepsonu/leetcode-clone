import { useLocation, useNavigate } from "react-router-dom"

export default function Navbar() {
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    const location = useLocation()
    if (location.pathname === "/login" || location.pathname === "/register") {
        return null
    }
    return <div className="w-full bg-zinc-800  text-white  flex justify-between items-center h-14 fixed top-0 left-0 px-6">
        <div onClick={() => {
            navigate("/")
        }} className="text-2xl hover:cursor-pointer font-semibold">MeetCode</div>
        <div>
            {token ? <button className="bg-white text-black h-8 rounded-lg font-semibold w-20" onClick={() => {
                localStorage.removeItem("token")
                navigate("/login")
            }}>Logout</button> : <button onClick={() => navigate("/login")}>Login</button>}
        </div>
    </div>
}