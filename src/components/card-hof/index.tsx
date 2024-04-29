import React from 'react'
import { Image, View } from 'react-native'

import { type HOFType } from '../../screen/champion/data'
import Text from '../text'
import { CardHofBG } from '../../assets/images'
import styles from './styles'

const CardHof = (item: HOFType): React.ReactNode => {

	return (
		<View>
			<View style={ styles.content }>
				<Image
					source={ { uri: item.game.image_url } }
					style={ styles.gameImage }
					resizeMode='cover'
				/>
				<Image
					source={ { uri: item.player.image_url } }
					style={ styles.playerImage }
				/>
				<Text variant='bodyMiddleBold' style={ styles.playerName }>{ item.player.fullname }</Text>
				<Text variant='bodySmallRegular'>{ item.location }</Text>
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