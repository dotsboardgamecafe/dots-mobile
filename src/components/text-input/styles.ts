import { StyleSheet } from 'react-native'
import { scaleHorizontal, scaleVertical, scaleWidth } from '../../utils/pixel.ratio'
import { type ThemeType } from '../../models/theme'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const createStyle = ({ colors }: ThemeType) => StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: scaleHorizontal(16),
		borderRadius: 8,
		borderColor: colors.background,
		borderWidth: 1,
		backgroundColor: colors.surface,
	},

	input: {
		flex: 1,
		borderWidth: 0,
		color: colors.onBackground,
		fontFamily: 'FuturaPT-Book',
		paddingVertical: scaleVertical(8),
	},

	isPrefix: { marginStart: scaleWidth(4) },
	isSuffix: { marginEnd: scaleWidth(4) },
})

export default createStyle