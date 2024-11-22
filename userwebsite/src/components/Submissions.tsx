import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export default function Submissions(props: {
    id: string,
    SetCode: any
}) {
    const QuerySubmissions = useQuery({
        queryKey: ['submissions', props.id],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:3000/api/v1/submission?id=${props.id}`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
            return response.data
        }
    })
    if (QuerySubmissions.isLoading) {
        return <div className="w-full h-full flex-col flex justify-center items-center">
            Loading...
        </div>
    }
    if (QuerySubmissions.isError) {
        return <div className="w-full h-full flex-col flex justify-center items-center">
            Error...
        </div>
    }
    return <div className="w-full h-full flex-col flex justify-center items-center overflow-y-auto ">
        {QuerySubmissions.data.data.map((submission: any) => {
            return <div onClick={() => {
                props.SetCode(submission.code)
            }} key={submission.id} className="w-full flex justify-center items-center p-2 hover:cursor-pointer">
                {(submission.passedcases === submission.totalcases) ? "Accepted" : "Not Accepted"}
            </div>
        })}
    </div>
}