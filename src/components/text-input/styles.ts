import { StyleSheet } from 'react-native'
import { scaleHorizontal, scaleVertical, scaleWidth } from '../../utils/pixel.ratio'
import { colorsTheme } from '../../constants/theme'

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: scaleHorizontal(16),
		borderRadius: 8,
		borderColor: colorsTheme.background,
		borderWidth: 1,
		backgroundColor: colorsTheme.surface,
	},
	input: {
		flex: 1,
		borderWidth: 0,
		color: colorsTheme.textColor,
		fontFamily: 'FuturaPT-Book',
		paddingVertical: scaleVertical(8),
	},
	error: {
		borderColor: colorsTheme.redAccent
	},
	textError: {
		marginTop: scaleVertical(4),
		color: colorsTheme.redAccent
	},
	isPrefix: { marginStart: scaleWidth(4) },
	isSuffix: { marginEnd: scaleWidth(4) },
})

export default styles