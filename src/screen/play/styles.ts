import { StyleSheet } from 'react-native'
import { scaleHeight, scaleHorizontal, scaleVertical } from '../../utils/pixel.ratio'
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet'

const styles = StyleSheet.create({
	filter: {
		alignSelf: 'flex-end'
	},
	mh: {
		marginHorizontal: scaleHorizontal(16)
	},
	item: {
		width: SCREEN_WIDTH,
		height: scaleHeight(160)
	},
	itemSeparator: {
		height: scaleHeight(16),
	},
	section: {
		marginVertical: scaleVertical(16),
		marginHorizontal: scaleHorizontal(16)
	},
	sectionFooter: {
		height: scaleHeight(16)
	}
})

export default styles