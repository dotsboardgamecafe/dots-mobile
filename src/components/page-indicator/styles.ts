import { StyleSheet } from 'react-native'
import { type ThemeType } from '../../models/theme'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const createStyle = ({ colors }: ThemeType, width: number) => StyleSheet.create({
	container: {
		backgroundColor: colors.blueTransparent,
		width,
		height: width,
		borderRadius: width / 2,
		overflow: 'hidden',
	},
	content: {
		borderRadius: width / 2,
		backgroundColor: colors.blueAccent,
		flex: 1,
	}
})

export default createStyle