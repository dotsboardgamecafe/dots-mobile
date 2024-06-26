import React from 'react'
import { TouchableOpacity } from 'react-native'
import { type FilterItemListProps } from './type'
import { useTheme } from 'react-native-paper'

import Text from '../text'
import { TickCircle } from 'iconsax-react-native'
import { type ThemeType } from '../../models/theme'
import styles from './styles'

const FilterItemList = ({ label, selected, onClick, clickParam }: FilterItemListProps): React.ReactNode => {
	const theme = useTheme<ThemeType>()
	return (
		<TouchableOpacity onPress={ () => { onClick(label, clickParam) } } style={ styles.filterItem }>
			<Text variant='bodyMiddleMedium'>{ label }</Text>
			{ selected && <TickCircle size={ 14 } color={ theme.colors.onBackground } /> }
		</TouchableOpacity>
	)
}

export default React.memo(FilterItemList)