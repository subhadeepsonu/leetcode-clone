import SignUpForm from "@/components/forms/signup_form";

export default function Register() {
    return <div className="w-full h-screen bg-black text-white  flex justify-center items-center">
        <div className="w-1/2 h-screen flex justify-center items-center">
            <img className="object-cover h-full" src="https://img.freepik.com/premium-photo/student-doing-coding-his-computer-setup_939033-14111.jpg"></img>
        </div>
        <div className="w-1/2 h-screen bg-zinc-900 flex justify-center items-center">
            <SignUpForm />
        </div>

    </div>
}