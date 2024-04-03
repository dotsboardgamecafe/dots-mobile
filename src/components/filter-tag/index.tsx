import React, { useMemo } from 'react'
import { TouchableOpacity } from 'react-native'
import { useTheme } from 'react-native-paper'

import RoundedBorder from '../rounded-border'
import { type ThemeType } from '../../models/theme'
import createStyle from './styles'
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
	const style = createStyle(theme)

	const content = useMemo(() => (
		<TouchableOpacity
			style={ [
				style.content,
				!active && style.inactive,
				!onClick && { backgroundColor: theme.colors.background }
			] }
			onPress={ () => onClick && onClick(id) }
			disabled={ onClick !== null }
		>
			{ icon }
			<Text variant='bodyMiddleRegular' style={ icon ? style.hasIcon : {} }>{ label }</Text>
		</TouchableOpacity>
	), [active])

	if (active)
		return (
			<RoundedBorder
				radius={ 16 }
				style={ style.container }
				contentStyle={ style.active }
			>
				{ content }
			</RoundedBorder>
		)

	return content
}

export default React.memo(
	FilterTag,
	(prev, next) => prev.active === next.active
)