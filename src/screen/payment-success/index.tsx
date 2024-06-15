import { FlatList, Image, ScrollView, View } from 'react-native'
import React, { useCallback } from 'react'
import Container from '../../components/container'
import styles from './styles'
import withCommon from '../../hoc/with-common'
import Text from '../../components/text'
import { type NavigationProps } from '../../models/navigation'
import { paymentSuccessIllu } from '../../assets/images'
import ActionButton from '../../components/action-button'
import CardGame from '../../components/card-game'
import { useGetDetailGameQuery } from '../../store/game'
import { type Games } from '../../models/games'

type Props = NavigationProps<'paymentSuccess'>

const PaymentSuccess = ({ t, route, navigation }: Props): React.ReactNode => {
	const { game_code } = route.params
	const { data: game } = useGetDetailGameQuery(game_code ?? '')
	
	const navigateToDetail = useCallback((game: Games) => {
		navigation.replace('gameDetail', game)
	}, [])
	
	const navigateToTransaction = useCallback(() => {
		navigation.replace('transactions')
	}, [])

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
						onPress={ navigateToTransaction }
					/>
				</View>
				<View style={ styles.relatedGameWrapperStyle }>
					{ game?.game_related && <Text variant='bodyExtraLargeHeavy' style={ styles.relatedGameTitleStyle }>{ t('payment-success.related-games') }</Text> }
					<FlatList
						scrollEnabled={ false }
						data={ game?.game_related }
						keyExtractor={ item => item.game_code }
						renderItem={ ({ item }) => <CardGame style={ { flex: 1 / 2 } } item={ item } onPress={ navigateToDetail } /> }
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