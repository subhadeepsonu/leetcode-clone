import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useParams } from "react-router-dom"

export default function QuestionById() {
    const params = useParams()
    const QueryQuestionByid = useQuery({
        queryKey: ['question', params.id],
        queryFn: async () => {
            const resposne = await axios.get(`http://localhost:3000/api/v1/question/${params.id}`)
            return resposne.data
        }
    })
    if (QueryQuestionByid.isLoading) {
        return <div className="w-full min-h-screen bg-black text-white flex-col flex justify-center items-center">
            Loading...</div>
    }
    if (QueryQuestionByid.isError) {
        return <div className="w-full min-h-screen bg-black text-white flex-col flex justify-center items-center">
            Error</div>
    }
    return <div className="w-full min-h-screen bg-black text-white flex-col flex justify-center items-center">
        <h1>{params.id}</h1>
        {JSON.stringify(QueryQuestionByid.data)}
    </div>
}