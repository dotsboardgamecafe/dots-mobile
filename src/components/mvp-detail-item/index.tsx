import React from 'react'
import { Image, View } from 'react-native'
import { useTheme } from 'react-native-paper'

import VP from '../../assets/svg/VP.svg'
import { scaleWidth } from '../../utils/pixel.ratio'
import Text from '../text'
import { type ThemeType } from '../../models/theme'
import createStyle from './styles'
import { type MvpItemProps } from '../mvp-item/type'

const MvpDetailItem = ({ item, index, showVP }: MvpItemProps): React.ReactNode => {
	const theme = useTheme<ThemeType>()
	const styles = createStyle(theme)

	return (
		<View style={ styles.container }>
			<Text variant='bodyMiddleMedium' style={ styles.rank }>{ index + 1 }</Text>
			<Image
				source={ { uri: item.photo } }
				resizeMode='cover'
				style={ styles.image }
			/>
			<Text variant='bodyMiddleMedium' style={ styles.name }>{ item.name }</Text>
			<Text variant='bodyMiddleMedium'>{ item.vp }</Text>
			{ showVP && <VP width={ scaleWidth(14) } /> }
		</View>
	)
}

export default React.memo(MvpDetailItem)