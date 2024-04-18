import { Platform } from 'react-native'
import { scaleFont, scaleHeight } from '../utils/pixel.ratio'

export const headingConfigs = {
	headingLarge: {
		fontFamily: 'FuturaPT-Bold',
		fontWeight: Platform.select({
			android: '600',
			ios: 'bold'
		}),
		lineHeight: scaleHeight(38),
		fontSize: scaleFont(30),
	},
	headingMedium: {
		fontFamily: 'FuturaPT-Bold',
		fontWeight: Platform.select({
			android: '600',
			ios: 'bold'
		}),
		lineHeight: scaleHeight(32),
		fontSize: scaleFont(24),
	},
	headingBold: {
		fontFamily: 'Poppins-Black',
		fontWeight: Platform.select({
			android: '900',
			ios: 'bold'
		}),
		lineHeight: scaleHeight(28),
		fontSize: scaleFont(24),
	}
}

const bodyConfigs = {
	bodyDoubleExtraLargeRegular: {
		fontFamily: 'FuturaPT-Book',
		fontWeight: '400',
		fontSize: scaleFont(20),
	},
	bodyDoubleExtraLargeMedium: {
		fontFamily: 'FuturaPT-Medium',
		fontWeight: '400',
		fontSize: scaleFont(20),
	},
	bodyDoubleExtraLargeBold: {
		fontFamily: 'FuturaPT-Bold',
		fontWeight: Platform.select({
			android: '600',
			ios: 'bold'
		}),
		fontSize: scaleFont(20),
	},
	bodyExtraLargeRegular: {
		fontFamily: 'FuturaPT-Book',
		fontWeight: '400',
		fontSize: scaleFont(18),
	},
	bodyExtraLargeMedium: {
		fontFamily: 'FuturaPT-Medium',
		fontWeight: '400',
		fontSize: scaleFont(18),
	},
	bodyExtraLargeBold: {
		fontFamily: 'FuturaPT-Bold',
		fontWeight: Platform.select({
			android: '600',
			ios: 'bold'
		}),
		fontSize: scaleFont(18),
	},
	bodyExtraLargeHeavy: {
		fontFamily: 'FuturaPT-Heavy',
		fontWeight: Platform.select({
			android: '400',
			ios: '700'
		}),
		fontSize: scaleFont(18),
	},
	bodyLargeRegular: {
		fontFamily: 'FuturaPT-Book',
		fontWeight: '400',
		fontSize: scaleFont(16),
	},
	bodyLargeMedium: {
		fontFamily: 'FuturaPT-Medium',
		fontWeight: '400',
		fontSize: scaleFont(16),
	},
	bodyLargeDemi: {
		fontFamily: 'FuturaPT-Demi',
		fontWeight: '600',
		fontSize: scaleFont(16),
	},
	bodyLargeBold: {
		fontFamily: 'FuturaPT-Bold',
		fontWeight: Platform.select({
			android: '600',
			ios: 'bold'
		}),
		fontSize: scaleFont(16),
	},
	bodyMiddleRegular: {
		fontFamily: 'FuturaPT-Book',
		fontWeight: '400',
		fontSize: scaleFont(14),
	},
	bodyMiddleMedium: {
		fontFamily: 'FuturaPT-Medium',
		fontWeight: '500',
		fontSize: scaleFont(14),
	},
	bodyMiddleBold: {
		fontFamily: 'FuturaPT-Bold',
		fontWeight: Platform.select({
			android: '600',
			ios: 'bold'
		}),
		fontSize: scaleFont(14),
	},
	bodyMiddleDemi: {
		fontFamily: 'FuturaPT-Demi',
		fontWeight: '600',
		fontSize: scaleFont(14),
	},
	bodySmallRegular: {
		fontFamily: 'FuturaPT-Book',
		fontWeight: '400',
		fontSize: scaleFont(12),
	},
	bodySmallMedium: {
		fontFamily: 'FuturaPT-Medium',
		fontWeight: '500',
		fontSize: scaleFont(12),
	},
	bodySmallBold: {
		fontFamily: 'FuturaPT-Bold',
		fontWeight: Platform.select({
			android: '600',
			ios: 'bold'
		}),
		fontSize: scaleFont(12),
	},
	bodyExtraSmallRegular: {
		fontFamily: 'FuturaPT-Book',
		fontWeight: '400',
		fontSize: scaleFont(10),
	},
	bodyDoubleExtraSmallRegular: {
		fontFamily: 'FuturaPT-Regular',
		fontWeight: '400',
		fontSize: scaleFont(8),
	},
}

const paragraphConfigs = {
	paragraphDoubleExtraLargeRegular: {
		fontFamily: 'FuturaPT-Book',
		fontWeight: '400',
		lineHeight: scaleHeight(32),
		fontSize: scaleFont(20),
	},
	paragraphExtraLargeRegular: {
		fontFamily: 'FuturaPT-Book',
		fontWeight: '400',
		lineHeight: scaleHeight(28),
		fontSize: scaleFont(18),
	},
	paragraphLargeRegular: {
		fontFamily: 'FuturaPT-Book',
		fontWeight: '400',
		lineHeight: scaleHeight(24),
		fontSize: scaleFont(16),
	},
	paragraphMiddleRegular: {
		fontFamily: 'FuturaPT-Book',
		fontWeight: '400',
		lineHeight: scaleHeight(20),
		fontSize: scaleFont(14),
	},
	paragraphSmallRegular: {
		fontFamily: 'FuturaPT-Book',
		fontWeight: '400',
		lineHeight: scaleHeight(18),
		fontSize: scaleFont(12),
	},
	paragraphExtraSmallRegular: {
		fontFamily: 'FuturaPT-Book',
		fontWeight: '400',
		lineHeight: scaleHeight(15),
		fontSize: scaleFont(10),
	},
}

const defaultFontConfigs = {
	...headingConfigs,
	...bodyConfigs,
	...paragraphConfigs
}

export default defaultFontConfigs