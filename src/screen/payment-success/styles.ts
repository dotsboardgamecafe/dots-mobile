import { StyleSheet } from 'react-native'
import { scaleHeight, scaleHorizontal, scaleVertical, scaleWidth } from '../../utils/pixel.ratio'
import { colorsTheme } from '../../constants/theme'

const styles = StyleSheet.create({
	container: {
		marginHorizontal: scaleHorizontal(16)
	},
	messageWrapper: {
		marginTop: scaleVertical(25),
		alignItems: 'center'
	},
	subtitle: {
		textAlign: 'center',
		paddingHorizontal: scaleVertical(50),
		marginTop: scaleVertical(8),
		color: colorsTheme.gray500
	},
	image: {
		marginTop: scaleVertical(24),
		width: scaleWidth(140),
		height: scaleHeight(167)
	},
	buttonHistory: {
		marginTop: scaleVertical(32),
		marginHorizontal: scaleHorizontal(22)
	},
	relatedGameWrapperStyle: {
		marginTop: scaleVertical(42)
	},
	relatedGameTitleStyle: {
		marginBottom: scaleVertical(16)
	},
	listStyle: {
		marginHorizontal: scaleWidth(10),
		marginTop: scaleHeight(10)
	},
	columnWrapper: {
		gap: scaleWidth(10)
	},
	listGameWrapperStyle: {
		paddingBottom: scaleHeight(60)
	}
})

export default styles