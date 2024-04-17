import { StyleSheet } from 'react-native'
import { colorsTheme } from '../../constants/theme'
import { getStatusBarHeight } from '../../utils/pixel.ratio'

const styles = StyleSheet.create({
	containerStyle: {
		flex: 1,
		backgroundColor: colorsTheme.background,
		marginTop: getStatusBarHeight()
	},
	loadingWrapperStyle: {
		position: 'absolute',
		flex: 1,
		backgroundColor: colorsTheme.background,
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		zIndex: 999,
		justifyContent: 'center'
	}
})

export default styles