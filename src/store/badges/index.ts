import { type Badges, type BadgesQuery } from '../../models/badges'
import { baseApi } from '../../utils/base.api'

export const badgesApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		getBadgesWidget: builder.query<Badges[], BadgesQuery | undefined>({
			query: (params: BadgesQuery) => {
				const queryParam = params?.limit && params?.page ? `?limit=${params.limit}&page=${params.page}` : ''
				return ({ url: `/v1/users/${params.code}/badges${queryParam}` })
			},
			transformResponse: result => (result as {data: Badges[]}).data,
		}),
		getBadges: builder.query<Badges[], BadgesQuery | undefined>({
			query: (params: BadgesQuery) => {
				const queryParam = params?.page && params?.limit ? `?limit=${params.limit}&page=${params.page}` : ''
				return ({ url: `/v1/users/${params.code}/badges${queryParam}` })
			},
			transformResponse: result => (result as {data: Badges[]}).data,
			serializeQueryArgs: ({ endpointName }) => {
				return endpointName
			},
			merge: (currentCache, newItems, { arg }) => {
				if (arg?.page === 1) {
					return newItems
				}

				const updatedData = [
					...currentCache.filter(existingItem => !newItems.some(newItem => newItem.badge_code === existingItem.badge_code)),
					...newItems,
				]
				return updatedData
			},
			forceRefetch({ currentArg, previousArg }) {
				return currentArg !== previousArg
			},
		}),
		updateBadgeClaimed: builder.mutation<void, { badge_code: string, user_code: string }>({
			query: ({ badge_code, user_code }) => ({
				url: `/v1/users/${user_code}/badges/${badge_code}`,
				method: 'put',
				data: {
					is_claim: true
				},
			}),
			async onQueryStarted(patch, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					badgesApi.util.updateQueryData('getBadges', undefined, draft => {
						const indexOfPatch = draft.findIndex(item => item.badge_code === patch.badge_code)
						draft[indexOfPatch].is_claim = true
						
						return draft
					})
				)
				try {
					await queryFulfilled
				} catch {
					patchResult.undo()
				}
			},
		}),
	}),
	overrideExisting: false
})

export const {
	useGetBadgesWidgetQuery,
	useGetBadgesQuery,
	useLazyGetBadgesQuery,
	useUpdateBadgeClaimedMutation,
} = badgesApi