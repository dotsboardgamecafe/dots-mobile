import { StyleSheet } from 'react-native'

import { scaleHeight, scaleHorizontal, scaleVertical, scaleWidth } from '../../utils/pixel.ratio'
import { type ThemeType } from '../../models/theme'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const createStyle = ({ colors }: ThemeType) => StyleSheet.create({
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
		// fontWeight: '700',
		color: colors.redAccent,
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
		backgroundColor: colors.blueAccent,
		borderRadius: 12,
		paddingVertical: scaleVertical(2),
		paddingHorizontal: scaleHorizontal(8),
		marginTop: scaleVertical(8)
	},

	gameTag: {
		color: colors.background,
	},
})