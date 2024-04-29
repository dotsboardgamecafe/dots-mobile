import { StyleSheet } from 'react-native'
import { scaleHeight, scaleHorizontal, scaleVertical, scaleWidth } from '../../utils/pixel.ratio'

const styles = StyleSheet.create({
	medalText: {
		width: scaleWidth(18),
		textAlign: 'center'
	},
	mvpItemContainer: {
		height: scaleHeight(48),
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: scaleVertical(8),
		paddingHorizontal: scaleHorizontal(12),
		borderRadius: 4,
	},
	mvpPlayerImage: {
		width: scaleWidth(32),
		aspectRatio: 1,
		borderRadius: scaleWidth(16),
		marginHorizontal: 12
	},
	mvpPlayerName: {
		flex: 1
	},
	mvpVp: {
		marginHorizontal: scaleHorizontal(8)
	}
})

export default styles