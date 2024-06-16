import { type UserProfile } from '../../models/user'
import { baseApi } from '../../utils/base.api'

export const userProfileApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		getUserProfile: builder.query<UserProfile, void | null>({
			query: () => ({ url: '/v1/users/profile' }),
			transformResponse: result => (result as {data: UserProfile}).data,
		}),
		updateProfile: builder.mutation<void, Partial<UserProfile>>({
			query: profile => ({
				url: '/v1/users/profile',
				method: 'put',
				data: {
					fullname: profile.fullname,
					phone_number: profile.phone_number,
					image_url: profile.image_url
				},
			}),
			async onQueryStarted(patch, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					userProfileApi.util.updateQueryData('getUserProfile', undefined, draft => {
						draft.fullname = patch.fullname ?? ''
						draft.phone_number = patch.phone_number ?? ''
						draft.image_url = patch.image_url ?? ''
						
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
		updatePassword: builder.mutation<unknown, {currentPassword: string, newPassword: string, confirmPassword: string}>({
			query: data => {
				const payload = {
					old_password: data.currentPassword,
					new_password: data.newPassword,
					confirm_password: data.confirmPassword
				}
				return {
					method: 'put',
					url: '/v1/users/update-password',
					isPrivate: true,
					data: payload
				}
			}
		}),
		updateEmail: builder.mutation<void, string>({
			query: email => ({
				method: 'post',
				url: '/v1/users/profile/new-email',
				isPrivate: true,
				data: {
					email,
					type: 'update_email'
				}
			})
		}),
		deleteAccount: builder.mutation<void, string | undefined>({
			query: code => ({
				url: `/v1/users/${code}`,
				method: 'delete',
			}),
		}),
	}),
	overrideExisting: false
})

export const {
	useGetUserProfileQuery,
	useUpdateProfileMutation,
	useUpdatePasswordMutation,
	useUpdateEmailMutation,
	useDeleteAccountMutation
} = userProfileApi