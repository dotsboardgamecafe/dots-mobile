import { createApi } from '@reduxjs/toolkit/query/react'
import baseQuery from '../../utils/base.query'
import { type MostVP, type HallOfFame, type MostVPParam } from '../../models/champions'

export const championApi = createApi({
	reducerPath: 'championApi',
	tagTypes: ['Champion'],
	baseQuery: baseQuery(),
	endpoints: builder => ({
		getMonthlyTopAchiever: builder.query<MostVP[], MostVPParam>({
			query: params => ({
				url: '/v1/players/monthly-top-achiever',
				params
			}),
			transformResponse: result => (result as {data: MostVP[]}).data
		}),
		getHallOfFame: builder.query<HallOfFame[], number>({
			query: year => ({
				url: '/v1/players/hall-of-fame',
				params: { year }
			}),
			transformResponse: result => (result as {data: HallOfFame[]}).data
		}),
	})
})

export const {
	useGetMonthlyTopAchieverQuery,
	useGetHallOfFameQuery
} = championApi