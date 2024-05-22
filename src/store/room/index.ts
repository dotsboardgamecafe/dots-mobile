import { createApi } from '@reduxjs/toolkit/query/react'
import baseQuery from '../../utils/base.query'
import { type RoomListParam, type Rooms } from '../../models/rooms'

export const roomApi = createApi({
	reducerPath: 'roomApi',
	tagTypes: ['Rooms'],
	baseQuery: baseQuery(),
	endpoints: builder => ({
		getListRoom: builder.query<Rooms[], RoomListParam>({
			query: params => ({ url: '/v1/rooms', params }),
			transformResponse: result => (result as {data: Rooms[]}).data,
		}),
		getRoomDetail: builder.query<Rooms, string>({
			query: id => ({ url: `/v1/rooms/${id}` }),
			transformResponse: result => (result as {data: Rooms}).data
		}),
		getListTourney: builder.query<Rooms[], RoomListParam>({
			query: params => ({ url: '/v1/tournaments', params }),
			transformResponse: res => (res as {data: Rooms[]}).data
		}),
		getTourneyDetail: builder.query<Rooms, string>({
			query: id => ({ url: `/v1/tournaments/${id}` }),
			transformResponse: result => (result as {data: Rooms}).data
		}),
	})
})

export const {
	useGetListRoomQuery,
	useGetRoomDetailQuery,
	useGetListTourneyQuery,
	useGetTourneyDetailQuery,
} = roomApi