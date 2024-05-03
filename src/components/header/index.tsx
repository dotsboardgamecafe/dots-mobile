import { TouchableOpacity, View } from 'react-native'
import React from 'react'

import { ArrowLeft } from 'iconsax-react-native'

import styles from './styles'
import { useTheme } from 'react-native-paper'
import { type ThemeType } from '../../models/theme'
import { scaleWidth } from '../../utils/pixel.ratio'
import { useNavigation } from '@react-navigation/native'
import Text from '../text'

interface HeaderProps {
  title?: string
}

const Header = ({ title }: HeaderProps): React.ReactNode => {
	const theme = useTheme<ThemeType>()
	const navigation = useNavigation()

	return (
		<View style={ styles.header }>
			<TouchableOpacity onPress={ navigation.goBack }>
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