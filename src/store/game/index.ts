import { createApi } from '@reduxjs/toolkit/query/react'
import baseQuery from '../../utils/base.query'
import { type GameListParams, type Games } from '../../models/games'

export const gameApi = createApi({
	reducerPath: 'gameApi',
	baseQuery: baseQuery(),
	endpoints: builder => ({
		getListGame: builder.query<Games[], GameListParams>({
			query: params => ({ url: '/v1/games', params }),
			transformResponse: result => (result as {data: Games[]}).data
		}),
		getDetailGame: builder.query<Games, string>({
			query: id => ({ url: `/v1/games/${id}` }),
			transformResponse: result => (result as {data: Games}).data
		}),
	})
})

export const {
	useGetListGameQuery,
	useGetDetailGameQuery,
} = gameApi