import { Platform, StyleSheet } from 'react-native'
import {
	fullWidth,
	scaleFont, scaleHeight, scaleHorizontal, scaleVertical, scaleWidth
} from '../../utils/pixel.ratio'
import { colorsTheme } from '../../constants/theme'

const styles = StyleSheet.create({
	contentStyle: {
		marginTop: scaleVertical(24)
	},
	scrollContentStyle: {
		paddingBottom: scaleHeight(100)
	},
	sectionWrapperStyle: {
		marginHorizontal: scaleHorizontal(16)
	},
	headerWrapperStyle: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: scaleVertical(16),
		alignItems: 'center'
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#000000',
	},
	galaxyContainer: {
		position: 'absolute',
	},
	avatarWrapperStyle: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	avatarStyle: {
		backgroundColor: colorsTheme.black
	},
	greetingTextStyle: {
		fontSize: scaleFont(14)
	},
	greetingWrapperStyle: {
		marginLeft: scaleHorizontal(10)
	},
	rightHeaderWrapperStyle: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: scaleWidth(80)
	},
	iconWrapperStyle: {
		width: scaleWidth(32),
		height: scaleHeight(32),
		backgroundColor: colorsTheme.lightWhite,
		borderRadius: 100,
		alignItems: 'center',
		justifyContent: 'center'
	},
	starFieldStyle: {
		height: scaleHeight(140),
		borderRadius: 20
	},
	loadingStarFieldStyle: {
		alignItems: 'center',
		justifyContent: 'center'
	},
	tierWrapperStyle: {
		borderRadius: 15,
		marginBottom: scaleVertical(24),
		height: scaleHeight(140)
	},
	badgeStyle: {
		position: 'absolute',
		top: 0,
		width: scaleWidth(16),
		height: scaleHeight(16),
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: colorsTheme.redAccent,
		borderRadius: 100,
		right: 0
	},
	badgeTextStyle: {
		color: colorsTheme.background
	},
	listGameWrapperStyle: {
		marginTop: scaleHeight(24),
	},
	listGameStyle: {
		marginTop: scaleHeight(16)
	},
	gameItemWrapperStyle: {
		flexDirection: 'row'
	},
	imageGameStyle: {
		width: scaleWidth(58),
		height: scaleHeight(58),
		borderRadius: 8,
		marginRight: scaleHorizontal(8)
	},
	gameDescriptionWrapperStyle: {
		flex: 1
	},
	gameLatestUpdateLabelStyle: {
		marginBottom: scaleVertical(4),
		color: colorsTheme.gray500
	},
	gameDescriptionLabelStyle: {
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	listGameSeparatorStyle: {
		marginVertical: scaleVertical(16),
		height: 1,
		backgroundColor: colorsTheme.background
	},
	hightLightDescriptionStyle: {
		color: colorsTheme.blueAccent,
	},
	indicatorWrapperStyle: {
		position: 'absolute',
		bottom: 10,
		right: 0,
		left: 0,
		alignItems: 'center'
	},
	bannerStyle: {
		width: fullWidth,
		height: scaleHeight(180)
	},
	activityHighlightListStyle: {
		paddingBottom: scaleHeight(Platform.OS === 'ios' ? 10 : 30)
	}
})

export default styles