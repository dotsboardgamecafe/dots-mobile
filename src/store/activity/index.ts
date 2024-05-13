import { createApi } from '@reduxjs/toolkit/query/react'
import baseQuery from '../../utils/base.query'
import { type PointActivity, type Activity } from '../../models/activity'

export const activityApi = createApi({
	reducerPath: 'activityApi',
	tagTypes: ['Activity'],
	baseQuery: baseQuery(),
	endpoints: builder => ({
		getActivitiesHiglight: builder.query<Activity[], string | undefined>({
			query: (user_code?:string) => ({ url: `/v1/users/${user_code}/activity` }),
			transformResponse: result => (result as {data: Activity[]})?.data,
		}),
		getPointActivity: builder.query<PointActivity[], string | undefined>({
			query: (user_code?:string) => ({ url: `/v1/users/${user_code}/point-activity` }),
			transformResponse: result => (result as {data: PointActivity[]})?.data,
		}),
	})
})

export const {
	useGetActivitiesHiglightQuery,
	useGetPointActivityQuery
} = activityApi