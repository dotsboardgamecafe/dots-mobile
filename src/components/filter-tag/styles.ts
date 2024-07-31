import { StyleSheet } from 'react-native'

import { scaleHeight, scaleWidth } from '../../utils/pixel.ratio'
import { colorsTheme } from '../../constants/theme'

const styles = StyleSheet.create({
	container: {
		marginEnd: scaleWidth(8),
		marginTop: scaleHeight(8),
		flex: 0
	},
	content: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: scaleWidth(8),
		paddingVertical: scaleHeight(8),
		borderRadius: 16,
		flex: 0,
		backgroundColor: colorsTheme.yellowTransparent
	},
	active: {
		backgroundColor: colorsTheme.background,
		paddingHorizontal: 0,
		paddingVertical: 0
	},
	inactive: {
		marginEnd: scaleWidth(8),
		marginTop: scaleHeight(8),
		borderRadius: 16,
		backgroundColor: colorsTheme.gray100,
		paddingVertical: scaleHeight(8),
	},
	hasIcon: {
		marginStart: scaleWidth(4)
	}
})

export default styles