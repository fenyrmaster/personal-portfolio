import axios from "axios";

const clienteAxios = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_DOMAIN_API}/api`,
    withCredentials: true
})

export default clienteAxios;