import { StyleSheet } from 'react-native'
import { scaleHorizontal, scaleVertical } from '../../utils/pixel.ratio'

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: scaleHorizontal(16)
	},
	messageWrapper: {
		marginTop: scaleVertical(25),
		alignItems: 'center'
	}
})

export default styles