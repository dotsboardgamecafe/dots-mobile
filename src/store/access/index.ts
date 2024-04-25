import { createApi } from '@reduxjs/toolkit/query/react'
import baseQuery from '../../utils/base.query'
import { type Profile } from '../../models/profile'

export const accessApi = createApi({
	reducerPath: 'accessApi',
	baseQuery: baseQuery(),
	endpoints: builder => ({
		postLogin: builder.mutation<Profile, {email: string, password: string}>({
			query: data => ({
				method: 'post',
				url: '/v1/auths/login',
				headers: { 'X-Actor-Type': 'user' },
				data
			}),
			transformResponse: result => (result as {data: Profile}).data
		}),
	})
})

export const {
	usePostLoginMutation
} = accessApi