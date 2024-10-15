
import axiosInstance from "../../axoisInstance/axios";

const Login = async (data : {username: string ;password: string})=>{
     const response = await axiosInstance.post('/login', data)
    localStorage.setItem('token', response.data.token)
}

const Register = async (data : {username: string ;password: string})=>{
     await axiosInstance.post('/register', data)
    
}

const authService = {
    Login, Register
}

export default authService