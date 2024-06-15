import { StyleSheet } from 'react-native'
import {  scaleHorizontal, scaleVertical } from '../../utils/pixel.ratio'

const styles = StyleSheet.create({
	header: {
		paddingHorizontal: scaleHorizontal(16),
		paddingVertical: scaleVertical(16),
		flexDirection: 'row',
		alignItems: 'center'
	},
	title: {
		flex: 1,
		marginHorizontal: scaleHorizontal(12)
	},
})

export default styles