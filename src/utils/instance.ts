import axios from 'axios'

const axiosInstance = axios.create()

axiosInstance.interceptors.request.use(
	config => {
		console.log('req', config)
		return config
	},
	async error => {
		console.log('req err', error)
		return await Promise.reject(error)
	}
)

axiosInstance.interceptors.response.use(
	response => {
		console.log('res', response)
		return response
	},
	async error => {
		console.log('res err', error)
		return await Promise.reject(error)
	}
)

export default axiosInstance