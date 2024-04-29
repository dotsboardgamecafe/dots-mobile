import React from 'react'

import RoundedBorder from '../rounded-border'
import Text from '../text'
import ActionButton2 from '../action-button2'
import { type CardChampionType } from './type'
import Blush from '../blush'
import styles from './styles'
import { useTranslation } from 'react-i18next'

const CardChampion = ({ children, title, onClickSeeMore }: CardChampionType): React.ReactNode => {
	const { t } = useTranslation()
	return (
		<RoundedBorder radius={ 20 } contentStyle={ styles.cardBorder }>
			<Blush
				color={ '#EE46BC30' }
				distance={ 80 }
				style={ styles.blush1 }
				opacity={ .3 }
			/>
			<Blush
				color={ '#FB651430' }
				distance={ 80 }
				style={ styles.blush2 }
				opacity={ .3 }
			/>
			<Blush
				color={ '#2E90FA30' }
				distance={ 80 }
				style={ styles.blush3 }
				opacity={ .3 }
			/>
			<Blush
				color={ '#12B76A30' }
				distance={ 80 }
				style={ styles.blush4 }
				opacity={ .3 }
			/>
			<Text variant='headingBold' style={ { alignSelf: 'center' } }>{ title }</Text>
			{ children }
			<ActionButton2
				label={ t('champion-page.see-more') }
				sketchLeft='-12%'
				onPress={ () => {
					onClickSeeMore && onClickSeeMore()
				} }
			/>
		</RoundedBorder>
	)
}

export default React.memo(CardChampion)