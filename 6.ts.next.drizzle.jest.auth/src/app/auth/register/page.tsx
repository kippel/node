"use client"
import { useForm } from "react-hook-form"
import axios from "axios";

function RegisterPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = handleSubmit(async (data) => {
        //console.log(data)
        await axios.post('/api/auth/register', data);

    })

    console.log(errors)

    return (
        <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
            <form onSubmit={onSubmit} className="w-1/4">
                <h1 className="text-slate-200 font-black text-4xl mb-4">
                    Register
                </h1>
                <label htmlFor="username" className="text-slate-400 mb-2 block text-lg">
                    Username
                </label>
                <input type="text"
                    {...register("username", {
                        required: {
                            value: true,
                            message: 'Username is required'
                        }
                    })}
                    className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full" />
                {
                    errors.username && (
                        <span className="text-red-300">{errors.username.message}</span>
                    )
                }
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
                <label htmlFor="confirmPassword" className="text-slate-400 mb-2 block text-lg">
                    Confirm Password
                </label>
                <input type="confirmPassword" {...register("confirmPassword", {
                    required: {
                            value: true,
                            message: 'Confirm Password is required'
                        }
                })} className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full" />
                {
                    errors.confirmPassword && (
                        <span className="text-red-300">{errors.confirmPassword.message}</span>
                    )
                }
                <button className="w-full bg-blue-500 text-white p-3 rounded-lg mt-2 ">Register</button>
            </form>
        </div>
    )
}

export default RegisterPage;