import { createApi } from '@reduxjs/toolkit/query/react'
import baseQuery from '../../utils/base.query'
import { type Badges, type BadgesQuery } from '../../models/badges'

export const badgesApi = createApi({
	reducerPath: 'badgesApi',
	tagTypes: ['BadgesApi'],
	baseQuery: baseQuery(),
	endpoints: builder => ({
		getBadges: builder.query<Badges[], BadgesQuery>({
			query: (params: BadgesQuery) =>
				({ url: `/v1/users/${params.code}/badges?limit=${params.limit}&page=${params.page}` }),
			transformResponse: result => (result as {data: Badges[]}).data,
		}),
	})
})

export const {
	useGetBadgesQuery,
} = badgesApi