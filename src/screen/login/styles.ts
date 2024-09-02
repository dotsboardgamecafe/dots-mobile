import { StyleSheet } from 'react-native'
import { scaleWidth, scaleHeight } from '../../utils/pixel.ratio'
import { SCREEN_HEIGHT, WINDOW_HEIGHT } from '@gorhom/bottom-sheet'

const styles = StyleSheet.create({
	scrollView: {
		alignItems: 'center',
		flexGrow: 1,
		paddingHorizontal: scaleWidth(16),
		paddingBottom: SCREEN_HEIGHT - WINDOW_HEIGHT
	},
	headerImage: {
		width: scaleWidth(72),
		height: scaleHeight(80),
		marginTop: scaleHeight(SCREEN_HEIGHT * .1)
	},
	headerTitle: {
		marginTop: scaleHeight(12)
	},
	emailLabel: {
		marginTop: scaleHeight(64),
		alignSelf: 'flex-start'
	},
	input: {
		marginTop: scaleHeight(8),
		alignSelf: 'stretch'
	},
	passwordLabel: {
		marginTop: scaleHeight(24),
		alignSelf: 'flex-start'
	},
	forgotLabel: {
		marginTop: scaleHeight(24),
		alignSelf: 'flex-end'
	},
	actionButton: {
		marginTop: scaleHeight(32)
	},
	footer: {
		flex: 1,
		justifyContent: 'flex-end',
		marginTop: scaleHeight(24),
		// marginBottom: scaleHeight(24),
	},
	registerContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	registerButton: {
		marginStart: 3
	},
})

export default styles