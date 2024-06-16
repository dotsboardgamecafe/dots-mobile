import React from 'react'
import { Provider } from 'react-redux'

import Navigations from './src/navigations'
import { store } from './src/store'

import './src/localization/i18n'
import Toast from 'react-native-toast-message'
import toastConfig from './src/components/toast'

function App(): React.JSX.Element {

	return (
		<Provider store={ store }>
			<Navigations/>
			<Toast config={ toastConfig } />
		</Provider>
	)
}
export default App
