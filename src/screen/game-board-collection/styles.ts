import { StyleSheet } from 'react-native'
import { scaleHorizontal, scaleVertical, scaleWidth } from '../../utils/pixel.ratio'

const styles = StyleSheet.create({
	listGameWrapperStyle: {
		marginTop: scaleVertical(16),
		marginBottom: scaleVertical(42),
	},
	boardGameItemStyle: {
		width: scaleWidth(82),
		height: scaleWidth(82),
		borderRadius: 7,
		margin: scaleHorizontal(16 / 3),
	},
	justifyCenterStyle: {
		justifyContent: 'center',
	},
	rowCenterStyle: {
		alignItems: 'center'
	},
	boardGameItemSeparatorStyle: {
		width: scaleWidth(320),
		height: scaleWidth(20),
		marginTop: -10,
		zIndex: -1
	},
})

export default styles