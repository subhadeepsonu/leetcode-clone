import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import QuestionCard from "../components/QuestionCard"

export default function Question() {
    const queryQuestions = useQuery({
        queryKey: ['questions'],
        queryFn: async () => {
            const resposne = await axios.get('http://localhost:3000/api/v1/question', {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
            return resposne.data
        }
    })
    if (queryQuestions.isLoading) {
        return <div className="w-full min-h-screen bg-black text-white flex-col flex justify-center items-center">
            Loading...</div>
    }
    if (queryQuestions.isError) {
        return <div className="w-full min-h-screen bg-black text-white flex-col flex justify-center items-center">
            Error</div>
    }
    if (queryQuestions.data) {
        return <div className="w-full min-h-screen bg-black text-white flex-col flex justify-start gap-5 pt-20 items-center">

            {queryQuestions.data.data.map((question: any) => {
                return <QuestionCard id={question.id} key={question.id} question={question.question} />
            })}

        </div>
    }

}