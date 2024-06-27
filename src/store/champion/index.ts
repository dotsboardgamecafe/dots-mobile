import { type MostVP, type HallOfFame, type MostVPParam } from '../../models/champions'
import { baseApi } from '../../utils/base.api'

export const championApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		getMonthlyTopAchiever: builder.query<MostVP[], MostVPParam>({
			query: params => ({
				url: '/v1/players/monthly-top-achiever',
				params
			}),
			transformResponse: result => (result as {data: MostVP[]}).data
		}),
		getHallOfFame: builder.query<HallOfFame[], string>({
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