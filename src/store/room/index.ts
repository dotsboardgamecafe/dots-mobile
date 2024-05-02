import { createApi } from '@reduxjs/toolkit/query/react'
import baseQuery from '../../utils/base.query'
import { type Rooms } from '../../models/rooms'

export const roomApi = createApi({
	reducerPath: 'roomApi',
	tagTypes: ['Rooms'],
	baseQuery: baseQuery(),
	endpoints: builder => ({
		getListRoom: builder.query<Rooms[], void | null>({
			query: () => ({ url: '/v1/rooms' }),
			transformResponse: result => (result as {data: Rooms[]}).data,
		}),
		getRoomDetail: builder.query<Rooms, string>({
			query: id => ({ url: `/v1/rooms/${id}` }),
			transformResponse: result => (result as {data: Rooms}).data
		}),
		getListTourney: builder.query<Rooms[], void | null>({
			query: () => ({ url: '/v1/tournaments' }),
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