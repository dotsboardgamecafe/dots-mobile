import { Platform } from 'react-native'
import { type UploadType } from '../../models/upload'
import { baseApi } from '../../utils/base.api'

export const uploadApi = baseApi.injectEndpoints({
	endpoints: builder => ({
		upload: builder.mutation<any, UploadType>({
			query: img => {
				const data = new FormData()
				data.append('upload', {
					uri: Platform.OS === 'android' ? img.uri : img.uri.replace('file://', ''),
					name: img.fileName,
					type: img.type
				})
        
				return {
					url: '/v1/uploads',
					method: 'post',
					data,
					headers: { 'Content-Type': 'multipart/form-data' },
					transformRequest: formData => formData,
				}
			},
		}),
	}),
	overrideExisting: false
})

export const {
	useUploadMutation,
} = uploadApi