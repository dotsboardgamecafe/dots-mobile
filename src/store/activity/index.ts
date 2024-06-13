import { type PointActivity, type Activity } from '../../models/activity'
import { baseApi } from '../../utils/base.api'

export const activityApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		getActivitiesHiglight: builder.query<Activity[], string | undefined>({
			query: (user_code?:string) => ({ url: `/v1/users/${user_code}/activity` }),
			transformResponse: result => (result as {data: Activity[]})?.data,
		}),
		getPointActivity: builder.query<PointActivity[], string | undefined>({
			query: (user_code?:string) => ({ url: `/v1/users/${user_code}/point-activity` }),
			transformResponse: result => (result as {data: PointActivity[]})?.data,
		}),
	}),
	overrideExisting: false
})

export const {
	useGetActivitiesHiglightQuery,
	useGetPointActivityQuery
} = activityApi