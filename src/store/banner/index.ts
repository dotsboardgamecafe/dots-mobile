import { createApi } from '@reduxjs/toolkit/query/react'
import baseQuery from '../../utils/base.query'
import { type Banner } from '../../models/banner'

export const bannerApi = createApi({
	reducerPath: 'bannerApi',
	tagTypes: ['Banner'],
	baseQuery: baseQuery(),
	endpoints: builder => ({
		getBannerPublished: builder.query<Banner[], void | null>({
			query: () => ({ url: '/v1/banners?status=publish' }),
			transformResponse: result => (result as {data: Banner[]})?.data,
		}),
	})
})

export const {
	useGetBannerPublishedQuery,
} = bannerApi