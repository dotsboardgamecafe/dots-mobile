import { type Transaction } from '../../models/transaction'
import { baseApi } from '../../utils/base.api'

export const transactionApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		getTransaction: builder.query<Transaction[], string | undefined>({
			query: usercode => ({ url: `/v1/users/${usercode}/transactions` }),
			transformResponse: result => (result as {data: Transaction[]})?.data,
			keepUnusedDataFor: 0,
		}),
	}),
	overrideExisting: false
})

export const {
	useGetTransactionQuery,
} = transactionApi