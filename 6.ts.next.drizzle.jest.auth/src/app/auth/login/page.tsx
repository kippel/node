"use client"
import { useForm } from "react-hook-form"

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Inputs = {
    email: string,
    password: string,

}

function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const [error, setError] = useState("");
    const router = useRouter();
    //const [message, setMessage] =
    const onSubmit = handleSubmit(async (data) => {
        //console.log(data)
        const res = await signIn("credentials",{
            email: data.email,
            password: data.password,
            redirect: false
        })

        if (res?.error) return setError(res.error as string)

        if (res?.ok) return router.push("/dashboard")
        
    })

    console.log(errors)

    return (
        <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
            <form onSubmit={onSubmit} className="w-1/4">
                <h1 className="text-slate-200 font-black text-4xl mb-4">
                    Register
                </h1>
                { error && <div className="bg-red-500 text-white p-2 mb-2">{error}</div>}
                
                <label htmlFor="email" className="text-slate-400 mb-2 block text-lg">
                    Email
                </label>
                <input type="email"
                    {...register("email", {
                        required: {
                            value: true,
                            message: 'Email is required'
                        }
                    })}
                    className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full" />
                 {
                    errors.email && (
                        <span className="text-red-300">{errors.email.message}</span>
                    )
                }
                
                <label htmlFor="password" className="text-slate-400 mb-2 block text-lg">
                    Password
                </label>
                <input type="password" {...register("password", {
                    required: {
                            value: true,
                            message: 'Password is required'
                        }
                })} className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full" />
                {
                    errors.password && (
                        <span className="text-red-300">{errors.password.message}</span>
                    )
                }
                
                <button className="w-full bg-blue-500 text-white p-3 rounded-lg mt-2 ">Register</button>
            </form>
        </div>
    )
}

export default LoginPage;