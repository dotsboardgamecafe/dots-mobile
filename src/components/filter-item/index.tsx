import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useTheme } from 'react-native-paper'

import { type FilterItemType } from './type'
import { type ThemeType } from '../../models/theme'
import Text from '../text'
import createStyle from './styles'

const FilterItem = ({ label, style, prefix, suffix, onPress }: FilterItemType): React.ReactNode => {
	const theme = useTheme<ThemeType>()
	const styles = createStyle(theme)

	return (
		<TouchableOpacity
			onPress={ onPress }
			style={ [styles.container, style] }>
			{ prefix }
			<Text variant='bodyMiddleRegular' style={ styles.label }>{ label }</Text>
			{ suffix }
		</TouchableOpacity>
	)
}

export default React.memo(FilterItem)