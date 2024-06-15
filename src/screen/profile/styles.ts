import { StyleSheet } from 'react-native'
import {
	isIphoneXorAbove, scaleHeight, scaleHorizontal, scaleVertical, scaleWidth
} from '../../utils/pixel.ratio'
import { colorsTheme } from '../../constants/theme'

const styles = StyleSheet.create({
	bannerStyle: {
		height: scaleHeight(248)
	},
	starsFieldContentStyle: {
		marginTop: scaleHeight(34),
		height: scaleHeight(210),
		justifyContent: 'space-between',
	},
	midContentStyle: {
		paddingVertical: scaleVertical(24),
	},
	rowStyle: {
		flexDirection: 'row'
	},
	rowEndStyle: {
		alignItems: 'flex-end'
	},
	justifyBetweenStyle: {
		justifyContent: 'space-between',
	},
	justifyCenterStyle: {
		justifyContent: 'center',
	},
	rowCenterStyle: {
		alignItems: 'center'
	},
	midContentHorizontalStyle: {
		paddingHorizontal: scaleHorizontal(16),
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
	listGameWrapperStyle: {
		marginTop: scaleVertical(39),
		marginBottom: scaleVertical(42),
	},
	boardGameItemStyle: {
		width: scaleWidth(82),
		height: scaleWidth(82),
		borderRadius: 7,
		margin: scaleHorizontal(16 / 3),
	},
	mainContentStyle: {
		paddingBottom: scaleHeight(42)
	},
	boardGameItemSeparatorStyle: {
		width: scaleWidth(320),
		height: scaleWidth(20),
		marginTop: -10,
		zIndex: -99,
	},
	cardAwardItemStyle: {
		borderRadius: 100,
		overflow: 'hidden',
		width: scaleWidth(95),
		height: scaleWidth(95),
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1
	},
	cardAwardAbsoluteStyle: {
		position: 'absolute'
	},
	cardAwardItemImageNeonStyle: {
		width: scaleWidth(95),
		height: scaleWidth(95),
		borderRadius: 100,
	},
	cardAwardItemImageStyle: {
		width: scaleWidth(75),
		height: scaleWidth(75),
		borderRadius: 100,
	},
	cardAwardContentStyle: {
		paddingVertical: 0,
		paddingHorizontal: 0
	},
	cardAwardUnClaimStyle: {
		width: scaleWidth(80),
		height: scaleWidth(80),
		borderRadius: 100,
	},
	awardWrapperStyle: {
		marginBottom: scaleVertical(36),
	},
	cardAwardItemWrapperStyle: {
		marginTop: scaleVertical(16),
	},
	gamefavTitleStyle: {
		marginLeft: scaleHorizontal(8)
	},
	roundedGameFavStyle: {
		marginRight: scaleVertical(16),
	},
	itemGameFavWrapperStyle: {
		borderRadius: 12,
		paddingHorizontal: scaleHorizontal(12),
		paddingVertical: scaleVertical(12)
	},
	bottomSheetView: {
		marginHorizontal: scaleWidth(16),
		paddingBottom: scaleHeight(16),
	},
	settingWrapperStyle: {
		marginTop: scaleVertical(24)
	},
	settingTitleStyle: {
		marginLeft: scaleVertical(12)
	},
	settingsSeparatorStyle: {
		height: 1,
		backgroundColor: colorsTheme.gray200,
		marginVertical: scaleVertical(16),
	},
	versionSyle: {
		textAlign: 'center',
		marginVertical: scaleVertical(16),
	},
	imageBgStyle: {
		width: '100%',
		height: scaleHeight(isIphoneXorAbove() ? 50 : 20),
		position: 'absolute',
		top: 0,
		zIndex: 999,
		opacity: 1,
		backgroundColor: colorsTheme.background
	},
	scrollContentStyle: {
		paddingRight: 20
	},
	buttonWrapperStyle: {
		marginBottom: scaleHeight(16),
	},
	changePictureDescriptionStyle: {
		marginVertical: scaleHeight(16)
	}
})

export default styles