import React from 'react'
import { View } from 'react-native'
import { useTheme } from 'react-native-paper'

import VP from '../../assets/svg/VP.svg'
import { scaleWidth } from '../../utils/pixel.ratio'
import Text from '../text'
import { type ThemeType } from '../../models/theme'
import createStyle from './styles'
import { type MvpItemProps } from '../mvp-item/type'
import Image from '../image'
import { LOGO } from '../../assets/images'

const MvpDetailItem = ({ item, index, showVP }: MvpItemProps): React.ReactNode => {
	const theme = useTheme<ThemeType>()
	const styles = createStyle(theme)

	return (
		<View style={ styles.container }>
			<Text variant='bodyMiddleMedium' style={ styles.rank }>{ index + 1 }</Text>
			<Image
				source={ { uri: item.user_img_url } }
				resizeMode='cover'
				style={ styles.image }
				fallbackImg={ LOGO }
			/>
			<Text variant='bodyMiddleMedium' style={ styles.name }>{ item.user_name }</Text>
			<Text variant='bodyMiddleMedium'>{ showVP ? item.total_point : item.total_game_played }</Text>
			{ showVP && <VP width={ scaleWidth(14) } /> }
		</View>
	)
}

export default React.memo(MvpDetailItem)