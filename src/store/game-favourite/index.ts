import { createApi } from '@reduxjs/toolkit/query/react'
import baseQuery from '../../utils/base.query'
import { type GameFavourite } from '../../models/game-favourite'

export const gameFavouriteApi = createApi({
	reducerPath: 'gameFavouriteApi',
	tagTypes: ['GameFavourite'],
	baseQuery: baseQuery(),
	endpoints: builder => ({
		getGameFavourite: builder.query<GameFavourite[], string | undefined>({
			query: code => ({ url: `/v1/users/${code}/favourite-games` }),
			transformResponse: result => (result as {data: GameFavourite[]}).data,
		}),
	})
})

export const {
	useGetGameFavouriteQuery,
} = gameFavouriteApi