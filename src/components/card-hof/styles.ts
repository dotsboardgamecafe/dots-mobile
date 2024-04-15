import { StyleSheet } from 'react-native'
import { scaleHorizontal, scaleVertical, scaleWidth } from '../../utils/pixel.ratio'
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet'

const styles = StyleSheet.create({
	content: {
		alignItems: 'center',
		paddingBottom: scaleVertical(24),
		paddingTop: scaleVertical(16),
		paddingHorizontal: scaleHorizontal(16)
	},
	gameImage: {
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		width: ((SCREEN_WIDTH * .9) - scaleWidth(70)) * .5,
		aspectRatio: 1,
	},
	playerImage: {
		borderRadius: scaleWidth(8),
		width: scaleWidth(16),
		aspectRatio: 1,
		marginTop: scaleVertical(16)
	},
	playerName: {
		marginTop: scaleVertical(6)
	},
	bg: {
		position: 'absolute',
		top: 0, left: 0, bottom: 0, right: 0,
		width: '100%',
		height: '100%'
	},
})

export default styles