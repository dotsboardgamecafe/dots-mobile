import { createApi } from '@reduxjs/toolkit/query/react'
import baseQuery from '../../utils/base.query'
import { type RegisterParam, type Profile } from '../../models/profile'

export const accessApi = createApi({
	reducerPath: 'accessApi',
	baseQuery: baseQuery(),
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
		postVerify: builder.mutation<Profile, string>({
			query: token => ({
				method: 'post',
				url: '/v1/auths/verify-token',
				params: { type: 'verify_registration', token },
				isPrivate: false,
				transformResponse: (result: {data: Profile}) => result.data
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
		})
	})
})

export const {
	usePostLoginMutation,
	usePostRegisterMutation,
	usePostVerifyMutation,
	usePostResendVerifyMutation,
	usePostForgotPassMutation,
	usePostVerifyForgotPassMutation,
	usePutUpdatePassMutation
} = accessApi