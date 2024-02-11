import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type Products } from '../../models/products'

export const productsApi = createApi({
	reducerPath: 'productsApi',
	tagTypes: ['Products'],
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
	endpoints: builder => ({
		getProducts: builder.query<Products[], void | null>({
			query: () => '/products',
			providesTags: result => {
				if (result) {
					return [
						{ type: 'Products', id: 'LIST' },
						...result.map(({ product_id }) => ({ type: 'Products' as const, id: product_id })),
					]
				}
				return [{ type: 'Products', id: 'LIST' }]
			}
		}),
		getProductByID: builder.query<Products[], string>({
			query: id => `/products/${id}`
		}),
		addProduct: builder.mutation<Products, Partial<Products>>({
			query: body => ({
				url: '/products',
				method: 'POST',
				body
			}),
			invalidatesTags: [{ type: 'Products', id: 'LIST' }],
		})
	})
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
	useGetProductsQuery,
	useGetProductByIDQuery,
	useAddProductMutation
} = productsApi