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
import { notificationsApi } from './notifications'
import { settingApi } from './setting'
import { baseApi } from '../utils/base.api'

const middlewares = [
	baseApi.middleware,
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
	notificationsApi.middleware,
	settingApi.middleware,
	rtkQueryErrorLogger
]

if (__DEV__) {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const createDebugger = require('redux-flipper').default
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	middlewares.push(createDebugger())
}

export const store = configureStore({
	reducer: {
		[baseApi.reducerPath]: baseApi.reducer,
		[productsApi.reducerPath]: productsApi.reducer,
		[accessApi.reducerPath]: accessApi.reducer,
		[roomApi.reducerPath]: roomApi.reducer,
		[gameApi.reducerPath]: gameApi.reducer,
		[championApi.reducerPath]: championApi.reducer,
		[miscSlice.name]: miscSlice.reducer,
		[settingApi.reducerPath]: settingApi.reducer
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(middlewares),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
