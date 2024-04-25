import { StyleSheet } from 'react-native'
import { type ThemeType } from '../../models/theme'
import { scaleVertical } from '../../utils/pixel.ratio'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const createStyle = ({ colors }: ThemeType)  => StyleSheet.create({
	notFound: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.background,
		overflow: 'hidden'
	},
	text: {
		marginTop: scaleVertical(8)
	}
})

export default createStyle