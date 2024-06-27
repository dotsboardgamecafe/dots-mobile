import { type PaginationNotificationType, type Notification } from '../../models/notification'
import { baseApi } from '../../utils/base.api'

interface NotificationResponse {
	data: Notification[],
	pagination: PaginationNotificationType
}

export const notificationsApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		getNotifications: builder.query<NotificationResponse, number | undefined>({
			query: page => ({ url: `/v1/notifications?page=${page}` }),
			transformResponse: result => (result as NotificationResponse),
			serializeQueryArgs: ({ endpointName }) => {
				return endpointName
			},
			merge: (currentCache, newItems) => {
				if (newItems.data.length) currentCache.data.push(...newItems.data)
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
						const indexOfPatch = draft.data.findIndex(item => item.notification_code === patch.notification_code)
						draft.data[indexOfPatch].status_read = true
						
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