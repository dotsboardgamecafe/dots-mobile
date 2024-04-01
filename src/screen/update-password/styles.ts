import { StyleSheet } from 'react-native'
import { SCREEN_HEIGHT } from '@gorhom/bottom-sheet'

import { type ThemeType } from '../../models/theme'
import { scaleHeight, scaleHorizontal, scaleVertical, scaleWidth } from '../../utils/pixel.ratio'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const createStyle = ({ colors }: ThemeType) => StyleSheet.create({
	scrollView: {
		alignItems: 'stretch',
		flexGrow: 1,
		paddingHorizontal: scaleHorizontal(16),
	},
	headerImage: {
		width: scaleWidth(72),
		height: scaleHeight(64),
		marginTop: scaleVertical(SCREEN_HEIGHT * .05)
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
	inputLabel: {
		marginTop: scaleHeight(24),
		alignSelf: 'flex-start'
	},
	inputInfo: {
		marginTop: scaleHeight(6),
		color: colors.gray
	},
	actionButton: {
		marginTop: scaleHeight(32)
	},
})

export default createStyle