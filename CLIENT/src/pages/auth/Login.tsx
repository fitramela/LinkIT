import {  Link, useNavigate } from "react-router-dom";
import authService from "./authService";
import { useForm } from "react-hook-form";
import { useState } from "react";

interface LoginFormInput{
    username:string;
    password:string;
}
const Login = ()=>{

    const { register, handleSubmit } = useForm<LoginFormInput>();
    const [error, setError] = useState<string>('');

    const nav = useNavigate()

    const onSubmit = async (data: LoginFormInput)=>{
        try {
            await authService.Login(data)
            nav('/')
        } catch (error) {
            console.log(error)
            setError((error as any)?.response?.data.message as string)
        }

    }

    return (
        <>
        <div className="flex items-center justify-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold">Login</h2>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
                    <input {...register('username')} placeholder="Username" required className="block w-full px-4 py-2 mb-3 text-xl text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <input {...register('password')} type="password" placeholder="Password" required className="block w-full px-4 py-2 text-xl text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">Login</button>
                </form>
                <Link to={'/register'} className="text-blue-500 hover:underline flex my-3"> Dont have an account?</Link>
            </div>
        </div>
        </>
    )
}
export default Login