import { fullWidth, scaleHeight } from '../../utils/pixel.ratio'
import { type StyleProps } from 'react-native-reanimated'

const styles: StyleProps = {
	containerStyle: {
		backgroundColor: 'black',
		position: 'relative',
		overflow: 'hidden'
	},
	smokeImageStyle: (height: number) => ({
		width: fullWidth,
		height: scaleHeight(height),
		opacity: 0.3
	}),
	starWrapperStyle: {
		flexGrow: 1,
		borderWidth: 1,
		borderColor: 'transparent'
	 }
}

export default styles