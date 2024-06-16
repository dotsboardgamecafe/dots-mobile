import { type GameBoardCollection } from '../../models/game-board-collection'
import { baseApi } from '../../utils/base.api'

export const gameBoardCollectionApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		getGameBoardCollection: builder.query<GameBoardCollection[], string | undefined>({
			query: code => ({ url: `/v1/users/${code}/game-collection` }),
			transformResponse: result => (result as {data: GameBoardCollection[]}).data,
		}),
	}),
	overrideExisting: false
})

export const {
	useGetGameBoardCollectionQuery,
} = gameBoardCollectionApi