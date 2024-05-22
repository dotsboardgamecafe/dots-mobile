import React from 'react'
import { Image, View } from 'react-native'

import Text from '../text'
import { CardHofBG } from '../../assets/images'
import styles from './styles'
import { type HallOfFame } from '../../models/champions'

const CardHof = (item: HallOfFame): React.ReactNode => {

	return (
		<View>
			<View style={ styles.content }>
				<Image
					source={ { uri: item.tournament_banner_url } }
					style={ styles.gameImage }
					resizeMode='cover'
				/>
				<Image
					source={ { uri: item.user_img_url } }
					style={ styles.playerImage }
				/>
				<Text variant='bodyMiddleBold' style={ styles.playerName }>{ item.user_name }</Text>
				<Text variant='bodySmallRegular'>{ item.cafe_name }</Text>
			</View>
			<Image
				source={ CardHofBG }
				style={ styles.bg }
				resizeMode='stretch'
			/>
		</View>
	)
}

export default React.memo(CardHof)