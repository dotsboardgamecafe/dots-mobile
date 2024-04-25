import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { productsApi } from './products'
import { miscSlice } from './misc'

import { rtkQueryErrorLogger } from '../middleware/rtkQueryErrorLogger'
import { roomApi } from './room'
import { gameApi } from './game'
import { accessApi } from './access'

export const store = configureStore({
	reducer: {
		[productsApi.reducerPath]: productsApi.reducer,
		[accessApi.reducerPath]: accessApi.reducer,
		[roomApi.reducerPath]: roomApi.reducer,
		[gameApi.reducerPath]: gameApi.reducer,
		[miscSlice.name]: miscSlice.reducer
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat([
			productsApi.middleware,
			accessApi.middleware,
			roomApi.middleware,
			gameApi.middleware,
			rtkQueryErrorLogger
		]),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
