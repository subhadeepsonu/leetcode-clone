import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function QuestionCard(props: {
    question: string,
    id: string,
    num: number,
    difficulty: string
}) {
    const navigate = useNavigate()
    const [color, setColor] = useState("bg-zinc-800")
    useEffect(() => {
        if (props.num % 2 === 0) {
            setColor("bg-zinc-800")
        } else {
            setColor("bg-zinc-700")
        }
    }, [props.num])
    return <div onClick={() => {
        navigate(`/questions/${props.id}`)
    }} className={`border-b-2 border-zinc-800 h-10 flex justify-between px-3 items-center hover:cursor-pointer w-3/4 ${color}`} >
        <p>{props.num}</p>
        <h1>{props.question}</h1>
        <p>{props.difficulty}</p>
    </div>
}