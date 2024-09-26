import { TouchableOpacity, View } from 'react-native'
import React, { useCallback } from 'react'

import { ArrowLeft } from 'iconsax-react-native'

import styles from './styles'
import { scaleWidth } from '../../utils/pixel.ratio'
import { useNavigation } from '@react-navigation/native'
import Text from '../text'
import { type StyleProps } from 'react-native-reanimated'
import { colorsTheme } from '../../constants/theme'

interface HeaderProps {
  title?: string,
	onPressBack?: () => void,
	titleStyle?: StyleProps,
	arrowColor?: string
	style?: StyleProps,
}

const Header = ({ title, onPressBack, titleStyle, arrowColor = colorsTheme.black, style }: HeaderProps): React.ReactNode => {
	const navigation = useNavigation()

	const _onPressBack = useCallback(() => {
		if (onPressBack) {
			onPressBack()
		} else {
			navigation.goBack()
		}
	}, [onPressBack])

	return (
		<View style={ [styles.header, style] }>
			<TouchableOpacity onPress={ _onPressBack }>
				<ArrowLeft
					variant='Linear'
					color={ arrowColor }
					size={ scaleWidth(24) }
				/>
			</TouchableOpacity>
			<Text variant='bodyExtraLargeHeavy' style={ [styles.title, titleStyle] }>
				{ title }
			</Text>
		</View>
	)
}

export default Header