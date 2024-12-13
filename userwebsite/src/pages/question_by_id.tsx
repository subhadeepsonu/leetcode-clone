import { Editor } from "@monaco-editor/react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { AiOutlineLoading } from "react-icons/ai";
import Submissions from "../components/Submissions"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
export default function QuestionById() {
    const params = useParams()
    const [code, SetCode] = useState<string>("//write function and console log the function")
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
    return <div className="w-full h-screen bg-zinc-900 text-white  flex justify-center items-center pt-16   ">
        <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={40}>
                <div className=" h-full  text-black flex flex-col justify-center items-center">
                    <div className="w-full h-[8%] border-b-2 border-black bg-gray-700">
                        <div className="w-full h-full flex justify-around items-center">
                            <button onClick={() => {
                                setTab("question")
                            }} className={` w-[48%] h-5/6 rounded-lg   ${(tab === "question") ? "bg-gray-200  " : "hover:bg-zinc-500 text-white bg-zinc-900 "} transition-all`}>Question</button>
                            <button onClick={() => {
                                setTab("submissions")
                            }} className={` w-[48%] h-5/6 p-2 rounded-lg   ${(tab === "submissions") ? "bg-gray-200 " : "hover:bg-zinc-500 text-white bg-zinc-900 "} transition-all`}>Submissions</button>
                        </div>
                    </div>
                    {tab === "question" ? <div className="w-full flex space-y-4 flex-col justify-start text-white items-start h-[92%] px-5">
                        <div>
                            <p className="text-2xl font-bold pt-5">{QueryQuestionByid.data.data.question}</p>
                            <p className="text-gray-200" >{QueryQuestionByid.data.data.description}</p>
                        </div>
                        <div>
                            <p className="text-xl font-semibold">Example 1</p>
                            <p className="text-gray-200">Input: {QueryQuestionByid.data.data.sampleInput1}</p>
                            <p className="text-gray-200">Output: {QueryQuestionByid.data.data.sampleOutput1}</p>
                        </div>
                        <div>
                            <p className="text-xl font-semibold">Example 2</p>
                            <p className="text-gray-200">Input: {QueryQuestionByid.data.data.sampleInput2}</p>
                            <p className="text-gray-200">Output: {QueryQuestionByid.data.data.sampleOutput2}</p>
                        </div>

                    </div> : null}
                    {tab === "submissions" ? <div className="w-full h-[92%]">
                        <Submissions SetCode={SetCode} id={params.id!} />
                    </div> : null}
                </div>
            </ResizablePanel>
            <ResizableHandle className="border-2 px-[2px] bg-black" withHandle />
            <ResizablePanel defaultSize={60}>
                <ResizablePanelGroup direction="vertical">
                    <ResizablePanel defaultSize={70}>
                        <div className="h-full w-full">
                            <Editor value={code} onChange={(e) => {
                                SetCode(e!)
                            }} defaultLanguage="javascript" theme={"vs-dark"} />
                        </div>
                    </ResizablePanel>
                    <ResizableHandle className="border-2 py-[2px] bg-black" withHandle />
                    <ResizablePanel defaultSize={30}>
                        <div className="h-full w-full flex justify-start items-center bg-zinc-900 px-5">
                            {submit ? <div className="flex flex-col  justify-between h-full py-5 items-start">
                                <h1>Correct : {submit.passedcases} ✅</h1>
                                <h1>Incorrect : {submit.failedcases} ❌</h1>
                                <h1>Total: {submit.totalcases}</h1>
                                <h1>Correct: {submit.correct ? "true" : "false"}</h1>
                            </div> : <div></div>}
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </ResizablePanel>
        </ResizablePanelGroup>
        <button disabled={loading} onClick={handleSubmit} className="bg-green-500 disabled:hover:cursor-not-allowed disabled:bg-green-200 hover:bg-green-700 text-white fixed bottom-5 right-5 font-bold py-2 px-4 rounded">{loading ? <AiOutlineLoading className="animate-spin text-black" /> : "submit"}</button>


    </div>
}