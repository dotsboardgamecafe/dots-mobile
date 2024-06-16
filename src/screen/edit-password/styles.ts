import { StyleSheet } from 'react-native'
import { scaleWidth, scaleHeight } from '../../utils/pixel.ratio'
import { colorsTheme } from '../../constants/theme'

const styles = StyleSheet.create({
	fieldWrapperStyle: {
		width: '100%',
		marginTop: scaleHeight(16),
		height: scaleHeight(80),
	},
	scrollView: {
		alignItems: 'center',
		flexGrow: 1,
		paddingHorizontal: scaleWidth(16),
	},
	input: {
		marginTop: scaleHeight(8)
	},
	passwordLabel: {
		alignSelf: 'flex-start'
	},
	actionButton: {
		marginTop: scaleHeight(32)
	},
	prefixWrapperStyle: {
		marginRight: scaleWidth(8)
	},
	hintTextStyle: {
		color: colorsTheme.gray500,
		marginTop: scaleHeight(4)
	}
})

export default styles