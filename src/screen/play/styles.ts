import { StyleSheet } from 'react-native'
import { scaleFont, scaleHeight, scaleHorizontal, scaleVertical } from '../../utils/pixel.ratio'
import { colorsTheme } from '../../constants/theme'

const styles = StyleSheet.create({
	content: {
		paddingVertical: scaleVertical(16),
		paddingHorizontal: scaleHorizontal(10)
	},
	filter: {
		alignSelf: 'flex-end'
	},
	filterPrefix: {
		marginEnd: scaleHorizontal(4)
	},
	filterSuffix: {
		marginStart: scaleHorizontal(4)
	},
	mh: {
		marginHorizontal: scaleHorizontal(16)
	},
	item: {
		width: '100%',
		// height: scaleHeight(160),
		borderRadius: 16
	},
	itemSeparator: {
		height: scaleHeight(16),
	},
	section: {
		marginVertical: scaleVertical(16),
	},
	sectionFooter: {
		height: scaleHeight(16)
	},
	filterReset: {
		fontWeight: 'bold',
		fontSize: scaleFont(16),
		lineHeight: scaleHeight(20),
		color: colorsTheme.blueAccent
	},
})

export default styles