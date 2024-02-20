import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { productsApi } from './products'
import { miscSlice } from './misc'

import { rtkQueryErrorLogger } from '../middleware/rtkQueryErrorLogger'

export const store = configureStore({
	reducer: {
		[productsApi.reducerPath]: productsApi.reducer,
		[miscSlice.name]: miscSlice.reducer
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat([productsApi.middleware, rtkQueryErrorLogger]),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
