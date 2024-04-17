import { StyleSheet } from 'react-native'
import { scaleHeight, scaleHorizontal, scaleVertical, scaleWidth } from '../../utils/pixel.ratio'
import { colorsTheme } from '../../constants/theme'

const styles = StyleSheet.create({
	starsFieldContentStyle: {
		padding: scaleWidth(24)
	},
	starsFieldTopContentStyle: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: scaleVertical(18),
		alignItems: 'center'
	},
	starsFieldMidContentStyle: {
		flexDirection: 'row',
		marginBottom: scaleVertical(8),
		alignItems: 'center',
	},
	pointStyle: {
		marginRight: scaleHorizontal(4)
	},
	rangeWrapperStyle: {
		marginBottom: scaleVertical(12),
		position: 'relative',
	},
	neonWrapperStyle: {
		height: scaleHeight(10),
		backgroundColor: colorsTheme.background,
		opacity: 0.52,
		borderRadius: 24,
		position: 'absolute',
		width: '100%'
	},
	neonGradientStyle: {
		borderRadius: 24,
		paddingHorizontal: 1,
		paddingVertical: 3,
		height: scaleHeight(5),
		marginHorizontal: scaleHorizontal(2),
		marginTop: 2.3,
	},
	neonWrapperV2Style: {
		height: scaleHeight(2),
		backgroundColor: colorsTheme.background,
		borderRadius: 24,
		top: -1
	},
	textStyle: {
		color: colorsTheme.background
	},
})

export default styles