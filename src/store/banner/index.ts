import { type Banner } from '../../models/banner'
import { baseApi } from '../../utils/base.api'

export const bannerApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		getBannerPublished: builder.query<Banner[], void | null>({
			query: () => ({ url: '/v1/banners?status=publish' }),
			transformResponse: result => (result as {data: Banner[]})?.data,
		}),
	}),
	overrideExisting: false
})

export const {
	useGetBannerPublishedQuery,
} = bannerApi