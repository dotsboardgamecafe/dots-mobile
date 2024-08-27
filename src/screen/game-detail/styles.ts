import { Platform, StatusBar, StyleSheet } from 'react-native'
import { scaleHeight, scaleHorizontal, scaleVertical, scaleWidth } from '../../utils/pixel.ratio'
import { type ThemeType } from '../../models/theme'
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet'

const statusBarHeight = Platform.OS === 'ios' ? 0 : StatusBar.currentHeight

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const createStyle = ({ colors }: ThemeType) => StyleSheet.create({
	container: {
		paddingTop: 0,
	},
	contentTop: {
		paddingHorizontal: scaleHorizontal(16),
		// paddingTop: statusBarHeight,
		paddingBottom: scaleVertical(16),
		overflow: 'hidden',
	},
	header: {
		// position: 'absolute',
		// top: 0,
		// start: 0,
		// end: 0,
		// zIndex: 1,
		paddingHorizontal: scaleHorizontal(16),
		paddingTop: statusBarHeight,
		paddingBottom: scaleVertical(16),
		flexDirection: 'row',
		alignItems: 'center'
	},
	title: {
		flex: 1,
		marginHorizontal: scaleHorizontal(12)
	},
	blush: {
		position: 'absolute',
		width: 100,
		height: 100,
		borderRadius: 100,
	},
	blushYellow: {
		zIndex: 1,
		top: 100,
		left: '10%',
	},
	blushBlue: {
		top: 150,
		end: 0,
	},
	blushRed: {
		top: 220,
		start: '40%',
		borderRadius: 50
	},
	gameContainer: {
		marginTop: scaleHeight(32),
		alignSelf: 'center',
		borderRadius: scaleWidth(120),
		width: scaleWidth(240),
		padding: 5
	},
	gameImageBg: {
		marginTop: scaleVertical(16),
		alignSelf: 'center',
		width: 220,
		height: 220,
		padding: 12,
	},
	gameImage: {
		borderRadius: scaleWidth(120),
		width: '100%',
		height: '100%',
		// aspectRatio: 1,
		backgroundColor: colors.background,
		borderWidth: scaleWidth(3),
		borderColor: colors.background
	},
	players: {
		marginTop: scaleVertical(24),
		flexDirection: 'row',
		alignItems: 'center',
	},
	avatarContainer: {
		flexGrow: 0
	},
	avatar: {
		borderRadius: 12,
		borderColor: colors.background,
		borderWidth: scaleWidth(1.5),
		width: scaleWidth(22),
		height: scaleWidth(22),
	},
	avatarNotFirst: {
		marginStart: -8
	},
	popularContainer: {
		backgroundColor: colors.background,
		borderRadius: 12,
		paddingVertical: scaleHeight(2),
		paddingHorizontal: scaleWidth(8)
	},
	popularTag: {
		color: colors.redAccent,
	},
	infoContainer: {
		alignItems: 'stretch',
		backgroundColor: colors.background,
		padding: scaleHorizontal(16)
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	mt8: {
		marginTop: scaleVertical(8)
	},
	mt12: {
		marginTop: scaleVertical(12)
	},
	mt16: {
		marginTop: scaleVertical(16)
	},
	section: {
		paddingHorizontal: scaleHorizontal(16),
		paddingBottom: scaleVertical(16)
	},
	sectionTitle: {
		marginTop: scaleVertical(32)
	},
	sectionTitleHowTo: {
		marginHorizontal: scaleHorizontal(16),
		// marginTop: scaleVertical(16)
	},
	contReading: {
		color: colors.blueAccent,
		marginTop: scaleVertical(8)
	},
	gamePlay: {
		width: SCREEN_WIDTH - scaleWidth(32),
		height: scaleHeight(220),
		marginVertical: scaleVertical(16),
		borderRadius: 16,
		marginHorizontal: scaleHorizontal(16)
	},
	gameMaster: {
		width: scaleWidth(64),
		height: scaleWidth(64),
		borderRadius: 32,
	},
	room: {
		width: '100%',
		height: scaleHeight(144),
		borderRadius: 16,
	},
	wrapList: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		marginTop: scaleHeight(12),
		flexGrow: 0,
		flexShrink: 1,
		flex: 0
	},
	list: {
		marginTop: scaleVertical(10)
	},
	columnWrapper: {
		gap: scaleWidth(10)
	},
})

export default createStyle