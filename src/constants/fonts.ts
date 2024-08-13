import { Platform } from 'react-native'
import { scaleFont, scaleHeight } from '../utils/pixel.ratio'
import colors from './colors'

export const headingConfigs = {
	headingLarge: {
		fontFamily: 'FuturaPT-Bold',
		fontWeight: Platform.select({
			android: '600',
			ios: 'bold'
		}),
		lineHeight: scaleHeight(38),
		fontSize: scaleFont(30),
		color: colors.lightTheme.neutralLink
	},
	headingMedium: {
		fontFamily: 'FuturaPT-Bold',
		fontWeight: Platform.select({
			android: '600',
			ios: 'bold'
		}),
		lineHeight: scaleHeight(32),
		fontSize: scaleFont(24),
		color: colors.lightTheme.neutralLink
	},
	headingBold: {
		fontFamily: 'Poppins-Black',
		fontWeight: Platform.select({
			android: '900',
			ios: 'bold'
		}),
		lineHeight: scaleHeight(28),
		fontSize: scaleFont(24),
		color: colors.lightTheme.neutralLink
	},
	headingBoldJunegull: {
		fontFamily: 'Junegull-Regular',
		fontWeight: Platform.select({
			android: '900',
			ios: 'bold'
		}),
		lineHeight: scaleHeight(28),
		fontSize: scaleFont(24),
		color: colors.lightTheme.neutralLink
	}
}

const bodyConfigs = {
	bodyDoubleExtraLargeRegular: {
		fontFamily: 'FuturaPT-Book',
		fontWeight: '400',
		fontSize: scaleFont(20),
		color: colors.lightTheme.neutralLink
	},
	bodyDoubleExtraLargeMedium: {
		fontFamily: 'FuturaPT-Medium',
		fontWeight: '400',
		fontSize: scaleFont(20),
		color: colors.lightTheme.neutralLink
	},
	bodyDoubleExtraLargeBold: {
		fontFamily: 'FuturaPT-Bold',
		fontWeight: Platform.select({
			android: '600',
			ios: 'bold'
		}),
		fontSize: scaleFont(20),
		color: colors.lightTheme.neutralLink
	},
	bodyExtraLargeRegular: {
		fontFamily: 'FuturaPT-Book',
		fontWeight: '400',
		fontSize: scaleFont(18),
		color: colors.lightTheme.neutralLink
	},
	bodyExtraLargeMedium: {
		fontFamily: 'FuturaPT-Medium',
		fontWeight: '400',
		fontSize: scaleFont(18),
		color: colors.lightTheme.neutralLink
	},
	bodyExtraLargeBold: {
		fontFamily: 'FuturaPT-Bold',
		fontWeight: Platform.select({
			android: '600',
			ios: 'bold'
		}),
		fontSize: scaleFont(18),
		color: colors.lightTheme.neutralLink
	},
	bodyExtraLargeHeavy: {
		fontFamily: 'FuturaPT-Heavy',
		fontWeight: Platform.select({
			android: '400',
			ios: '700'
		}),
		fontSize: scaleFont(18),
		color: colors.lightTheme.neutralLink
	},
	bodyDoubleExtraLargeJunegull: {
		fontFamily: 'Junegull-Regular',
		fontWeight: Platform.select({
			android: '600',
			ios: 'bold'
		}),
		fontSize: scaleFont(20),
		color: colors.lightTheme.neutralLink
	},
	bodyLargeRegular: {
		fontFamily: 'FuturaPT-Book',
		fontWeight: '400',
		fontSize: scaleFont(16),
		color: colors.lightTheme.neutralLink
	},
	bodyLargeMedium: {
		fontFamily: 'FuturaPT-Medium',
		fontWeight: '400',
		fontSize: scaleFont(16),
		color: colors.lightTheme.neutralLink
	},
	bodyLargeDemi: {
		fontFamily: 'FuturaPT-Demi',
		fontWeight: '600',
		fontSize: scaleFont(16),
		color: colors.lightTheme.neutralLink
	},
	bodyLargeBold: {
		fontFamily: 'FuturaPT-Bold',
		fontWeight: Platform.select({
			android: '600',
			ios: 'bold'
		}),
		fontSize: scaleFont(16),
		color: colors.lightTheme.neutralLink
	},
	bodyLargeHeavy: {
		fontFamily: 'FuturaPT-Heavy',
		fontWeight: Platform.select({
			android: '400',
			ios: '700'
		}),
		fontSize: scaleFont(16),
		color: colors.lightTheme.neutralLink
	},
	bodyMiddleRegular: {
		fontFamily: 'FuturaPT-Book',
		fontWeight: '400',
		fontSize: scaleFont(14),
		color: colors.lightTheme.neutralLink
	},
	bodyMiddleMedium: {
		fontFamily: 'FuturaPT-Medium',
		fontWeight: '500',
		fontSize: scaleFont(14),
		color: colors.lightTheme.neutralLink
	},
	bodyMiddleBold: {
		fontFamily: 'FuturaPT-Bold',
		fontWeight: Platform.select({
			android: '600',
			ios: 'bold'
		}),
		fontSize: scaleFont(14),
		color: colors.lightTheme.neutralLink
	},
	bodyMiddleDemi: {
		fontFamily: 'FuturaPT-Demi',
		fontWeight: '600',
		fontSize: scaleFont(14),
		color: colors.lightTheme.neutralLink
	},
	bodySmallRegular: {
		fontFamily: 'FuturaPT-Book',
		fontWeight: '400',
		fontSize: scaleFont(12),
		color: colors.lightTheme.neutralLink
	},
	bodySmallMedium: {
		fontFamily: 'FuturaPT-Medium',
		fontWeight: '500',
		fontSize: scaleFont(12),
		color: colors.lightTheme.neutralLink
	},
	bodySmallBold: {
		fontFamily: 'FuturaPT-Bold',
		fontWeight: Platform.select({
			android: '600',
			ios: 'bold'
		}),
		fontSize: scaleFont(12),
		color: colors.lightTheme.neutralLink
	},
	bodySmallDemi: {
		fontFamily: 'FuturaPT-Demi',
		fontWeight: '600',
		fontSize: scaleFont(12),
		color: colors.lightTheme.neutralLink
	},
	bodyExtraSmallRegular: {
		fontFamily: 'FuturaPT-Book',
		fontWeight: '400',
		fontSize: scaleFont(10),
		color: colors.lightTheme.neutralLink
	},
	bodyExtranSmallMedium: {
		fontFamily: 'FuturaPT-Medium',
		fontWeight: '500',
		fontSize: scaleFont(10),
		color: colors.lightTheme.neutralLink
	},
	bodyDoubleExtraSmallRegular: {
		fontFamily: 'FuturaPT-Regular',
		fontWeight: '400',
		fontSize: scaleFont(8),
		color: colors.lightTheme.neutralLink
	},
}

