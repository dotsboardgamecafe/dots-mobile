import React, { useMemo } from 'react'
import { FlatList, View } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@gorhom/bottom-sheet'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

import Container from '../../components/container'
import { type NavigationProps } from '../../models/navigation'
import withCommon from '../../hoc/with-common'
import { getStatusBarHeight, scaleHeight, scaleVertical, scaleWidth } from '../../utils/pixel.ratio'
import styles from './styles'
import CardChampion from '../../components/card-champion'
import CardHof from '../../components/card-hof'
import MvpItem from '../../components/mvp-item'
import { useSharedValue } from 'react-native-reanimated'
import PageIndicator from '../../components/page-indicator'
import { useGetHallOfFameQuery, useGetMonthlyTopAchieverQuery } from '../../store/champion'
import { type MostVPParam } from '../../models/champions'

type Props = NavigationProps<'champion'>

const Champion = ({ t, navigation }: Props): React.ReactNode => {
	const statusBarHeight = getStatusBarHeight() ?? 0
	const navBarHeight = useBottomTabBarHeight()
	const progressValue = useSharedValue<number>(0)
	const date = new Date()
	const param: MostVPParam = {
		month: date.getMonth() + 1,
		year: date.getFullYear()
	}
	const { data: mvpData, isLoading: loadingMvp, refetch: refetchMvp } = useGetMonthlyTopAchieverQuery({ ...param, category: 'vp' })
	const { data: uniqueData, isLoading: loadingUnique, refetch: refetchUnique } = useGetMonthlyTopAchieverQuery({ ...param, category: 'unique_game' })
	const { data: hallData, isLoading: loadingHall, refetch: refetchHall } = useGetHallOfFameQuery(date.getFullYear())

	const cardMVP = useMemo(() => {
		return (
			<CardChampion
				title={ t('champion-page.mvp') }
				onClickSeeMore={ () => { navigation.navigate('mvp', {}) } }
			>
				<FlatList
					data={ mvpData?.slice(0, 10) }
					keyExtractor={ (item, index) => `${item.rank}.${item.user_name}.${index}` }
					renderItem={ ({ item, index }) => <MvpItem item={ item } index={ index } showVP /> }
					contentContainerStyle={ { flexGrow: 1 } }
					style={ { marginVertical: scaleVertical(16) } }
					showsVerticalScrollIndicator={ false }
					ItemSeparatorComponent={ () => <View style={ { height: scaleVertical(8) } } /> }
					refreshing={ loadingMvp }
					onRefresh={ refetchMvp }
				/>
			</CardChampion>
		)
	}, [mvpData])

	const cardUnique = useMemo(() => {
		return (
			<CardChampion
				title={ t('champion-page.unique') }
				onClickSeeMore={ () => { navigation.navigate('mvp', { unique: true }) } }
			>
				<FlatList
					data={ uniqueData?.slice(0, 10) }
					keyExtractor={ (item, index) => `${item.rank}.${item.user_name}.${index}` }
					renderItem={ ({ item, index }) => <MvpItem item={ item } index={ index } showVP={ false } /> }
					contentContainerStyle={ { flexGrow: 1 } }
					style={ { marginVertical: scaleVertical(16) } }
					showsVerticalScrollIndicator={ false }
					ItemSeparatorComponent={ () => <View style={ { height: scaleVertical(8) } } /> }
					refreshing={ loadingUnique }
					onRefresh={ refetchUnique }
				/>
			</CardChampion>
		)
	}, [uniqueData])

	const cardHof = useMemo(() => {
		return (
			<CardChampion
				title={ t('champion-page.hof') }
				onClickSeeMore={ () => { navigation.navigate('hallOfFame') } }
			>
				<FlatList
					data={ hallData?.slice(0, 4) }
					keyExtractor={ item => item.user_fullname + item.location }
					renderItem={ ({ item }) => <CardHof { ...item } /> }
					ItemSeparatorComponent={ () => <View style={ { height: 16 } } /> }
					style={ { marginVertical: scaleVertical(32) } }
					columnWrapperStyle={ { gap: scaleWidth(16) } }
					numColumns={ 2 }
					refreshing={ loadingHall }
					onRefresh={ refetchHall }
				/>
			</CardChampion>
		)
	}, [hallData])

	const cards = useMemo(
		() => ([cardMVP, cardUnique, cardHof]),
		[mvpData, uniqueData, hallData]
	)

	return (
		<Container contentStyle={ styles.page }>
			<Carousel
				pagingEnabled={ true }
				snapEnabled={ false }
				loop={ false }
				width={ SCREEN_WIDTH }
				height={ SCREEN_HEIGHT - statusBarHeight - navBarHeight - scaleHeight(16) }
				data={ cards }
				renderItem={ ({ index }) => cards[index] }
				mode='parallax'
				modeConfig={ {
					parallaxScrollingScale: .9,
					parallaxScrollingOffset: SCREEN_WIDTH * .12,
				} }
				onProgressChange={ (_, absoluteProgress) =>
					(progressValue.value = absoluteProgress)
				}
				panGestureHandlerProps={ {
					activeOffsetX: [-10, 10],
					failOffsetY: [-5, 5]
				} }
			/>

			<PageIndicator length={ cards.length } animValue={ progressValue } />
		</Container>
	)
}

export default withCommon(React.memo(Champion))