import { createApi } from '@reduxjs/toolkit/query/react'
import baseQuery from '../../utils/base.query'
import { type Settings } from '../../models/settings'

const defParam = {
	status: 'active',
	sort: 'asc',
}

export const settingApi = createApi({
	reducerPath: 'settingApi',
	tagTypes: ['Settings'],
	baseQuery: baseQuery(),
	endpoints: builder => ({
		getSetting: builder.query<Settings[], string>({
			query: set_group => ({ url: '/v1/settings', params: { ...defParam, set_group } }),
			transformResponse: result => (result as {data: Settings[]}).data,
		}),
	})
})

export const {
	useGetSettingQuery,
} = settingApi