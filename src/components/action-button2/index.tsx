import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import styles from './styles'
import Text from '../text'
import { type ActionButton2Props } from './type'
import { useTheme } from 'react-native-paper'
import { type ThemeType } from '../../models/theme'

const ActionButton2 = ({ style, onPress, label }: ActionButton2Props): React.ReactNode => {
	const { colors } = useTheme<ThemeType>()

	return (
		<TouchableOpacity style={ [styles.container, style] } onPress={ onPress }>
			<View style={ styles.shade1 } />
			<View style={ styles.shade2 } />
			<Text variant='bodyMiddleBold' style={ { color: colors.background, zIndex: 2 } }>{ label }</Text>
		</TouchableOpacity>
	)
}

export default React.memo(ActionButton2)