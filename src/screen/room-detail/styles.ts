import { StyleSheet } from 'react-native'
import { type ThemeType } from '../../models/theme'
import { scaleHeight, scaleHorizontal, scaleVertical, scaleWidth } from '../../utils/pixel.ratio'
import { SCREEN_HEIGHT, SCREEN_WIDTH, WINDOW_HEIGHT } from '@gorhom/bottom-sheet'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const createStyle = ({ colors }: ThemeType) => StyleSheet.create({
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
	image: {
		width: SCREEN_WIDTH,
		height: scaleHeight(210)
	},
	imageInfo: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: colors.onBackground,
		paddingHorizontal: scaleHorizontal(16),
		paddingVertical: scaleVertical(12)
	},
	imageInfoLabel: {
		color: colors.background
	},
	ph: {
		paddingHorizontal: scaleHorizontal(16),
	},
	ph32: {
		paddingHorizontal: scaleHorizontal(32),
	},
	mh12: {
		marginHorizontal: scaleHorizontal(12)
	},
	mv32: {
		marginVertical: scaleVertical(32)
	},
	quote: {
		marginVertical: scaleVertical(24),
		textAlign: 'center'
	},
	rowDetail: {
		flexDirection: 'row',
		marginTop: scaleVertical(8)
	},
	detailKey: {
		flex: 1,
		color: colors.gray
	},
	detailVal: {
		flex: 3,
		color: colors.onBackground
	},
	gameInfoAction: {
		alignSelf: 'center',
		paddingHorizontal: scaleHorizontal(42),
		marginTop: scaleVertical(24)
	},
	prizes: {
		alignSelf: 'center',
		marginVertical: scaleVertical(24)
	},
	prizesImg: {
		width: '90%',
		height: scaleHeight(210),
		alignSelf: 'center',
		borderRadius: 12
	},
	firstPrizeShadow1: {
		alignSelf: 'center',
		borderRadius: 10,
		marginBottom: scaleVertical(32)
	},
	firstPrizeShadow2: {
		borderRadius: 10
	},
	firstPrizeBorder: {
		position: 'absolute',
		top: scaleWidth(-6),
		bottom: scaleWidth(-6),
		left: scaleWidth(-6),
		right: scaleWidth(-6),
		borderWidth: 2,
		borderColor: colors.background,
		borderRadius: 10
	},
	firstPrizeContent: {
		width: SCREEN_WIDTH * .6,
		height: SCREEN_WIDTH * .6,
		justifyContent: 'center',
		alignItems: 'center'
	},
	firstPriceIcon: {
		position: 'absolute',
		top: scaleWidth(-60),
		left: scaleWidth(-42)
	},
	rowAlignCenter: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	firstPriceBadgeMain: {
		width: scaleWidth(124),
		height: scaleWidth(124),
		marginStart: scaleHorizontal(16),
	},
	firstPriceBadge: {
		width: scaleWidth(72),
		height: scaleWidth(72),
		borderRadius: scaleWidth(36)
	},
	mt8: {
		marginTop: scaleVertical(8),
	},
	mt16: {
		marginTop: scaleVertical(16),
	},
	otherPrize: {
		flexDirection: 'row',
		alignItems: 'center',
		marginHorizontal: scaleHorizontal(32),
		paddingHorizontal: scaleHorizontal(24),
	},
	secondPrize: {
		borderBottomColor: '#fff',
		borderBottomWidth: scaleHeight(2),
	},
	thirdPrize: {
		marginBottom: scaleVertical(24)
	},
	otherPrizeLine: {
		width: scaleWidth(2),
		height: scaleWidth(48),
		alignSelf: 'center',
		backgroundColor: '#fff',
	},
	otherPrizeBadge: {
		width: scaleWidth(24),
		height: scaleWidth(24),
		borderRadius: scaleWidth(16),
	},
	playerContainer: {
		alignContent: 'center',
		marginHorizontal: scaleHorizontal(16),
		paddingTop: scaleVertical(8)
	},
	player: {
		width: scaleWidth(52),
		height: scaleWidth(52),
		borderRadius: 32,
	},
	playerShadow: {
		borderRadius: 32
	},
	playerBorder: {
		position: 'absolute',
		top: scaleWidth(-2),
		bottom: scaleWidth(-2),
		left: scaleWidth(-2),
		right: scaleWidth(-2),
		borderWidth: 1,
		borderColor: colors.background,
		borderRadius: 32
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
	h8: {
		height: scaleHeight(8)
	},
	actionJoin: {
		marginHorizontal: scaleHorizontal(16),
		marginTop: scaleVertical(16),
		marginBottom: SCREEN_HEIGHT - WINDOW_HEIGHT - scaleHeight(24),
		paddingBottom: scaleVertical(32),
		flex: 1,
		justifyContent: 'flex-end'
	},
	labelJoined: {
		marginHorizontal: scaleHorizontal(16),
		marginTop: scaleVertical(16),
		marginBottom: SCREEN_HEIGHT - WINDOW_HEIGHT - scaleHeight(16),
		textAlign: 'center'
	},
	bookingImage: {
		width: scaleWidth(84),
		height: scaleWidth(84),
		borderRadius: 8,
		marginVertical: scaleVertical(16)
	},
	bookingTitle: {
		marginBottom: scaleVertical(16)
	},
	bookingRow: {
		flexDirection: 'row'
	},
	bookingKey: {
		textAlign: 'right',
		flex: 1
	},
	bookingVal: {
		flex: 2,
		marginStart: scaleHorizontal(8)
	},
})

export default createStyle