import { StyleSheet } from 'react-native'
import {
	isIphoneXorAbove, scaleHeight, scaleHorizontal, scaleVertical, scaleWidth
} from '../../utils/pixel.ratio'
import { colorsTheme } from '../../constants/theme'

const styles = StyleSheet.create({
	flexStyle: {
		flex: 1
	},
	bannerStyle: {
		height: scaleHeight(248)
	},
	starsFieldContentStyle: {
		marginTop: scaleHeight(30),
		height: scaleHeight(210),
		justifyContent: 'space-between',
	},
	midContentStyle: {
		paddingVertical: scaleVertical(24),
	},
	midContentHorizontalStyle: {
		paddingHorizontal: scaleHorizontal(16),
	},
	rowStyle: {
		flexDirection: 'row'
	},
	rowCenterStyle: {
		alignItems: 'center'
	},
	spaceBetweenStyle: {
		justifyContent: 'space-between'
	},
	iconWrapperStyle: {
		width: scaleWidth(16),
		height: scaleWidth(16),
		borderRadius: 100,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: colorsTheme.lightWhite,
		marginLeft: scaleHorizontal(8),
		marginTop: scaleVertical(2)
	},
	filterCardRedeemWrapperStyle: {
		marginTop: scaleVertical(24)
	},
	filterCardRedeemItemStyle: {
		backgroundColor: colorsTheme.gray100,
		borderRadius: 16,
		paddingHorizontal: scaleHorizontal(12),
		paddingVertical: scaleVertical(4),
		marginRight: scaleHorizontal(12),
		borderWidth: 1,
		borderColor: 'transparent',
		alignItems: 'center',
		justifyContent: 'center'
	},
	selectedfilterCardRedeemItemStyle: {
		marginRight: scaleHorizontal(12),
	},
	selectedfilterCardRedeemItemBackgroundStyle: {
		backgroundColor: 'rgba(255, 254, 237, 1)',
	},
	cardRedeemItemStyle: {
		backgroundColor: colorsTheme.lightWhite,
		marginRight: scaleHorizontal(16),
		zIndex: 99
	},
	cardRedeemItemBackgroundStyle: {
		backgroundColor: colorsTheme.lightWhite,
		padding: scaleWidth(12),
	},
	ticketStyle: {
		width: scaleWidth(25),
		height: scaleHeight(25),
		backgroundColor: 'white',
		position: 'absolute',
		top: '40%',
		bottom: 0,
		borderRadius: 100,
		zIndex: -1
	},
	cardRedeemItemImageStyle: {
		width: scaleWidth(236),
		height: scaleHeight(154),
		borderRadius: 12
	},
	cardRedeemItemTitleStyle: {
		marginTop: scaleVertical(12)
	},
	cardRedeemItemExpiryWrapperStyle: {
		marginTop: scaleVertical(8),
		justifyContent: 'space-between'
	},
	cardRedeemItemExpiryLeftStyle: {
		color: colorsTheme.gray500
	},
	cardRedeemItemExpiryRightStyle: {
		color: colorsTheme.blueAccent
	},
	tabActivityWrapperStyle: {
		marginTop: scaleVertical(42)
	},
	listGameSeparatorStyle: {
		height: 1,
		backgroundColor: colorsTheme.background,
		marginVertical: scaleVertical(16),
	},
	pointActivityContentTitleStyle: {
		marginBottom: scaleVertical(8),
	},
	overflowHiddenStyle: {
		overflow: 'hidden'
	},
	bottomSheetView: {
		marginHorizontal: scaleWidth(16),
		paddingBottom: scaleHeight(16),
	},
	imageBgStyle: {
		width: '100%',
		height: scaleHeight(isIphoneXorAbove() ? 50 : 20),
		position: 'absolute',
		top: 0,
		zIndex: 999,
		opacity: 1,
		backgroundColor: colorsTheme.background
	}
})

export default styles