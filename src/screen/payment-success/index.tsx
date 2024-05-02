import { FlatList, Image, ScrollView, View } from 'react-native'
import React from 'react'
import Container from '../../components/container'
import styles from './styles'
import withCommon from '../../hoc/with-common'
import Text from '../../components/text'
import { type NavigationProps } from '../../models/navigation'
import { paymentSuccessIllu } from '../../assets/images'
import ActionButton from '../../components/action-button'
import CardGame from '../../components/card-game'

type Props = NavigationProps<'paymentSuccess'>

const games: any[] = Array.from({ length: 30 }, (_, i) => ({
	game_code: `CODE-${i + 1}`,
	game_type: 'War Game',
	cafe_id: 1,
	name: `Rising Game ${i + 1}`,
	image_url: 'https://cf.geekdo-images.com/dT1vJbUizZFmJAphKg-byA__opengraph/img/Y6XRS8qo8oR5g7p_PUAz8qqjIY4=/0x447:960x951/fit-in/1200x630/filters:strip_icc()/pic7720813.png',
	description: '',
	collection_url: '',
	status: 'ok',
	created_date: '01-01-2024',
	is_popular: i < 4
}))

const PaymentSuccess = ({ t }: Props): React.ReactNode => {
	
	return (
		<Container containerStyle={ styles.container }>
			<ScrollView showsVerticalScrollIndicator={ false } bounces={ false }>
				<View style={ styles.messageWrapper }>
					<Text variant='bodyExtraLargeHeavy'>{ t('payment-success.title') }</Text>
					<Text variant='bodyMiddleMedium' style={ styles.subtitle }>{ t('payment-success.subtitle') }</Text>
					<Image style={ styles.image } source={ paymentSuccessIllu } resizeMode='cover' />
					<ActionButton
						label={ t('payment-success.button-history') }
						style={ styles.buttonHistory }
					/>
				</View>
				<View style={ styles.relatedGameWrapperStyle }>
					<Text variant='bodyExtraLargeHeavy' style={ styles.relatedGameTitleStyle }>{ t('payment-success.related-games') }</Text>
					<FlatList
						scrollEnabled={ false }
						data={ games }
						keyExtractor={ item => item.game_code }
						renderItem={ ({ item }) => <CardGame { ...item } /> }
						ItemSeparatorComponent={ () => <View style={ { height: 10 } } /> }
						style={ styles.listStyle }
						columnWrapperStyle={ styles.columnWrapper }
						numColumns={ 2 }
						contentContainerStyle={ styles.listGameWrapperStyle }
					/>
				</View>
			</ScrollView>
		</Container>
	)
}

export default withCommon(React.memo(PaymentSuccess))