import { StyleSheet } from 'react-native'

import { scaleHeight, scaleWidth } from '../../utils/pixel.ratio'
import { type ThemeType } from '../../models/theme'
import { type StyleProps } from 'react-native-reanimated'

const createStyle = ({ colors }: ThemeType): StyleProps => StyleSheet.create({
	container: {
		marginEnd: scaleWidth(8),
		flex: 0
	},
	content: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: scaleWidth(8),
		paddingVertical: scaleHeight(8),
		borderRadius: 16,
		flex: 0,
		backgroundColor: colors.yellowTransparent
	},
	active: {
		backgroundColor: colors.background,
		paddingHorizontal: 0,
		paddingVertical: 0
	},
	inactive: {
		marginEnd: scaleWidth(8),
		borderRadius: 16,
		backgroundColor: colors.gray100,
		paddingVertical: scaleHeight(8),
	},
	hasIcon: {
		marginStart: scaleWidth(8)
	}
})

export default createStyle