import { StyleSheet } from 'react-native'
import { scaleFont, scaleHeight, scaleWidth } from '../../utils/pixel.ratio'
import { SCREEN_HEIGHT } from '@gorhom/bottom-sheet'
import { type ThemeType } from '../../models/theme'
import { type StyleProps } from 'react-native-reanimated'

const createStyle = ({ colors }: ThemeType): StyleProps => StyleSheet.create({
	keyboardView: {
		flex: 1,
		flexGrow: 1,
	},

	scrollView: {
		alignItems: 'stretch',
		paddingHorizontal: scaleWidth(16),
	},

	headerImage: {
		width: scaleWidth(72),
		height: scaleHeight(64),
		marginTop: scaleHeight(SCREEN_HEIGHT * .05)
	},

	title: {
		fontWeight: 'bold',
		fontSize: scaleFont(24),
		lineHeight: scaleFont(32),
		marginTop: scaleHeight(12)
	},

	mt8: {
		marginTop: scaleHeight(8)
	},

	nameLabel: {
		fontWeight: 'bold',
		marginTop: scaleHeight(36),
		alignSelf: 'flex-start'
	},

	inputLabel: {
		fontWeight: 'bold',
		marginTop: scaleHeight(24),
		alignSelf: 'flex-start'
	},

	inputInfo: {
		marginTop: scaleHeight(6),
		fontWeight: 'bold',
		fontSize: scaleFont(12),
		color: colors.gray
	},

	countryCode: {
		color: colors.gray
	},

	phonePrefixArrow: {
		marginStart: scaleWidth(2)
	},

	actionButton: {
		marginTop: scaleHeight(32)
	},

	footer: {
		flex: 1,
		justifyContent: 'flex-end',
		marginTop: scaleHeight(24),
		marginBottom: scaleHeight(24)
	},

	footerContent: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},

	loginInfo: {
		fontSize: scaleFont(16)
	},

	login: {
		marginStart: 3
	},

	loginContent: {
		fontWeight: '700'
	},

	bottomSheetHandle: {
		display: 'none'
	},

	bottomSheetView: {
		alignItems: 'center',
		marginHorizontal: scaleWidth(16),
		paddingBottom: scaleHeight(16),
	},

	successTitle: {
		fontWeight: 'bold',
		fontSize: scaleFont(20),
		lineHeight: scaleFont(25),
	},

	successInfo: {
		marginTop: scaleHeight(8),
		color: colors.gray
	},

	successAction: {
		marginTop: scaleHeight(16)
	}
})

export default createStyle