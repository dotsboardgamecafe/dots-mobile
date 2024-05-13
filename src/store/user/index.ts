import { createApi } from '@reduxjs/toolkit/query/react'
import baseQuery from '../../utils/base.query'
import { type UserProfile } from '../../models/user'

export const userProfileApi = createApi({
	reducerPath: 'userProfileApi',
	tagTypes: ['UserProfile'],
	baseQuery: baseQuery(),
	endpoints: builder => ({
		getUserProfile: builder.query<UserProfile, void | null>({
			query: () => ({ url: '/v1/users/profile' }),
			transformResponse: result => (result as {data: UserProfile}).data,
		}),
	})
})

export const {
	useGetUserProfileQuery,
} = userProfileApi