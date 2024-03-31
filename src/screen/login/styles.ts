import { StyleSheet } from 'react-native'
import { scaleWidth, scaleHeight, scaleFont } from '../../utils/pixel.ratio'
import { SCREEN_HEIGHT } from '@gorhom/bottom-sheet'

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		paddingHorizontal: scaleWidth(16),
		paddingVertical: scaleHeight(16)
	},
	keyboardView: {
		flex: 1,
		flexGrow: 1,
	},
	scrollView: {
		alignItems: 'center',
		paddingHorizontal: scaleWidth(16),
	},
	headerImage: {
		width: scaleWidth(72),
		height: scaleHeight(64),
		marginTop: scaleHeight(SCREEN_HEIGHT * .1)
	},
	headerTitle: {
		// fontWeight: 'bold',
		// fontSize: scaleFont(24),
		// lineHeight: scaleFont(32),
		// marginTop: scaleHeight(12)
	},
	emailLabel: {
		fontWeight: 'bold',
		marginTop: scaleHeight(64),
		alignSelf: 'flex-start'
	},
	input: {
		marginTop: scaleHeight(8)
	},
	passwordLabel: {
		fontWeight: 'bold',
		marginTop: scaleHeight(24),
		alignSelf: 'flex-start'
	},
	forgotLabel: {
		fontWeight: 'bold',
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
		marginBottom: scaleHeight(24),
	},
	registerContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	registerInfo: {
		fontSize: scaleFont(16)
	},
	registerButton: {
		marginStart: 3
	},
	registerLabel: {
		fontWeight: '700'
	},
})

export default styles