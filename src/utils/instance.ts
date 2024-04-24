import axios from 'axios'

const axiosInstance = axios.create()

axiosInstance.interceptors.request.use(
	config => {
		console.log('req', config)
		return config
	},
	async error => {

		return await Promise.reject(error)
	}
)

axiosInstance.interceptors.response.use(
	response => {
		
		return response
	},
	async error => {
    
		return await Promise.reject(error)
	}
)

export default axiosInstance