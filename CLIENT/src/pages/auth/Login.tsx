import {  useNavigate } from "react-router-dom";
import authService from "./authService";
import { useForm } from "react-hook-form";

interface LoginFormInput{
    username:string;
    password:string;
}
const Login = ()=>{

    const { register, handleSubmit } = useForm<LoginFormInput>();

    const nav = useNavigate()

    const onSubmit = async (data: LoginFormInput)=>{
        try {
            await authService.Login(data)
            nav('/home')
        } catch (error) {
            
        }

    }

    return (
        <>
        Login
        <form onSubmit={handleSubmit(onSubmit)} >
            <input {...register('username')} type="text" placeholder="username" required />
            <input {...register('password')} type="password" placeholder="password" required />
            <button type="submit">Login</button>
        </form>
        </>
    )
}
export default Login