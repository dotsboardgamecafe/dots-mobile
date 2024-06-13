import { Platform, StatusBar, StyleSheet } from 'react-native'
import { type ThemeType } from '../../models/theme'
import { scaleHorizontal, scaleVertical, scaleWidth } from '../../utils/pixel.ratio'

const statusBarHeight = Platform.OS === 'ios' ? 0 : StatusBar.currentHeight

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const createStyle = ({ colors }: ThemeType) => StyleSheet.create({
	container: {
		paddingTop: 0
	},
	header: {
		paddingHorizontal: scaleHorizontal(16),
		paddingTop: statusBarHeight,
		paddingBottom: scaleVertical(48),
		alignItems: 'center',
		overflow: 'hidden'
	},
	blush1: {
		position: 'absolute',
		left: '-50%',
		top: 200,
		bottom: 0
	},
	blush2: {
		position: 'absolute',
		right: '-80%',
		top: -80,
	},
	title: {
		color: colors.background,
		marginTop: scaleVertical(32)
	},
	topRank: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		marginTop: scaleVertical(24)
	},
	medal: {
		position: 'absolute',
		bottom: scaleVertical(-8),
		alignSelf: 'center'
	},
	topPlayer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	topPlayerImg: {
		aspectRatio: 1,
		borderWidth: scaleWidth(3),
	},
	topPlayerName: {
		marginTop: scaleVertical(16),
		color: colors.background
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	vpLabel: {
		color: colors.background
	},
	vp: {
		marginStart: scaleHorizontal(2)
	},
	listHeaderBg: {
		backgroundColor: colors.gray100,
		borderTopStartRadius: 16,
		borderTopEndRadius: 16,
		marginTop: scaleVertical(-28),
		marginHorizontal: scaleHorizontal(16),
	},
	listHeader: {
		backgroundColor: colors.background,
		borderRadius: 16,
		paddingVertical: scaleVertical(12),
		paddingHorizontal: scaleHorizontal(12),
		flexDirection: 'row'
	},
	filter: {
		flex: 1,
		justifyContent: 'space-between',
		marginHorizontal: scaleHorizontal(4),
		backgroundColor: colors.surface
	},
	listContent: {
		marginHorizontal: scaleHorizontal(16),
		// marginBottom: scaleVertical(16),
		backgroundColor: colors.gray100,
		borderBottomStartRadius: 16,
		borderBottomEndRadius: 16,
		overflow: 'hidden'
	},
	listSeparator: {
		height: scaleVertical(2),
		backgroundColor: colors.gray200
	},
	filterHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 16,
		paddingBottom: 16,
		backgroundColor: colors.background
	},
	filterReset: {
		color: colors.blueAccent
	},
	filterItemSeparator: {
		height: 1,
		backgroundColor: colors.gray100
	}
})

export default createStyle