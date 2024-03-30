import { StyleSheet } from 'react-native'
import { scaleHeight } from '../../utils/pixel.ratio'

const styles = StyleSheet.create({
	items: {
		zIndex: 1,
		flexDirection: 'row',
		alignItems: 'flex-end',
		height: scaleHeight(48),
		backgroundColor: 'white'
	}
})

export default styles