import { useNavigate } from "react-router-dom"

export default function QuestionCard(props: {
    question: string,
    id: number
}) {
    const navigate = useNavigate()
    return <div onClick={() => {
        navigate(`/questions/${props.id}`)
    }} className="bg-red-700 hover:cursor-pointer ">
        <h1>{props.question}</h1>
    </div>
}