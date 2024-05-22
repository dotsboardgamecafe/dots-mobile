import { type StyleProps } from 'react-native-reanimated'
import { fullWidth, scaleVertical, scaleWidth } from '../../utils/pixel.ratio'
import { colorsTheme } from '../../constants/theme'

const styles:StyleProps = {
	flexStyle: {
		flex: 1
	},
	indicatorStyle: (length: number) => ({
		position: 'absolute',
		bottom: 0,
		width: fullWidth / length,
		height: 2,
		marginTop: scaleVertical(10)
	}),
	tabsStyle: (length: number) => ({
		width: fullWidth / length,
		justifyContent: 'center',
		alignItems: 'center',
		padding: scaleWidth(10),
	}),
	labelStyle: (isSelected: boolean) => ({
		color: isSelected ? colorsTheme.black : colorsTheme.gray500
	}),
	contentContainerStyle: {
		borderBottomColor: colorsTheme.gray300,
		borderBottomWidth: 1
	}
}

export default styles