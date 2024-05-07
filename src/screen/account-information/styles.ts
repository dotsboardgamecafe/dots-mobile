import { StyleSheet } from 'react-native'
import { scaleHeight, scaleHorizontal, scaleVertical, scaleWidth } from '../../utils/pixel.ratio'
import { colorsTheme } from '../../constants/theme'

const styles = StyleSheet.create({
	contentStyle: {
		marginTop: scaleVertical(6),
		marginHorizontal: scaleHorizontal(16),
		flex: 1
	},
	rowStyle: {
		flexDirection: 'row'
	},
	rowCenterStyle: {
		alignItems: 'center'
	},
	justifyBetweenStyle: {
		justifyContent: 'space-between'
	},
	editLabelStyle: {
		color: colorsTheme.blueAccent
	},
	cardWrapperStyle: {
		paddingVertical: scaleVertical(10),
		paddingHorizontal: scaleHorizontal(14),
		borderRadius: 12,
		backgroundColor: 'rgba(255, 255, 255, 0.5)',
		marginTop: scaleVertical(6),
		marginBottom: scaleVertical(6),
	},
	verifyWrapperStyle: {
		marginTop: scaleVertical(16),
		backgroundColor: colorsTheme.background,
		width: scaleWidth(107),
		borderRadius: 16,
		paddingVertical: scaleVertical(3),
		paddingHorizontal: scaleHorizontal(6)
	},
	activatedLabelStyle: {
		marginLeft: 5
	},
	infoLabelStyle: {
		color: colorsTheme.gray500
	},
	emailLabel: {
		marginTop: scaleHeight(24),
		alignSelf: 'flex-start'
	},
	bottomSheetView: {
		marginHorizontal: scaleWidth(16),
		paddingBottom: scaleHeight(16),
	},
	bottomSheetTitleStyle: {
		marginBottom: scaleVertical(16)
	},
	fieldWrapperStyle: {
		width: '100%',
		marginTop: scaleHeight(16),
		marginBottom: scaleHeight(8)
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
		marginTop: scaleHeight(24),
		marginBottom: scaleVertical(16)
	},
	prefixWrapperStyle: {
		marginRight: scaleWidth(8)
	},
	hintTextStyle: {
		color: colorsTheme.gray500,
		marginTop: scaleHeight(8)
	},
	changeEmailBtnWrapper: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0
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