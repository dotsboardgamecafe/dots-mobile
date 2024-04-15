import { StyleSheet } from 'react-native'
import { type ThemeType } from '../../models/theme'
import { scaleHorizontal, scaleVertical, scaleWidth } from '../../utils/pixel.ratio'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const createStyle = ({ colors }: ThemeType) => StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: scaleVertical(16),
		backgroundColor: colors.gray100,
	},
	rank: {
		marginEnd: scaleHorizontal(8),
		width: scaleWidth(24)
	},
	image: {
		marginEnd: scaleHorizontal(20),
		borderRadius: 16,
		width: 32,
		aspectRatio: 1,
		borderWidth: scaleWidth(2),
		borderColor: colors.background
	},
	name: {
		flex: 1,
		marginEnd: scaleHorizontal(8)
	},
})

export default createStyle