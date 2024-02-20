import { isRejectedWithValue } from '@reduxjs/toolkit'
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit'
import { Alert } from 'react-native'

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => next => action => {
  	if (isRejectedWithValue(action)) {
  		const status = (action.payload as any).status
  		if (!status) {
  			Alert.prompt(
  				'RTK error!',
  				'data' in action.error
  					? (action.error.data as { message: string }).message
  					: action.error.message
  			)
  		}
  	}

  	return next(action)
  }