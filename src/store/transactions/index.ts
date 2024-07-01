import { type PaginationNotificationType } from '../../models/notification'
import { type Transaction } from '../../models/transaction'
import { baseApi } from '../../utils/base.api'

interface TransactionResponse {
	data: Transaction[],
	pagination: PaginationNotificationType
}

export const transactionApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		getTransaction: builder.query<TransactionResponse, { usercode?: string, page?: number }>({
			query: ({ usercode, page }) => ({ url: `/v1/users/${usercode}/transactions?page=${page}` }),
			transformResponse: result => result as TransactionResponse,
			keepUnusedDataFor: 0,
			serializeQueryArgs: ({ endpointName }) => {
				return endpointName
			},
			merge: (currentCache, newItems, { arg }) => {
				if (arg.page === 1) {
					currentCache.data.splice(0, currentCache.data.length, ...newItems.data)
				} else {
					if (newItems.data.length) currentCache.data.push(...newItems.data)
				}
			},
			forceRefetch({ currentArg, previousArg }) {
				return currentArg !== previousArg
			},
		}),
	}),
	overrideExisting: false
})

export const {
	useGetTransactionQuery,
	useLazyGetTransactionQuery
} = transactionApi