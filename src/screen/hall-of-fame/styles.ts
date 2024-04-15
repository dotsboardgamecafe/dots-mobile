import { StyleSheet } from 'react-native'
import { type ThemeType } from '../../models/theme'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const createStyle = ({ colors }: ThemeType) => StyleSheet.create({
	filterHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 16,
		paddingBottom: 16,
		backgroundColor: colors.background
	},
	filterReset: {
		color: colors.blueAccent
	},
	filterItemSeparator: {
		height: 1,
		backgroundColor: colors.gray100
	}
})

export default createStyle