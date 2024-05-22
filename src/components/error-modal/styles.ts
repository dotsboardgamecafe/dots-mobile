import { StyleSheet } from 'react-native'
import { scaleHeight, scaleWidth } from '../../utils/pixel.ratio'
import { colorsTheme } from '../../constants/theme'

const styles = StyleSheet.create({
	bottomSheetView: {
		alignItems: 'center',
		marginHorizontal: scaleWidth(16),
		paddingBottom: scaleHeight(16),
	},
	successTitle: {
		marginTop: scaleHeight(16),
	},
	successInfo: {
		marginTop: scaleHeight(8),
		color: colorsTheme.gray,
		textAlign: 'center',
	},
	successAction: {
		marginTop: scaleHeight(32)
	}
})

export default styles