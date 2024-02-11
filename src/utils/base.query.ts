import { type AxiosError, type AxiosRequestConfig } from 'axios'
import { type BaseQueryFn } from '@reduxjs/toolkit/query'
import { MMKV } from 'react-native-mmkv'

import instance from './instance'
import { BASE_URL } from '@env'

interface BaseQueryType {
  baseUrl: string
}

export const storage = new MMKV()

const baseQuery = ({ baseUrl }: BaseQueryType = { baseUrl: BASE_URL }):
BaseQueryFn<
  {
    url: string
    method?: 'get' | 'post' | 'delete' | 'patch'
    data?: AxiosRequestConfig['data']
    params?: AxiosRequestConfig['params']
    headers?: AxiosRequestConfig['headers'],
    isPrivate?: boolean
  },
  unknown,
  unknown
> =>
	async({ url, method = 'get', data, params, headers, isPrivate = true }) => {
		const isLoggedIn = storage.getBoolean('isLogin')
		try {
			const config = {
				url: baseUrl + url,
				method,
				data,
				params,
				headers
			}
			if (isPrivate && isLoggedIn) {
				config.headers = {
					...headers,
					Authorization: ''
				}
			}
			const result = await instance(config)
			return { data: result.data }
		} catch (axiosError) {
			const err = axiosError as AxiosError
			return {
				error: {
					status: err.response?.status,
					data: err.response?.data || err.message,
				},
			}
		}
	}

export default baseQuery