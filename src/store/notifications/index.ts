import { type PaginationNotificationType, type Notification } from '../../models/notification'
import { baseApi } from '../../utils/base.api'

export const notificationsApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		getNotifications: builder.query<Notification[], number | undefined>({
			query: page => ({ url: `/v1/notifications?page=${page}` }),
			transformResponse: result => (result as {data: Notification[]})?.data,
			serializeQueryArgs: ({ endpointName }) => {
				return endpointName
			},
			merge: (currentCache, newItems) => {
				if (newItems.length) currentCache.push(...newItems)
			},
			forceRefetch({ currentArg, previousArg }) {
				return currentArg !== previousArg
			},
		}),
		getBadgeCountNotification: builder.query<PaginationNotificationType, void>({
			query: () => ({ url: '/v1/notifications' }),
			transformResponse: result => (result as {pagination: PaginationNotificationType})?.pagination,
		}),
		updateSeenNotification: builder.mutation<void, Pick<Notification, 'notification_code'> & Partial<Notification>>({
			query: ({ notification_code }) => ({
				url: `/v1/notifications/${notification_code}`,
				method: 'put',
				data: {
					is_seen: true
				},
			}),
			async onQueryStarted(patch, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					notificationsApi.util.updateQueryData('getNotifications', undefined, draft => {
						const indexOfPatch = draft.findIndex(item => item.notification_code === patch.notification_code)
						draft[indexOfPatch].status_read = true
						
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
	useGetNotificationsQuery,
	useLazyGetNotificationsQuery,
	useUpdateSeenNotificationMutation,
	useGetBadgeCountNotificationQuery
} = notificationsApi