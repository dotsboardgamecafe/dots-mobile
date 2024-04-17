import { StyleSheet } from 'react-native'
import { scaleHeight } from '../../utils/pixel.ratio'

const styles = StyleSheet.create({
	containerStyle: {
		backgroundColor: 'black',
		position: 'relative',
		height: scaleHeight(200),
		width: '100%',
		zIndex: 99
	},
})

export default styles