import { TouchableOpacity, View } from 'react-native'
import React, { useCallback } from 'react'

import { ArrowLeft } from 'iconsax-react-native'

import styles from './styles'
import { useTheme } from 'react-native-paper'
import { type ThemeType } from '../../models/theme'
import { scaleWidth } from '../../utils/pixel.ratio'
import { useNavigation } from '@react-navigation/native'
import Text from '../text'

interface HeaderProps {
  title?: string,
	onPressBack?: () => void
}

const Header = ({ title, onPressBack }: HeaderProps): React.ReactNode => {
	const theme = useTheme<ThemeType>()
	const navigation = useNavigation()

	const _onPressBack = useCallback(() => {
		if (onPressBack) {
			onPressBack()
		} else {
			navigation.goBack()
		}
	}, [onPressBack])

	return (
		<View style={ styles.header }>
			<TouchableOpacity onPress={ _onPressBack }>
				<ArrowLeft
					variant='Linear'
					color={ theme.colors.onBackground }
					size={ scaleWidth(24) }
				/>
			</TouchableOpacity>
			<Text variant='bodyExtraLargeHeavy' style={ styles.title }>
				{ title }
			</Text>
		</View>
	)
}

export default Header