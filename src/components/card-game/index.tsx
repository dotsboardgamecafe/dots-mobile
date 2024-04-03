import React, { useMemo } from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import { Clock, Level, Profile2User } from 'iconsax-react-native'

import { createStyle } from './styles'
import RoundedBorder from '../rounded-border'
import { scaleWidth } from '../../utils/pixel.ratio'
import { type ThemeType } from '../../models/theme'
import { type CardGameProps } from './type'
import Text from '../text'

const CardGame = ({ item, onPress }: CardGameProps): React.ReactNode => {

	const { t } = useTranslation()
	const theme = useTheme<ThemeType>()
	const style = useMemo(() => createStyle(theme), [theme])

	const renderImage = (): React.ReactNode => {
		const image = <Image
			style={ style.image }
			source={ { uri: item.image_url } }
			resizeMode='cover'
		/>

		if (item.is_popular) {
			return (
				<View>
					{ image }
					<View style={ style.popularContainer }>
						<Text variant='bodySmallMedium' style={ style.popularTag }>{ t('main-page.popular') }</Text>
					</View>
				</View>
			)
		}

		return image
	}

	return (
		<RoundedBorder radius={ 12 } borderWidth={ 1 } key={ item.game_code }>
			<TouchableOpacity onPress={ () => onPress && onPress(item) } disabled={ onPress === null }>
				{ renderImage() }
				<Text variant='bodyLargeBold' style={ style.title }>{ item.name }</Text>
				<View style={ style.row }>
					<Profile2User size={ scaleWidth(14) } color={ theme.colors.gray } variant='Bold' />
					<Text variant='bodyMiddleRegular' style={ style.textInfo }>{ t('discover-page.slot') }: 3-5 { t('discover-page.person') }</Text>
				</View>
				<View style={ [style.row, { marginTop: 4 }] }>
					<Level size={ scaleWidth(14) } color={ theme.colors.gray } variant='Bold' />
					<Text variant='bodyMiddleRegular' style={ style.textInfo }>{ t('discover-page.level') }: { item.cafe_id }</Text>
				</View>
				<View style={ [style.row, { marginTop: 4 }] }>
					<Clock size={ scaleWidth(14) } color={ theme.colors.gray } variant='Bold' />
					<Text variant='bodyMiddleRegular' style={ style.textInfo }>{ t('discover-page.duration') }: 20 { t('discover-page.minute') }</Text>
				</View>
				<View style={ style.tagContainer }>
					<Text variant='bodySmallMedium' style={ style.gameTag }>{ item.game_type }</Text>
				</View>
			</TouchableOpacity>
		</RoundedBorder>
	)
}

export default React.memo(
	CardGame,
	(prev, next) => prev.item.game_code === next.item.game_code
)