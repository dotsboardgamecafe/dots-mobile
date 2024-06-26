import React from 'react'
import { Provider } from 'react-redux'
import { LogLevel, OneSignal } from 'react-native-onesignal'

import Navigations from './src/navigations'
import { store } from './src/store'

import './src/localization/i18n'
import Toast from 'react-native-toast-message'
import toastConfig from './src/components/toast'
import { ONESIGNAL_KEY } from '@env'

function App(): React.JSX.Element {

	// setup onesignal
	OneSignal.Debug.setLogLevel(LogLevel.Verbose)
	OneSignal.initialize(ONESIGNAL_KEY as string)
	OneSignal.Notifications.requestPermission(true)

	return (
		<Provider store={ store }>
			<Navigations/>
			<Toast config={ toastConfig } />
		</Provider>
	)
}
export default App
