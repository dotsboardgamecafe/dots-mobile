import { Platform, StyleSheet } from 'react-native'
import { colorsTheme } from '../../constants/theme'
import { scaleHeight, scaleWidth } from '../../utils/pixel.ratio'

const styles = StyleSheet.create({
	contentContainerStyle: {
		paddingBottom: Platform.OS === 'android' ? scaleHeight(50) : scaleHeight(22)
	},
	rowStyle: {
		flexDirection: 'row'
	},
	spaceBetweenStyle: {
		justifyContent: 'space-between'
	},
	alignCenterStyle: {
		alignItems: 'center'
	},
	alignEndStyle: {
		alignItems: 'flex-end'
	},
	textCenterStyle: {
		textAlign: 'center'
	},
	justifyCenterStyle: {
		justifyContent: 'center'
	},
	justifyBetweenStyle: {
		justifyContent: 'space-between'
	},
	baseLineStyle: {
		alignItems: 'baseline'
	},
	flexEndStyle: {
		alignItems: 'flex-end'
	},
	historyWrapperStyle: {
		backgroundColor: colorsTheme.grayMedium
	},
	historyContentStyle: {
		paddingVertical: 24,
		paddingHorizontal: 16,
	},
	textGrayStyle: {
		color: colorsTheme.gray500
	},
	textBlueStyle: {
		color: colorsTheme.blueSuccess
	},
	historyTextSpaceStyle: {
		marginTop: scaleHeight(2)
	},
	historyImageStyle: {
		width: scaleWidth(62),
		height: scaleWidth(62),
		borderRadius: 8,
		marginRight: 12
	},
	itemSeparatorStyle: {
		height: scaleHeight(4),
		backgroundColor: colorsTheme.gray200,
	},
	totalPriceSeparatorStyle: {
		height: scaleHeight(1),
		backgroundColor: colorsTheme.gray300,
		marginVertical: scaleHeight(12)
	},
	growStyle: {
		flexGrow: 1
	},
	tickBlurStyle: {
		width: scaleWidth(24),
		height: scaleWidth(24),
		borderRadius: 100,
		marginRight: scaleWidth(8),
	},
	tickSuccessBlurStyle: {
		backgroundColor: 'rgba(236, 253, 243, 1)',
	},
	tickPendingBlurStyle: {
		backgroundColor: '#fdfdec'
	},
	tickExpiredBlurStyle: {
		backgroundColor: '#fdecec'
	},
	tickCircleStyle: {
		width: scaleWidth(18),
		height: scaleWidth(18),
		borderRadius: 100,
	},
	tickSuccessCircleStyle: {
		backgroundColor: 'rgba(209, 250, 223, 1)'
	},
	tickPendingCircleStyle: {
		backgroundColor: '#faf9d1'
	},
	tickExpiredCircleStyle: {
		backgroundColor: '#fad1d1'
	},
	successTextStyle: {
		color: colorsTheme.success500,
	},
	pendingTextStyle: {
		color: '#d0bd2d',
	},
	expiredTextStyle: {
		color: '#b71212',
	},
	historyDateStyle: {
		marginTop: scaleHeight(8),
		marginBottom: scaleHeight(24)
	},
	bottomSheetPaddingStyle: {
		paddingHorizontal: scaleWidth(16),
		paddingVertical: scaleHeight(8)
	},
	bookingWrapperStyle: {
		backgroundColor: colorsTheme.gray50
	},
	orderSummaryStyle: {
		paddingTop: scaleHeight(20)
	},
	orderSummaryDetailStyle: {
		marginTop: scaleHeight(16)
	},
	orderSummaryTitleStyle: {
		marginLeft: scaleWidth(24)
	},
	bottomSheetDetailSeparatorStyle: {
		height: scaleHeight(1),
		backgroundColor: colorsTheme.gray200,
		marginVertical: scaleHeight(20)
	},
	redeemInputWrapperStyle: {
		paddingHorizontal: scaleWidth(16)
	},
	redeemInputStyle: {
		paddingHorizontal: scaleWidth(14),
		width: scaleWidth(228)
	},
	redeemWrapperStyle: {
		marginTop: scaleHeight(32)
	},
	redeemPointWrapperStyle: {
		marginTop: scaleHeight(12),
	},
	redeemDescriptionStyle: {
		marginTop: scaleHeight(4),
	},
	badgeContainerStyle: {
		backgroundColor: colorsTheme.redAccent,
		paddingVertical: scaleHeight(2),
		paddingHorizontal: scaleWidth(8),
		marginRight: scaleWidth(8),
		borderRadius: 16
	},
	badgeLabelStyle: {
		color: colorsTheme.background,
		letterSpacing: -1
	},
	buttonRedeemStyle: {
		backgroundColor: colorsTheme.black,
		paddingHorizontal: scaleWidth(18),
		paddingVertical: scaleHeight(8),
		borderRadius: 16,
		marginLeft: scaleWidth(24),
		shadowColor: colorsTheme.background,
		shadowOffset: {
			width: 0,
			height: 12,
		},
		shadowOpacity: 0.58,
		shadowRadius: 16.00,
    
		elevation: 24,
	},
	buttonRedeemLabelStyle: {
		color: colorsTheme.background
	},
	redeemImageModalStyle: {
		marginTop: scaleHeight(18),
		width: scaleWidth(140),
		height: scaleHeight(107)
	},
	congratsStyle: {
		marginTop: scaleHeight(24),
		marginBottom: scaleHeight(8)
	},
	claimedDescriptionStyle: {
		marginBottom: scaleHeight(16),
		textAlign: 'center'
	},
	buttonWrapperStyle: {
		marginBottom: scaleHeight(16),
		marginTop: scaleHeight(16)
	},
})

export default styles