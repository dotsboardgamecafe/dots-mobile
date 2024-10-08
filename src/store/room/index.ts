import { type BookResult, type RoomListParam, type Rooms } from '../../models/rooms'
import { baseApi } from '../../utils/base.api'

export const roomApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		getListRoom: builder.query<Rooms[], RoomListParam>({
			query: params => ({ url: '/v1/rooms', params }),
			transformResponse: result => (result as {data: Rooms[]}).data,
		}),
		getRoomDetail: builder.query<Rooms, string>({
			query: id => ({ url: `/v1/rooms/${id}` }),
			transformResponse: result => (result as {data: Rooms}).data,
			forceRefetch: () => true
		}),
		getListTourney: builder.query<Rooms[], RoomListParam>({
			query: params => ({ url: '/v1/tournaments', params }),
			transformResponse: res => (res as {data: Rooms[]}).data
		}),
		getTourneyDetail: builder.query<Rooms, string>({
			query: id => ({ url: `/v1/tournaments/${id}` }),
			transformResponse: result => (result as {data: Rooms}).data,
			forceRefetch: () => true
		}),
		postJoinRoom: builder.mutation<BookResult, string>({
			query: id => ({
				method: 'post',
				url: `/v1/rooms/${id}/book`,
			}),
			transformResponse: (result: {data: BookResult}) => result.data,
		}),
		postJoinTourney: builder.mutation<BookResult, string>({
			query: id => ({
				method: 'post',
				url: `/v1/tournaments/${id}/book`,
			}),
			transformResponse: (result: {data: BookResult}) => result.data
		}),
	})
})

export const {
	useGetListRoomQuery,
	useGetRoomDetailQuery,
	useGetListTourneyQuery,
	useGetTourneyDetailQuery,
	usePostJoinRoomMutation,
	usePostJoinTourneyMutation,
	useLazyGetTourneyDetailQuery
} = roomApi