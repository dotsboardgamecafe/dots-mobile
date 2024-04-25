import { BackHandler, NativeModules, Platform } from 'react-native'
const { ExitApp } = NativeModules

const exitApp = (): void => {
	const isIOS = Platform.OS === 'ios'

	if (isIOS) {
		ExitApp.exit()
	} else {
		BackHandler.exitApp()
	}
}

export default exitApp