import { StyleSheet } from 'react-native'
import { scaleHeight } from '../../utils/pixel.ratio'
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet'

const styles = StyleSheet.create({
	container: {
		height: scaleHeight(42),
		alignSelf: 'stretch',
		backgroundColor: 'black',
		borderRadius: 16,
		paddingBottom: scaleHeight(6),
	},
	rectangle1: {
		flex: 1,
		overflow: 'hidden',
		backgroundColor: '#434343',
		borderRadius: 16,
		justifyContent: 'center',
		alignItems: 'center',
	},
	rectangle2: {
		width: SCREEN_WIDTH,
		height: SCREEN_WIDTH / 2,
		backgroundColor: '#232526',
		position: 'absolute',
		top: '-400%',
		start: '20%',
		transform: [{ rotate: '25deg' }]
	},
	label: {
		color: 'white'
	},
})

export default styles