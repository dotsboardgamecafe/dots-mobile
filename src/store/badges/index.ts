import { type Badges, type BadgesQuery } from '../../models/badges'
import { baseApi } from '../../utils/base.api'

export const badgesApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		getBadges: builder.query<Badges[], BadgesQuery | undefined>({
			query: (params: BadgesQuery) => {
				const queryParam = params?.limit && params?.page ? `?limit=${params.limit}&page=${params.page}` : ''
				return ({ url: `/v1/users/${params.code}/badges${queryParam}` })
			},
			transformResponse: result => (result as {data: Badges[]}).data,
		}),
	}),
	overrideExisting: false
})

export const {
	useGetBadgesQuery,
} = badgesApi