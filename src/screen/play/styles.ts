import { StyleSheet } from 'react-native'
import { scaleHeight, scaleHorizontal, scaleVertical } from '../../utils/pixel.ratio'

const styles = StyleSheet.create({
	content: {
		paddingVertical: scaleVertical(16),
		paddingHorizontal: scaleHorizontal(16)
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
		height: scaleHeight(160),
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
	}
})

export default styles