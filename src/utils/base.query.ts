import { type AxiosError, type AxiosRequestConfig } from 'axios'
import { type BaseQueryFn } from '@reduxjs/toolkit/query'
import { MMKV } from 'react-native-mmkv'

import instance from './instance'
import { BASE_URL } from '@env'
import { EnumLogin } from '../hooks/useStorage'

interface BaseQueryType {
  baseUrl: string
}

export const storage = new MMKV()

const baseQuery = ({ baseUrl }: BaseQueryType = { baseUrl: BASE_URL }):
BaseQueryFn<
  {
    url: string
    method?: 'get' | 'post' | 'delete' | 'patch' | 'put'
    data?: AxiosRequestConfig['data']
    params?: AxiosRequestConfig['params']
    headers?: AxiosRequestConfig['headers'],
    isPrivate?: boolean
  },
  unknown,
  unknown
> =>
	async({ url, method = 'get', data, params, headers, isPrivate = true }) => {
		const isLoggedIn = storage.getNumber('loginType') === EnumLogin.IS_LOGGED_IN
		try {
			const config = {
				url: baseUrl + url,
				method,
				data,
				params,
				headers
			}
			if (isPrivate || isLoggedIn) {
				config.headers = {
					...headers,
					Authorization: storage.getString('token')
				}
			}
			const result = await instance(config)
			return { data: result.data }
		} catch (axiosError) {
			const err = axiosError as AxiosError
			const msg = (err.response?.data as {stat_msg: string}).stat_msg
			return {
				error: {
					status: err.response?.status,
					data: msg || err.message,
				},
			}
		}
	}

export default baseQuery