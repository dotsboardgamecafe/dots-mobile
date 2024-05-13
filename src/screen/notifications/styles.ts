import { StyleSheet } from 'react-native'
import { scaleHeight, scaleWidth } from '../../utils/pixel.ratio'
import { colorsTheme } from '../../constants/theme'

const styles = StyleSheet.create({
	rowStyle: {
		flexDirection: 'row'
	},
	rowCenterStyle: {
		alignItems: 'center'
	},
	spaceBetweenStyle: {
		justifyContent: 'space-between'
	},
	titleStyle: {
		marginBottom: scaleHeight(8),
	},
	itemSeparatorStyle: {
		height: scaleHeight(4),
		backgroundColor: colorsTheme.gray200,
	},
	imageGameStyle: {
		width: scaleWidth(58),
		height: scaleHeight(58),
		borderRadius: 8,
		marginRight: scaleHeight(8)
	},
	dotStyle: {
		width: 8,
		height: 8,
		borderRadius: 100,
		marginRight: 12
	},
	growStyle: {
		flexGrow: 1
	},
	itemWrapperStyle: {
		paddingHorizontal: scaleWidth(16),
		paddingVertical: scaleHeight(24)
	},
	bottomSheetView: {
		marginHorizontal: scaleWidth(16),
		paddingBottom: scaleHeight(16),
	},
	blurViewWrapperStyle: {
		height: scaleHeight(142),
		borderRadius: 12,
		overflow: 'hidden',
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: scaleHeight(16)
	},
	absoluteStyle: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0
	},
	cardAwardItemImageStyle: {
		width: scaleWidth(100),
		height: scaleWidth(100),
	},
	titleBottomSheetBottomContentStyle: {
		width: scaleWidth(91),
		marginRight: scaleWidth(24),
		marginBottom: scaleHeight(8)
	},
	bottomsheetBottomContentStyle: {
		paddingBottom: 16
	},
	roundedBorderStyle: {
		width: scaleWidth(100),
		height: scaleWidth(100),
	},
	roundedBorderContentStyle: {
		overflow: 'hidden',
		paddingHorizontal: 0,
		paddingVertical: 0
	}
})

export default styles