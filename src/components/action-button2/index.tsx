import React, { useMemo } from 'react'
import { type StyleProp, TouchableOpacity, View, type ViewStyle } from 'react-native'
import styles from './styles'
import Text from '../text'
import { type ActionButton2Props } from './type'
import { useTheme } from 'react-native-paper'
import { type ThemeType } from '../../models/theme'

const ActionButton2 = ({ style, onPress, label, sketchLeft }: ActionButton2Props): React.ReactNode => {
	const { colors } = useTheme<ThemeType>()

	const style2 = useMemo((): StyleProp<ViewStyle> => {
		if (sketchLeft)
			return { ...styles.shade2, left: sketchLeft }

		return styles.shade2
	}, [sketchLeft])

	return (
		<TouchableOpacity style={ [styles.container, style] } onPress={ onPress }>
			<View style={ styles.shade1 } />
			<View style={ style2 } />
			<Text variant='bodyMiddleBold' style={ { color: colors.background, zIndex: 2, alignSelf: 'center' } }>{ label }</Text>
		</TouchableOpacity>
	)
}

export default React.memo(ActionButton2)