const paragraphConfigs = {
	paragraphDoubleExtraLargeRegular: {
		fontFamily: 'FuturaPT-Book',
		fontWeight: '400',
		lineHeight: scaleHeight(32),
		fontSize: scaleFont(20),
		color: colors.lightTheme.neutralLink
	},
	paragraphExtraLargeRegular: {
		fontFamily: 'FuturaPT-Book',
		fontWeight: '400',
		lineHeight: scaleHeight(28),
		fontSize: scaleFont(18),
		color: colors.lightTheme.neutralLink
	},
	paragraphLargeRegular: {
		fontFamily: 'FuturaPT-Book',
		fontWeight: '400',
		lineHeight: scaleHeight(24),
		fontSize: scaleFont(16),
		color: colors.lightTheme.neutralLink
	},
	paragraphMiddleRegular: {
		fontFamily: 'FuturaPT-Book',
		fontWeight: '400',
		lineHeight: scaleHeight(20),
		fontSize: scaleFont(14),
		color: colors.lightTheme.neutralLink
	},
	paragraphSmallRegular: {
		fontFamily: 'FuturaPT-Book',
		fontWeight: '400',
		lineHeight: scaleHeight(18),
		fontSize: scaleFont(12),
		color: colors.lightTheme.neutralLink
	},
	paragraphExtraSmallRegular: {
		fontFamily: 'FuturaPT-Book',
		fontWeight: '400',
		lineHeight: scaleHeight(15),
		fontSize: scaleFont(10),
		color: colors.lightTheme.neutralLink
	},
}

const defaultFontConfigs = {
	...headingConfigs,
	...bodyConfigs,
	...paragraphConfigs
}

export default defaultFontConfigs