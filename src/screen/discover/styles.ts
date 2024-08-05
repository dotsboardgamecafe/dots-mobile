import { StyleSheet } from 'react-native'
import { scaleFont, scaleHeight, scaleWidth } from '../../utils/pixel.ratio'
import { colorsTheme } from '../../constants/theme'

const styles = StyleSheet.create({
	searchContainer: {
		marginHorizontal: scaleWidth(10),
		marginTop: scaleHeight(16),
	},

	search: {
		flex: 1,
		marginStart: scaleWidth(4),
		borderWidth: 0,
		color: 'red',
		fontFamily: 'FuturaPTBook'
	},

	filterContainer: {
		marginStart: scaleWidth(10),
		marginTop: scaleHeight(16),
		flexDirection: 'row'
	},

	list: {
		marginHorizontal: scaleWidth(10),
		marginTop: scaleHeight(10)
	},

	columnWrapper: {
		gap: scaleWidth(10)
	},

	bottomSheet: {
		alignItems: 'stretch',
		paddingHorizontal: scaleWidth(16),
		paddingBottom: scaleHeight(16),
		zIndex: 99
	},

	bsHead: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},

	bsTitle: {
		fontWeight: 'bold',
		fontSize: scaleFont(20),
		lineHeight: scaleHeight(25)
	},

	filterReset: {
		fontWeight: 'bold',
		fontSize: scaleFont(16),
		lineHeight: scaleHeight(20),
		color: colorsTheme.blueAccent
	},

	filterSecTitle: {
		marginTop: scaleHeight(20),
		fontWeight: 'bold',
		fontSize: scaleFont(16),
		lineHeight: scaleHeight(20)
	},

	wrapList: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		marginTop: scaleHeight(8)
	},

	filterAction: {
		marginTop: scaleHeight(20)
	}
})

export default styles