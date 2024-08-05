import { type GameListParams, type Games } from '../../models/games'
import { baseApi } from '../../utils/base.api'

export const gameApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		getListGame: builder.query<Games[], GameListParams>({
			query: params => ({ url: '/v1/games', params }),
			transformResponse: result => (result as {data: Games[]}).data
		}),
		getGames: builder.query<Games[], GameListParams>({
			query: params => ({ url: '/v1/games', params }),
			transformResponse: result => (result as {data: Games[]}).data,
			serializeQueryArgs: ({ endpointName }) => endpointName,
			merge: (currentCache, newItems, { arg }) => {
				if (arg?.page === 1) {
					return newItems
				}

				return [
					...currentCache.filter(existingItem => !newItems.some(newItem => newItem.game_code === existingItem.game_code)),
					...newItems,
				]
			},
			forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg,
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
	useLazyGetGamesQuery
} = gameApi