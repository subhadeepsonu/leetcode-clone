import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "sonner"
import { AiOutlineLoading } from "react-icons/ai"

const FormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    username: z.string().min(6)
})

export default function SignUpForm() {
    const navigate = useNavigate()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        mode: "onBlur"
    })
    const MuatateSignup = useMutation({
        mutationFn: async () => {
            const response = await axios.post("http://localhost:3000/api/v1/user/register", {
                email: form.getValues('email'),
                password: form.getValues('password'),
                username: form.getValues('username')
            })
            return response.data
        },
        onSettled: (data) => {
            if (data.success) {
                localStorage.setItem("token", data.data)
                toast.success("Registration successfull")
                navigate("/questions")
            }
            else {
                toast.error(data.message)
            }
        }
    })


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(() => MuatateSignup.mutate()
            )} className="w-96 space-y-6">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="jhon doe" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>email</FormLabel>
                            <FormControl>
                                <Input placeholder="jhondoe@gmail.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="not sure" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">{MuatateSignup.isPending ? <AiOutlineLoading className="animate-spin text-black" /> : "Register"}</Button>
                <Link to="/login" className=" block hover:underline">Already have an account! Login</Link>
            </form>
        </Form>
    )
}
