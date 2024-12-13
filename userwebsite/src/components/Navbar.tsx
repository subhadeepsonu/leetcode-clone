import { useLocation, useNavigate } from "react-router-dom"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

export default function Navbar() {
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    const location = useLocation()
    if (location.pathname === "/login" || location.pathname === "/register") {
        return null
    }
    return <div className="w-full bg-neutral-950   text-white  flex justify-between items-center h-16 border-b-2 border-neutral-950 fixed top-0 left-0 px-6">
        <div onClick={() => {
            navigate("/")
        }} className="text-2xl hover:cursor-pointer font-semibold">MeetCode</div>
        <div>
            {token ? <DropdownMenu>
                <DropdownMenuTrigger><Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-fit">
                    <DropdownMenuItem onClick={() => {
                        navigate("/profile")
                    }} className="flex justify-center items-center hover:cursor-pointer">Profile</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {
                        localStorage.removeItem("token")
                        navigate("/login")
                    }} className="flex bg-red-500 text-white focus:text-white hover:cursor-pointer focus:bg-red-600  justify-center items-center">
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu> : <button onClick={() => navigate("/login")}>Login</button>}
        </div>
    </div>
}