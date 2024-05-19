import React, { useMemo } from 'react'
import { TouchableOpacity } from 'react-native'
import { useTheme } from 'react-native-paper'

import RoundedBorder from '../rounded-border'
import { type ThemeType } from '../../models/theme'
import styles from './styles'
import { type FilterTagType } from './type'
import Text from '../text'

const FilterTag = ({
	id,
	icon,
	label,
	active,
	onClick,
}: FilterTagType): React.ReactNode => {

	const theme = useTheme<ThemeType>()

	const content = useMemo(() => (
		<TouchableOpacity
			style={ [
				styles.content,
				!active && styles.inactive,
				!onClick && { backgroundColor: theme.colors.background }
			] }
			onPress={ () => { onClick && onClick(id, label) } }
			disabled={ !onClick }
		>
			{ icon }
			<Text variant='bodyMiddleRegular' style={ icon ? styles.hasIcon : {} }>{ label }</Text>
		</TouchableOpacity>
	), [active])

	if (active)
		return (
			<RoundedBorder
				radius={ 16 }
				style={ styles.container }
				contentStyle={ styles.active }
			>
				{ content }
			</RoundedBorder>
		)

	return content
}

export default React.memo(
	FilterTag,
	// (prev, next) => prev.active === next.active
)