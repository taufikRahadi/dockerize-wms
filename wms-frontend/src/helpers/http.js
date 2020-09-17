import axios from 'axios'

const baseUrl = process.env.VUE_APP_API_URL

const instance = axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token") 
    }
})

instance.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        Promise.reject(error)
    }
)

instance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error) 
)

export default instance
