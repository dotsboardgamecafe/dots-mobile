import { StyleSheet } from 'react-native'
import { scaleHorizontal, scaleVertical } from '../../utils/pixel.ratio'

const styles = StyleSheet.create({
	page: {
		paddingVertical: scaleVertical(16),
		alignItems: 'center'
	},
	cardBorder: {
		paddingHorizontal: scaleHorizontal(16),
		paddingVertical: scaleVertical(24),
		overflow: 'hidden'
	},
})

export default styles