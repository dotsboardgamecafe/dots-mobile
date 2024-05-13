import { createApi } from '@reduxjs/toolkit/query/react'
import baseQuery from '../../utils/base.query'
import { type GameBoardCollection } from '../../models/game-board-collection'

export const gameBoardCollectionApi = createApi({
	reducerPath: 'gameBoardCollectionApi',
	tagTypes: ['GameBoardCollection'],
	baseQuery: baseQuery(),
	endpoints: builder => ({
		getGameBoardCollection: builder.query<GameBoardCollection[], string | undefined>({
			query: code => ({ url: `/v1/users/${code}/game-collection` }),
			transformResponse: result => (result as {data: GameBoardCollection[]}).data,
		}),
	})
})

export const {
	useGetGameBoardCollectionQuery,
} = gameBoardCollectionApi