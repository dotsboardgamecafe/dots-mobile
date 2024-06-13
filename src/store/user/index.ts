import { type UserProfile } from '../../models/user'
import { baseApi } from '../../utils/base.api'

export const userProfileApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		getUserProfile: builder.query<UserProfile, void | null>({
			query: () => ({ url: '/v1/users/profile' }),
			transformResponse: result => (result as {data: UserProfile}).data,
		}),
	}),
	overrideExisting: false
})

export const {
	useGetUserProfileQuery,
} = userProfileApi