import { SCREEN_HEIGHT } from '@gorhom/bottom-sheet'
import { Platform, StatusBar, StyleSheet } from 'react-native'
import { isIphoneXorAbove } from '../../utils/pixel.ratio'

const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : isIphoneXorAbove() ? -20 : 0

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