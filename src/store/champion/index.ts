import { createApi } from '@reduxjs/toolkit/query/react'
import baseQuery from '../../utils/base.query'
import { type MostVP, type HallOfFame } from '../../models/champions'

export const championApi = createApi({
	reducerPath: 'championApi',
	tagTypes: ['Champion'],
	baseQuery: baseQuery(),
	endpoints: builder => ({
		getMonthlyTopAchiever: builder.query<MostVP[], string>({
			query: category => ({
				url: '/v1/players/monthly-top-achiever',
				params: { category }
			}),
			transformResponse: result => (result as {data: MostVP[]}).data
		}),
		getHallOfFame: builder.query<HallOfFame[], void>({
			query: () => ({ url: '/v1/players/hall-of-fame' }),
			transformResponse: result => (result as {data: HallOfFame[]}).data
		}),
	})
})

export const {
	useGetMonthlyTopAchieverQuery,
	useGetHallOfFameQuery
} = championApi