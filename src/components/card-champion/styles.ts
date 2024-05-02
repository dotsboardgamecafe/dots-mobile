import { StyleSheet } from 'react-native'
import { scaleHorizontal, scaleVertical } from '../../utils/pixel.ratio'

const styles = StyleSheet.create({
	cardBorder: {
		paddingHorizontal: scaleHorizontal(16),
		paddingVertical: scaleVertical(24),
		overflow: 'hidden'
	},
	blush1: {
		position: 'absolute',
		top: -16,
		left: -16
	},
	blush2: {
		position: 'absolute',
		top: 0,
		left: 80
	},
	blush3: {
		position: 'absolute',
		top: 80,
		left: 0
	},
	blush4: {
		position: 'absolute',
		top: 80,
		left: 80
	},
})

export default styles