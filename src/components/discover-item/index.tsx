import React, { useMemo } from 'react'
import { Image, View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import { Clock, Level, Profile2User } from 'iconsax-react-native'

import { createStyle } from './styles'
import RoundedBorder from '../rounded-border'
import { type Games } from '../../models/games'
import { scaleWidth } from '../../utils/pixel.ratio'
import { type ThemeType } from '../../models/theme'

const DiscoverItem = (item: Games): React.ReactNode => {

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
						<Text style={ style.popularTag }>{ t('main-page.popular') }</Text>
					</View>
				</View>
			)
		}

		return image
	}

	return (
		<RoundedBorder radius={ 12 } borderWidth={ 1 } key={ item.game_code }>
			{ renderImage() }
			<Text style={ style.title }>{ item.name }</Text>
			<View style={ style.row }>
				<Profile2User size={ scaleWidth(14) } color={ theme.colors.gray } variant='Bold' />
				<Text style={ style.textInfo }>{ t('discover-page.slot') }: 3-5 { t('discover-page.person') }</Text>
			</View>
			<View style={ [style.row, { marginTop: 4 }] }>
				<Level size={ scaleWidth(14) } color={ theme.colors.gray } variant='Bold' />
				<Text style={ style.textInfo }>{ t('discover-page.level') }: { item.cafe_id }</Text>
			</View>
			<View style={ [style.row, { marginTop: 4 }] }>
				<Clock size={ scaleWidth(14) } color={ theme.colors.gray } variant='Bold' />
				<Text style={ style.textInfo }>{ t('discover-page.duration') }: 20 { t('discover-page.minute') }</Text>
			</View>
			<View style={ style.tagContainer }>
				<Text style={ style.gameTag }>{ item.game_type }</Text>
			</View>
		</RoundedBorder>
	)
}

export default React.memo(
	DiscoverItem,
	(prev, next) => prev.game_code === next.game_code
)