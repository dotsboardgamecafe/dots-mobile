import { StyleSheet } from 'react-native'

import { scaleHeight, scaleHorizontal, scaleVertical, scaleWidth } from '../../utils/pixel.ratio'
import { colorsTheme } from '../../constants/theme'

export const styles = StyleSheet.create({
	image: {
		borderRadius: 11,
		width: '100%',
		aspectRatio: 1
	},

	popularContainer: {
		position: 'absolute',
		bottom: scaleHeight(10),
		start: scaleWidth(12),
		backgroundColor: colorsTheme.background,
		borderRadius: 12,
		paddingVertical: scaleHeight(2),
		paddingHorizontal: scaleWidth(8)
	},

	popularTag: {
		// fontWeight: '700',
		color: colorsTheme.redAccent,
		// fontSize: scaleFont(10)
	},

	title: {
		marginVertical: scaleVertical(8)
	},

	row: {
		flexDirection: 'row',
		alignContent: 'center'
	},

	textInfo: {
		flex: 1,
		marginStart: scaleWidth(4)
	},

	tagContainer: {
		alignSelf: 'flex-start',
		backgroundColor: colorsTheme.blueAccent,
		borderRadius: 12,
		paddingVertical: scaleVertical(2),
		paddingHorizontal: scaleHorizontal(8),
		marginTop: scaleVertical(8)
	},

	gameTag: {
		color: colorsTheme.background,
	},
})