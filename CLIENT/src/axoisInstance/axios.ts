import axios from "axios";


const localhost = 'http://localhost:3000'
// const api = 'https://nasa.fitramelaniarais.my.id'

const axiosInstance = axios.create({
    baseURL: localhost
})

export default axiosInstance