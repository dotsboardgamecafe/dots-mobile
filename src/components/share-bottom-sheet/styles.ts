import { StyleSheet } from 'react-native'
import { type ThemeType } from '../../models/theme'
import { scaleHorizontal, scaleVertical } from '../../utils/pixel.ratio'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const createStyle = ({ colors }: ThemeType) => StyleSheet.create({
	bottomSheetView: {
		alignItems: 'center',
		marginHorizontal: scaleHorizontal(16),
		paddingBottom: scaleVertical(16),
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	mt24: {
		marginTop: scaleVertical(24),
	},
	item: {
		alignItems: 'center',
		flex: 1
	},
	copy: {
		alignSelf: 'stretch',
		borderRadius: 12,
		backgroundColor: colors.gray100,
		paddingHorizontal: scaleHorizontal(16),
		paddingVertical: scaleVertical(8),
		marginTop: scaleVertical(16)
	},
  
})

export default createStyle