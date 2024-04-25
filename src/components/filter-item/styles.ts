import { StyleSheet } from 'react-native'
import { type ThemeType } from '../../models/theme'
import { scaleHorizontal, scaleVertical } from '../../utils/pixel.ratio'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const createStyle = ({ colors }: ThemeType) => StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 16,
		backgroundColor: colors.background,
		paddingHorizontal: scaleHorizontal(12),
		paddingVertical: scaleVertical(8)
	},
	label: { color: colors.onBackground }
})

export default createStyle