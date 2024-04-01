import { StyleSheet } from 'react-native'
import { SCREEN_HEIGHT } from '@gorhom/bottom-sheet'

import { scaleHeight, scaleVertical, scaleWidth } from '../../utils/pixel.ratio'
import { type ThemeType } from '../../models/theme'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const createStyle = ({ colors }: ThemeType) => StyleSheet.create({
	scrollView: {
		alignItems: 'stretch',
		flexGrow: 1,
		paddingHorizontal: scaleWidth(16),
	},
	headerImage: {
		width: scaleWidth(72),
		height: scaleHeight(64),
		marginTop: scaleHeight(SCREEN_HEIGHT * .05)
	},
	title: {
		marginTop: scaleHeight(12)
	},
	desc: {
		color: colors.gray,
		marginTop: scaleVertical(8)
	},
	mt8: {
		marginTop: scaleHeight(8)
	},
	nameLabel: {
		marginTop: scaleHeight(36),
		alignSelf: 'flex-start'
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
		color: colors.gray,
		textAlign: 'center',
	},
	successAction: {
		marginTop: scaleHeight(16)
	}
})

export default createStyle