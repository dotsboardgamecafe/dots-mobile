import { type Settings } from '../../models/settings'
import { baseApi } from '../../utils/base.api'

const defParam = {
	status: 'active',
	sort: 'asc',
}

export const settingApi = baseApi.injectEndpoints({
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