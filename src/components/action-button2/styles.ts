import { StyleSheet } from 'react-native'
import { scaleHeight, scaleVertical } from '../../utils/pixel.ratio'
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet'

const styles = StyleSheet.create({
	container: {
		borderRadius: 16,
		height: scaleHeight(38),
		backgroundColor: '#090B63',
		overflow: 'hidden',
		justifyContent: 'center',
		paddingBottom: scaleVertical(5)
	},
	shade1: {
		position: 'absolute',
		bottom: scaleVertical(5),
		left: 0,
		right: 0,
		top: 0,
		borderRadius: 16,
		backgroundColor: '#6467CF',
	},
	shade2: {
		position: 'absolute',
		zIndex: 1,
		left: '-27%',
		width: SCREEN_WIDTH * .5,
		height: SCREEN_WIDTH * .5,
		top: 0,
		backgroundColor: '#C4C4C450',
		transform: [{ rotate: '25deg' }]
	},
})

export default styles