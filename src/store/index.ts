import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { productsApi } from './products'
import { miscSlice } from './misc'

import { rtkQueryErrorLogger } from '../middleware/rtkQueryErrorLogger'
import { roomApi } from './room'
import { gameApi } from './game'
import { accessApi } from './access'
import { userProfileApi } from './user'
import { bannerApi } from './banner'
import { activityApi } from './activity'
import { gameBoardCollectionApi } from './game-board-collection'
import { gameFavouriteApi } from './game-favourite'
import { badgesApi } from './badges'
import { championApi } from './champion'

export const store = configureStore({
	reducer: {
		[productsApi.reducerPath]: productsApi.reducer,
		[accessApi.reducerPath]: accessApi.reducer,
		[roomApi.reducerPath]: roomApi.reducer,
		[gameApi.reducerPath]: gameApi.reducer,
		[championApi.reducerPath]: championApi.reducer,
		[miscSlice.name]: miscSlice.reducer,
		[userProfileApi.reducerPath]: userProfileApi.reducer,
		[bannerApi.reducerPath]: bannerApi.reducer,
		[activityApi.reducerPath]: activityApi.reducer,
		[gameBoardCollectionApi.reducerPath]: gameBoardCollectionApi.reducer,
		[gameFavouriteApi.reducerPath]: gameFavouriteApi.reducer,
		[badgesApi.reducerPath]: badgesApi.reducer
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat([
			productsApi.middleware,
			accessApi.middleware,
			roomApi.middleware,
			gameApi.middleware,
			userProfileApi.middleware,
			bannerApi.middleware,
			activityApi.middleware,
			gameBoardCollectionApi.middleware,
			gameFavouriteApi.middleware,
			badgesApi.middleware,
			championApi.middleware,
			rtkQueryErrorLogger
		]),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
