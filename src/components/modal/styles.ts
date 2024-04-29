import { SCREEN_WIDTH } from '@gorhom/bottom-sheet'
import { StyleSheet } from 'react-native'
import { scaleHorizontal, scaleVertical } from '../../utils/pixel.ratio'
import { type ThemeType } from '../../models/theme'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const createStyle = ({ colors }: ThemeType) => StyleSheet.create({
	container: {
		borderRadius: 8,
		width: SCREEN_WIDTH * .8,
		backgroundColor: colors.background,
		alignSelf: 'center',
		paddingHorizontal: scaleHorizontal(16),
		paddingVertical: scaleVertical(16)
	}
})

export default createStyle