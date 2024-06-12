import { createApi } from '@reduxjs/toolkit/query/react'
import baseQuery from '../../utils/base.query'
import { type PaginationNotificationType, type Notification } from '../../models/notification'

export const notificationsApi = createApi({
	reducerPath: 'notificationApi',
	tagTypes: ['Notification'],
	baseQuery: baseQuery(),
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
				body: {
					is_seen: true
				},
			}),
			async onQueryStarted({ notification_code, ...patch }, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					notificationsApi.util.updateQueryData('getNotifications', undefined, draft => {
						console.log({
							draft, patch
						})
					})
				)
				try {
					await queryFulfilled
				} catch {
					patchResult.undo()
				}
			},
		}),
	})
})

export const {
	useGetNotificationsQuery,
	useLazyGetNotificationsQuery,
	useUpdateSeenNotificationMutation,
	useGetBadgeCountNotificationQuery
} = notificationsApi