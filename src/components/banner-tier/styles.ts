import { scaleHeight, scaleHorizontal, scaleVertical, scaleWidth } from '../../utils/pixel.ratio'
import { colorsTheme } from '../../constants/theme'
import { type StyleProps } from 'react-native-reanimated'

const styles: StyleProps = {
	starsFieldContentStyle: {
		padding: scaleWidth(24)
	},
	starsFieldTopContentStyle: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: scaleVertical(18),
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
		marginTop: isHome ? 2.3 : 1.3,
	}),
	neonLineStyle: (isHome: boolean) => ({
		height: scaleHeight(isHome ? 2 : 3),
		backgroundColor: colorsTheme.background,
		borderRadius: 24,
		top: isHome ? -1 : -1.5
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
	}
}

export default styles