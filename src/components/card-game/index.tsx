import React, { useMemo } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import { Clock, Level, Profile2User } from 'iconsax-react-native'

import { styles } from './styles'
import RoundedBorder from '../rounded-border'
import { scaleWidth } from '../../utils/pixel.ratio'
import { type ThemeType } from '../../models/theme'
import { type CardGameProps } from './type'
import Text from '../text'
import Image from '../image'

const CardGame = ({ item, onPress, style }: CardGameProps): React.ReactNode => {

	const { t } = useTranslation()
	const theme = useTheme<ThemeType>()

	const renderImage = (): React.ReactNode => {
		const image = <View style={ styles.imageContainer }>
			<Image
				style={ styles.image }
				source={ { uri: item.image_url } }
				resizeMode='cover'
			/>
		</View>

		if (item.is_popular) {
			return (
				<View>
					{ image }
					<View style={ styles.popularContainer }>
						<Text variant='bodySmallMedium' style={ styles.popularTag }>{ t('main-page.popular') }</Text>
					</View>
				</View>
			)
		}

		return image
	}

	const _gameLocation = useMemo(() => {
		if (item.location)
			return (
				<View style={ styles.tagContainer }>
					<Text variant='bodySmallMedium' style={ styles.gameTag }>{ item.location.charAt(0).toUpperCase() + item.location.slice(1) }</Text>
				</View>
			)
	}, [item])

	return (
		<RoundedBorder style={ style } radius={ 12 } borderWidth={ 1 } key={ item.game_code }>
			<TouchableOpacity onPress={ () => { onPress && onPress(item) } } disabled={ onPress === null }>
				{ renderImage() }
				<Text variant='bodyLargeBold' style={ styles.title }>{ item.name }</Text>
				<View style={ styles.row }>
					<Profile2User size={ scaleWidth(14) } color={ theme.colors.gray } variant='Bold' />
					<Text variant='bodyMiddleRegular' style={ styles.textInfo }>{ t('discover-page.slot') }: { item.minimal_participant }-{ item.maximum_participant } { t('discover-page.person') }</Text>
				</View>
				<View style={ [styles.row, { marginTop: 4 }] }>
					<Level size={ scaleWidth(14) } color={ theme.colors.gray } variant='Bold' />
					<Text variant='bodyMiddleRegular' style={ styles.textInfo }>{ t('discover-page.level') }: { item.difficulty }</Text>
				</View>
				<View style={ [styles.row, { marginTop: 4 }] }>
					<Clock size={ scaleWidth(14) } color={ theme.colors.gray } variant='Bold' />
					<Text variant='bodyMiddleRegular' style={ styles.textInfo }>{ t('discover-page.duration') }: { item.duration } { t('discover-page.minute') }</Text>
				</View>
				{ _gameLocation }
			</TouchableOpacity>
		</RoundedBorder>
	)
}

export default React.memo(
	CardGame,
	// (prev, next) => prev.item.game_code === next.item.game_code
)