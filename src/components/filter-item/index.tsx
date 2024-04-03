import React from 'react'
import { type FilterItemType } from './type'
import { TouchableOpacity } from 'react-native'
import { useTheme } from 'react-native-paper'
import { type ThemeType } from '../../models/theme'
import { scaleHeight, scaleWidth } from '../../utils/pixel.ratio'
import Text from '../text'

const FilterItem = ({ label, style, prefix, suffix, onPress }: FilterItemType): React.ReactNode => {
	const { colors } = useTheme<ThemeType>()

	return (
		<TouchableOpacity
			onPress={ onPress }
			style={ [{
				flexDirection: 'row',
				alignItems: 'center',
				borderRadius: 16,
				backgroundColor: colors.background,
				paddingHorizontal: scaleWidth(12),
				paddingVertical: scaleHeight(8)
			}, style] }>
			{ prefix }
			<Text variant='bodyMiddleRegular' style={ { color: colors.onBackground } }>{ label }</Text>
			{ suffix }
		</TouchableOpacity>
	)
}

export default React.memo(FilterItem)