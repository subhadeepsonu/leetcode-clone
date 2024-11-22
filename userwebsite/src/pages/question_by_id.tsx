import { Editor } from "@monaco-editor/react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { AiOutlineLoading } from "react-icons/ai";
import Submissions from "../components/Submissions"
export default function QuestionById() {
    const params = useParams()
    const [code, SetCode] = useState<string>("")
    const [submit, setSubmit] = useState<any>()
    const [confirm, setConfirm] = useState(true)
    const [loading, setLoading] = useState(false)
    const [tab, setTab] = useState("question")
    const QueryQuestionByid = useQuery({
        queryKey: ['question', params.id],
        queryFn: async () => {
            const resposne = await axios.get(`http://localhost:3000/api/v1/question/${params.id}`, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
            return resposne.data
        }
    })

    const handleSubmit = async () => {
        setLoading(true)
        setSubmit("")
        const response = await axios.post("http://localhost:3000/api/v1/submission", {
            code: code,
            language: "63",
            questionId: params.id
        }, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }
        )
        console.log(response.data)
        console.log(confirm)
        while (confirm) {
            console.log("in while")
            await new Promise((resolve) => { setTimeout(resolve, 1000) })
            const data = await axios.get(`http://localhost:3000/api/v1/submission/${response.data.data}`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
            if (data.data.data.completed) {
                setConfirm(false)
                setSubmit(data.data.data)
                setLoading(false)
                break
            }
        }
        setConfirm(true)

    }
    if (QueryQuestionByid.isLoading) {
        return <div className="w-full min-h-screen bg-black text-white flex-col flex justify-center items-center">
            Loading...</div>
    }
    if (QueryQuestionByid.isError) {
        return <div className="w-full min-h-screen bg-black text-white flex-col flex justify-center items-center">
            Error</div>
    }
    return <div className="w-full h-screen bg-black text-white  flex justify-center items-center pt-16">
        <button disabled={loading} onClick={handleSubmit} className="bg-blue-500 disabled:hover:cursor-not-allowed disabled:bg-blue-200 hover:bg-blue-700 text-white fixed bottom-5 right-5 font-bold py-2 px-4 rounded">{loading ? <AiOutlineLoading className="animate-spin text-black" /> : "submit"}</button>
        <div className="w-2/5 h-full bg-cyan-200 text-black flex flex-col justify-center items-center">
            <div className="w-full h-[8%] border-b-2 border-black">
                <div className="w-full h-full flex justify-around items-center">
                    <button onClick={() => {
                        setTab("question")
                    }} className={` w-[48%] h-5/6 rounded-lg   ${(tab === "question") ? "bg-black text-white " : "hover:bg-gray-500 hover:text-white bg-white "} transition-all`}>Question</button>
                    <button onClick={() => {
                        setTab("submissions")
                    }} className={` w-[48%] h-5/6 p-2 rounded-lg   ${(tab === "submissions") ? "bg-black text-white" : "hover:bg-gray-500 hover:text-white bg-white "} transition-all`}>Submissions</button>
                </div>
            </div>
            {tab === "question" ? <div className="w-full flex justify-center items-center h-[92%]">
                {QueryQuestionByid.data.data.question}
            </div> : null}
            {tab === "submissions" ? <div className="w-full h-[92%]">
                <Submissions SetCode={SetCode} id={params.id!} />
            </div> : null}
        </div>
        <div className="w-3/5 h-full bg-green-50">
            <div className="h-2/3 w-full">
                <Editor value={code} onChange={(e) => {
                    SetCode(e!)
                }} defaultLanguage="javascript" theme={"vs-dark"} />
            </div>
            <div className="h-1/3 w-full bg-black">
                {submit ? <div>
                    <h1>Passed Cases: {submit.passedcases}</h1>
                    <h1>Failed Cases: {submit.failedcases}</h1>
                    <h1>Total Cases: {submit.totalcases}</h1>
                    <h1>Correct: {submit.correct ? "true" : "false"}</h1>

                </div> : <div></div>}
            </div>
        </div>
    </div>
}