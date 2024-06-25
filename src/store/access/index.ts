import { type RegisterParam, type Profile, type User } from '../../models/profile'
import { baseApi } from '../../utils/base.api'

export const accessApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		postLogin: builder.mutation<Profile, {email: string, password: string}>({
			query: data => ({
				method: 'post',
				url: '/v1/auths/login',
				headers: { 'X-Actor-Type': 'user' },
				isPrivate: false,
				data
			}),
			transformResponse: (result: {data: Profile}) => result.data
		}),
		postRegister: builder.mutation<unknown, RegisterParam>({
			query: data => ({
				method: 'post',
				url: '/v1/auths/register',
				isPrivate: false,
				data
			}),
		}),
		postVerify: builder.mutation<User, string>({
			query: token => ({
				method: 'post',
				url: '/v1/auths/verify-token',
				params: { type: 'verify_registration', token },
				isPrivate: false,
				transformResponse: (result: {data: User}) => result.data
			}),
		}),
		postResendVerify: builder.mutation<unknown, string>({
			query: email => ({
				method: 'post',
				url: '/v1/auths/resend-verification',
				params: { type: 'verify_registration', email },
				isPrivate: false,
			}),
		}),
		postForgotPass: builder.mutation<unknown, string>({
			query: email => ({
				method: 'post',
				url: '/v1/forgot-password',
				data: { type: 'forgot_password', email },
				isPrivate: false,
			}),
		}),
		postVerifyForgotPass: builder.mutation<Profile, string>({
			query: token => ({
				method: 'post',
				url: '/v1/forgot-password/validate-token',
				params: { type: 'forgot_password', token },
				isPrivate: false,
			}),
			transformResponse: (result: {data: Profile}) => result.data
		}),
		putUpdatePass: builder.mutation<unknown, {new_password: string, confirm_password: string}>({
			query: data => ({
				method: 'put',
				url: '/v1/forgot-password/new-password',
				isPrivate: true,
				data
			})
		}),
		postVerifyPassword: builder.mutation<void, string>({
			query: data => ({
				method: 'post',
				url: '/v1/auths/verify-password',
				isPrivate: true,
				data: {
					password: data
				}
			})
		}),
		postVerifyEmail: builder.mutation<User, {token: string, usercode: string}>({
			query: ({ token, usercode }) => ({
				method: 'post',
				url: '/v1/auths/verify-token-email',
				params: { type: 'update_email', token, usercode },
				isPrivate: false,
				transformResponse: (result: {data: User}) => result.data
			}),
		}),
	})
})

export const {
	usePostLoginMutation,
	usePostRegisterMutation,
	usePostVerifyMutation,
	usePostResendVerifyMutation,
	usePostForgotPassMutation,
	usePostVerifyForgotPassMutation,
	usePutUpdatePassMutation,
	usePostVerifyPasswordMutation,
	usePostVerifyEmailMutation
} = accessApi