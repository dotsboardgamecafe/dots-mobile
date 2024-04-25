import { StyleSheet } from 'react-native'
import { scaleHorizontal, scaleVertical } from '../../utils/pixel.ratio'
import { colorsTheme } from '../../constants/theme'

const styles = StyleSheet.create({
	contentStyle: {
		marginTop: scaleVertical(8),
		marginHorizontal: scaleHorizontal(16)
	},
	descriptionStyle: {
		color: colorsTheme.gray500
	}
})

export default styles