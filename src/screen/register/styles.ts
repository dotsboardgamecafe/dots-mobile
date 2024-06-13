import { StyleSheet } from 'react-native'
import { SCREEN_HEIGHT, WINDOW_HEIGHT } from '@gorhom/bottom-sheet'

import { scaleHeight, scaleWidth } from '../../utils/pixel.ratio'
import { colorsTheme } from '../../constants/theme'

const styles = StyleSheet.create({
	scrollView: {
		alignItems: 'stretch',
		flexGrow: 1,
		paddingHorizontal: scaleWidth(16),
		paddingBottom: SCREEN_HEIGHT - WINDOW_HEIGHT
	},
	headerImage: {
		width: scaleWidth(72),
		height: scaleHeight(64),
		marginTop: scaleHeight(SCREEN_HEIGHT * .05)
	},
	title: {
		marginTop: scaleHeight(12)
	},
	mt8: {
		marginTop: scaleHeight(8)
	},
	nameLabel: {
		marginTop: scaleHeight(36),
		alignSelf: 'flex-start'
	},
	inputLabel: {
		marginTop: scaleHeight(24),
		alignSelf: 'flex-start'
	},
	inputInfo: {
		marginTop: scaleHeight(6),
		color: colorsTheme.gray
	},
	countryCode: {
		color: colorsTheme.gray
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
	login: {
		marginStart: 3
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