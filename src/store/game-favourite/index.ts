import { type GameFavourite } from '../../models/game-favourite'
import { baseApi } from '../../utils/base.api'

export const gameFavouriteApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		getGameFavourite: builder.query<GameFavourite[], string | undefined>({
			query: code => ({ url: `/v1/users/${code}/favourite-games?limit=3` }),
			transformResponse: result => (result as {data: GameFavourite[]}).data,
		}),
	}),
	overrideExisting: false
})

export const {
	useGetGameFavouriteQuery,
} = gameFavouriteApi