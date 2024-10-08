import { StyleSheet } from 'react-native'
import { scaleHeight } from '../../utils/pixel.ratio'

const styles = StyleSheet.create({
	container: {
		height: scaleHeight(46),
		alignSelf: 'stretch',
		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'hidden',
		// paddingBottom: scaleHeight(6),
	},
	bg: {
		position: 'absolute',
		top: 0,
		left: 0,
		height: scaleHeight(46),
	},
	label: {
		color: 'white',
		marginBottom: scaleHeight(6)
	},
})

export default styles