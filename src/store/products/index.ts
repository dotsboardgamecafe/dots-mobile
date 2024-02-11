import { createApi } from '@reduxjs/toolkit/query/react'
import { type Products } from '../../models/products'
import baseQuery from '../../utils/base.query'

export const productsApi = createApi({
	reducerPath: 'productsApi',
	tagTypes: ['Products'],
	baseQuery: baseQuery(),
	endpoints: builder => ({
		getProducts: builder.query<Products[], void | null>({
			query: () => ({ url: '/products' }),
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
			query: id => ({ url: `/products/${id}` })
		}),
		addProduct: builder.mutation<Products, Partial<Products>>({
			query: body => ({
				url: '/products',
				method: 'post',
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