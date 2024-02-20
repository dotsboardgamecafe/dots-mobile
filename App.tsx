import React from 'react'
import { Provider } from 'react-redux'

import Navigations from './src/navigations'
import { store } from './src/store'

import './src/localization/i18n'

function App(): React.JSX.Element {

	return (
		<Provider store={ store }>
			<Navigations/>
		</Provider>
	)
}
export default App
