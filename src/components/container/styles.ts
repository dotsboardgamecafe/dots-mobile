import { SCREEN_HEIGHT } from '@gorhom/bottom-sheet'
import { Platform, StatusBar, StyleSheet } from 'react-native'

const statusBarHeight = Platform.OS === 'ios' ? 0 : StatusBar.currentHeight

const styles = StyleSheet.create({
	bg: {
		height: SCREEN_HEIGHT,
	},
	container: {
		flex: 1,
		flexGrow: 1
	},

	content: {
		flex: 1,
		paddingTop: statusBarHeight
	}
})

export default styles