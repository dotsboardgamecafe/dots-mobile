import { StyleSheet } from 'react-native'
import { scaleFont, scaleHeight } from '../../utils/pixel.ratio'

const styles = StyleSheet.create({
	itemContainer: {
		alignItems: 'center',
		justifyContent: 'flex-end',
		marginVertical: scaleHeight(4)
	},
	label: {
		fontWeight: 'normal'
	},
	labelFocus: {
		fontWeight: 'bold'
	},
	defaultLabelStyle: {
		fontSize: scaleFont(12),
		lineHeight: scaleHeight(15.3)
	}
})

export default styles