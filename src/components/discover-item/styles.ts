import { StyleSheet } from 'react-native'

import { scaleFont, scaleHeight, scaleWidth } from '../../utils/pixel.ratio'
import { type ThemeType } from '../../models/theme'
import { type StyleProps } from 'react-native-reanimated'

export const createStyle = ({ colors }: ThemeType): StyleProps => StyleSheet.create({
	image: {
		borderRadius: 11,
		width: '100%',
		aspectRatio: 1
	},

	popularContainer: {
		position: 'absolute',
		bottom: scaleHeight(10),
		start: scaleWidth(12),
		backgroundColor: colors.background,
		borderRadius: 12,
		paddingVertical: scaleHeight(2),
		paddingHorizontal: scaleWidth(8)
	},

	popularTag: {
		fontWeight: '700',
		color: colors.redAccent,
		fontSize: scaleFont(10)
	},

	title: {
		fontWeight: '700',
		fontSize: scaleFont(16),
		marginVertical: scaleHeight(8)
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
		backgroundColor: colors.blueAccent,
		borderRadius: 12,
		paddingVertical: scaleHeight(2),
		paddingHorizontal: scaleWidth(8),
		marginTop: scaleHeight(8)
	},

	gameTag: {
		fontWeight: '600',
		color: colors.background,
		fontSize: scaleFont(12)
	},
})