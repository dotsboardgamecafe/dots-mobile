import React, { useCallback } from 'react'
import { Image, View } from 'react-native'
import { useTheme } from 'react-native-paper'

import MedalGold from '../../assets/svg/MedalGold.svg'
import MedalSilver from '../../assets/svg/MedalSilver.svg'
import MedalBronze from '../../assets/svg/MedalBronze.svg'
import VP from '../../assets/svg/VP.svg'
import { scaleWidth } from '../../utils/pixel.ratio'
import Text from '../text'
import styles from './styles'
import { type MvpItemProps } from './type'
import { type ThemeType } from '../../models/theme'

const MvpItem = ({ item, index, showVP }: MvpItemProps): React.ReactNode => {
	const theme = useTheme<ThemeType>()

	const medal = useCallback((index: number) => {
		if (index === 0) return <MedalGold width={ scaleWidth(18) } />
		if (index === 1) return <MedalSilver width={ scaleWidth(18) } />
		if (index === 2) return <MedalBronze width={ scaleWidth(18) } />
		return <Text style={ styles.medalText }>{ index + 1 }</Text>
	}, [])

	return (
		<View style={ [
			styles.mvpItemContainer,
			{ backgroundColor: index === 0 ? '#EDE4CF' : index === 1 ? '#E6E6E7' : index === 2 ? '#E8DCD1' : theme.colors.background }
		] }>
			{ medal(index) }
			<Image
				source={ { uri: item.user_img_url } }
				resizeMode='cover'
				style={ styles.mvpPlayerImage }
			/>
			<Text variant='bodyMiddleRegular' style={ styles.mvpPlayerName }>{ item.user_name }</Text>
			<Text variant='bodyMiddleMedium' style={ styles.mvpVp }>{ showVP ? item.total_point : item.total_game_played }</Text>
			{ showVP && <VP width={ scaleWidth(14) } /> }
		</View>
	)
}

export default React.memo(MvpItem)