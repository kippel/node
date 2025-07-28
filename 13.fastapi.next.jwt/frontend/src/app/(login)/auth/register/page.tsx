"use client"
import { useForm } from "react-hook-form"
import axios from "axios";

import { useRouter } from "next/navigation";
import Link from "next/link";
import ButtonLogin from "../button-login"
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'


type Inputs = {
    name: string,
    password: string,
    confirmPassword: string
}

function RegisterPage() {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const router = useRouter();
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    //const [message, setMessage] =
    const onSubmit = handleSubmit(async (data) => {
        //console.log(data)
        const resh = await axios.post(`${backendUrl}/api/auth/register`, data);
        //console.log(resh)
        //console.log('red')
        if (resh?.statusText) return router.push("/auth/login")


    })



    return (
        <div className="flex min-h-screen items-center justify-center">
            <ButtonLogin>
                <Link href="/auth/login">Login</Link>
            </ButtonLogin>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-xl">Iniciar sesión</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit} className="space-y-4">
                        <h1 className="text-slate-200 font-black text-4xl mb-4">
                            Register
                        </h1>
                        <label htmlFor="name" className="text-slate-400 mb-2 block text-lg">
                            Username
                        </label>
                        <input type="text"
                            {...register("name", {
                                required: {
                                    value: true,
                                    message: 'Username is required'
                                }
                            })}
                            className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full" />
                        {
                            errors.name && (
                                <span className="text-red-300">{errors.name.message}</span>
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
                        <input type="password" {...register("confirmPassword", {
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
                </CardContent>
            </Card>

        </div>
    )
}

export default RegisterPage;