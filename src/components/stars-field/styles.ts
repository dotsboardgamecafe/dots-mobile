import { fullWidth, scaleHeight } from '../../utils/pixel.ratio'
import { type StyleProps } from 'react-native-reanimated'

const styles: StyleProps = {
	containerStyle: {
		backgroundColor: 'black',
		position: 'relative',
		zIndex: 99
	},
	smokeImageStyle: (height: number) => ({
		width: fullWidth,
		height: scaleHeight(height),
		opacity: 0.3
	})
}

export default styles