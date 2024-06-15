import { StyleSheet } from 'react-native'
import { scaleHeight, scaleHorizontal, scaleVertical } from '../../utils/pixel.ratio'
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
		height: scaleHeight(180),
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
	filterHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 16,
		paddingBottom: 16,
		backgroundColor: colorsTheme.background
	},
	filterReset: {
		color: colorsTheme.blueAccent
	},
	filterItemSeparator: {
		height: 1,
		backgroundColor: colorsTheme.gray100
	}
})

export default styles