import { Platform, StyleSheet } from 'react-native'
import { scaleHeight, scaleHorizontal, scaleVertical, scaleWidth } from '../../utils/pixel.ratio'
import { colorsTheme } from '../../constants/theme'

const styles = StyleSheet.create({
	rowStyle: {
		flexDirection: 'row'
	},
	filterCardRedeemWrapperStyle: {
		marginTop: scaleVertical(16)
	},
	midContentHorizontalStyle: {
		paddingHorizontal: scaleHorizontal(16),
	},
	selectedfilterCardRedeemItemStyle: {
		marginRight: scaleHorizontal(12),
		height: scaleHeight(38)
	},
	selectedfilterCardRedeemItemBackgroundStyle: {
		backgroundColor: colorsTheme.background,
		paddingHorizontal: scaleHorizontal(11),
	},
	filterCardRedeemItemStyle: {
		backgroundColor: colorsTheme.gray100,
		borderRadius: 16,
		paddingHorizontal: scaleHorizontal(12),
		marginRight: scaleHorizontal(12),
		borderWidth: 1,
		borderColor: 'transparent',
		alignItems: 'center',
		justifyContent: 'center'
	},
	listGameWrapperStyle: {
		marginTop: scaleVertical(16),
		marginBottom: scaleVertical(21),
		paddingBottom: scaleVertical(Platform.OS === 'ios' ? 21 : 50),
	},
	boardGameItemStyle: {
		width: scaleWidth(112),
		height: scaleWidth(112),
		borderRadius: 100,
		margin: scaleHorizontal(1),
		overflow: 'hidden',
		justifyContent: 'center',
		alignItems: 'center',
		display: 'flex',
		position: 'relative'
	},
	justifyCenterStyle: {
		justifyContent: 'center',
	},
	justifyBetweenStyle: {
		justifyContent: 'space-between',
	},
	rowCenterStyle: {
		alignItems: 'center'
	},
	rowEndStyle: {
		alignItems: 'flex-end'
	},
	cardAwardAbsoluteStyle: {
		position: 'absolute'
	},
	cardAwardItemImageNeonStyle: {
		marginTop: scaleHeight(5),
		width: scaleWidth(112),
		height: scaleWidth(112),
	},
	cardAwardItemImageStyle: {
		width: scaleWidth(80),
		height: scaleWidth(80),
		borderRadius: 100,
	},
	cardAwardUnClaimStyle: {
		width: scaleWidth(80),
		height: scaleWidth(80),
		borderRadius: 100,
	},
	bottomSheetView: {
		marginHorizontal: scaleWidth(16),
		paddingBottom: scaleHeight(16),
	},
	buttonWrapperStyle: {
		marginBottom: scaleHeight(16),
		marginTop: scaleHeight(16)
	},
	absoluteStyle: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0
	},
	blurViewWrapperStyle: {
		height: scaleHeight(130),
		borderRadius: 12,
		overflow: 'hidden',
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: scaleHeight(16)
	},
	descriptionPointWrapperStyle: {
		marginBottom: scaleHeight(16)
	},
	claimDateStyle: {
		color: colorsTheme.gray500,
		marginLeft: scaleVertical(5),
	},
	getAwardImageStyle: {
		marginTop: scaleVertical(18),
		width: scaleWidth(140),
		height: scaleHeight(107)
	},
	congratsStyle: {
		marginTop: scaleHeight(24),
		marginBottom: scaleHeight(8)
	},
	claimedDescriptionStyle: {
		marginBottom: scaleVertical(16)
	},
	grayScaleStyle: {
		opacity: 0.5,
	},
	labelClaimedStyle: {
		margin: scaleWidth(14),
		backgroundColor: colorsTheme.blueSuccess,
		width: scaleWidth(58),
		height: scaleHeight(22),
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 16
	},
	labelClaimedTextStyle: {
		color: colorsTheme.background
	},
	vpPointStyle: {
		marginLeft: scaleWidth(5)
	},
	claimedBadgeStyle: { flex: 0, width: scaleWidth(80), height: scaleWidth(80), paddingVertical: 0, paddingHorizontal: 0, margin: 0 }
})

export default styles