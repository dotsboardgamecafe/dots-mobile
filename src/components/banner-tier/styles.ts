import { scaleHeight, scaleHorizontal, scaleVertical, scaleWidth } from '../../utils/pixel.ratio'
import { colorsTheme } from '../../constants/theme'
import { type StyleProps } from 'react-native-reanimated'

const styles: StyleProps = {
	starsFieldContentStyle: {
		padding: scaleWidth(24),
		overflow: 'hidden'
	},
	topContentWrapperStyle: {
		paddingHorizontal: scaleWidth(24),
		paddingTop: scaleVertical(24),
	},
	starsFieldTopContentStyle: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	starsFieldMidContentStyle: {
		flexDirection: 'row',
		marginBottom: scaleVertical(8),
		alignItems: 'center',
	},
	pointStyle: {
		marginRight: scaleHorizontal(4)
	},
	rangeWrapperStyle: {
		marginBottom: scaleVertical(12),
		position: 'relative',
		justifyContent: 'center'
	},
	neonWrapperStyle: (isHome: boolean) => ({
		height: scaleHeight(isHome ? 10 : 11),
		backgroundColor: colorsTheme.lightWhite,
		opacity: 0.52,
		borderRadius: 24,
		position: 'absolute',
		width: '100%'
	}),
	neonGradientStyle: (isHome: boolean) => ({
		borderRadius: 24,
		paddingHorizontal: 1,
		paddingVertical: isHome ? 3 : 4,
		height: scaleHeight(isHome ? 5 : 6),
		marginHorizontal: scaleHorizontal(2),
		justifyContent: 'center'
	}),
	neonLineStyle: (isHome: boolean) => ({
		height: scaleHeight(isHome ? 2 : 3),
		backgroundColor: colorsTheme.background,
		borderRadius: 24,
	}),
	textStyle: {
		color: colorsTheme.background
	},
	tierUsernameSpaceStyle: {
		marginTop: scaleVertical(4)
	},
	imageBorderStyle: {
		borderWidth: 1,
		borderColor: colorsTheme.lightWhite,
		padding: 1,
		borderRadius: 100
	},
	iconPencilWrapperStyle: {
		position: 'absolute',
		bottom: 5,
		right: 0,
		backgroundColor: 'white',
		borderRadius: 100,
		paddingTop: scaleVertical(4),
		paddingHorizontal: scaleHorizontal(3),
		paddingBottom: scaleVertical(2),
		justifyContent: 'center',
		alignItems: 'center',
		width: scaleWidth(20),
		height: scaleHeight(20),
	},
	profileBottomWrapperStyle: {
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		marginBottom: 0
	},
	avatarUserWrapperStyle: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: scaleWidth(16),
		paddingTop: scaleVertical(24),
	},
	avatarStyle: {
		backgroundColor: colorsTheme.black
	},
	avatarUsernameWrapperStyle: {
		marginLeft: scaleHorizontal(16)
	},
	tripleDotsWrapperStyle: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	tripeDotsIconWrapperStyle: {
		width: scaleWidth(32),
		height: scaleWidth(32),
		backgroundColor: 'white',
		opacity: 0.5,
		borderRadius: 100
	},
	tripeDotsIconStyle: {
		position: 'absolute'
	}
}

export default styles