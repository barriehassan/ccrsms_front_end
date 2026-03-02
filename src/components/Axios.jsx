import axios from 'axios'


const baseUrl = 'https://fwkdn87g-8000.uks1.devtunnels.ms/'

const AxiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 30000,
    headers: {
        "Content-Type": "application/json",
        accept: "application/json",
    }
})

AxiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('Token')

        if (token) {
            config.headers.Authorization = `Token ${token}`
        }
        else {
            config.headers.Authorization = ``
        }
        return config;
    },
)

AxiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default AxiosInstance
