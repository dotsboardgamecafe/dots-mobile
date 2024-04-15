import React, {  useMemo, useState } from 'react'
import { FlatList, Platform, StatusBar, View } from 'react-native'
import { PageIndicator } from 'react-native-page-indicator'
import Carousel from 'react-native-reanimated-carousel'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@gorhom/bottom-sheet'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

import Container from '../../components/container'
import { type NavigationProps } from '../../models/navigation'
import withCommon from '../../hoc/with-common'
import { scaleHeight, scaleVertical, scaleWidth } from '../../utils/pixel.ratio'
import styles from './styles'
import CardChampion from '../../components/card-champion'
import { hofData, mostVps } from './data'
import CardHof from '../../components/card-hof'
import MvpItem from '../../components/mvp-item'

type Props = NavigationProps<'champion'>

const Champion = ({ theme, t, navigation }: Props): React.ReactNode => {
	const [page, setPage] = useState(0)
	const statusBarHeight = Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) : 0
	const navBarHeight = useBottomTabBarHeight()

	const cardMVP = useMemo(() => {
		return (
			<CardChampion
				title={ t('champion-page.mvp') }
				onClickSeeMore={ () => { navigation.navigate('mvp', {}) } }
			>
				<FlatList
					data={ mostVps.slice(0, 10) }
					keyExtractor={ item => item.rank + item.name }
					renderItem={ ({ item, index }) => <MvpItem item={ item } index={ index } showVP /> }
					contentContainerStyle={ { flexGrow: 1 } }
					style={ { marginVertical: scaleVertical(16) } }
					showsVerticalScrollIndicator={ false }
					ItemSeparatorComponent={ () => <View style={ { height: scaleVertical(8) } } /> }
				/>
			</CardChampion>
		)
	}, [])

	const cardUnique = useMemo(() => {
		return (
			<CardChampion
				title={ t('champion-page.unique') }
				onClickSeeMore={ () => { navigation.navigate('mvp', { unique: true }) } }
			>
				<FlatList
					data={ mostVps.slice(0, 10) }
					keyExtractor={ item => item.rank + item.name }
					renderItem={ ({ item, index }) => <MvpItem item={ item } index={ index } showVP={ false } /> }
					contentContainerStyle={ { flexGrow: 1 } }
					style={ { marginVertical: scaleVertical(16) } }
					showsVerticalScrollIndicator={ false }
					ItemSeparatorComponent={ () => <View style={ { height: scaleVertical(8) } } /> }
				/>
			</CardChampion>
		)
	}, [])

	const cardHof = useMemo(() => {
		return (
			<CardChampion
				title={ t('champion-page.hof') }
				onClickSeeMore={ () => { navigation.navigate('hallOfFame') } }
			>
				<FlatList
					data={ hofData.slice(0, 4) }
					keyExtractor={ item => item.game.game_code + item.player.user_code }
					renderItem={ ({ item }) => <CardHof { ...item } /> }
					ItemSeparatorComponent={ () => <View style={ { height: 16 } } /> }
					style={ { marginVertical: scaleVertical(32) } }
					columnWrapperStyle={ { gap: scaleWidth(16) } }
					numColumns={ 2 }
				/>
			</CardChampion>
		)
	}, [])

	const cards = useMemo(() => ([cardMVP, cardUnique, cardHof]), [])

	return (
		<Container contentStyle={ styles.page }>
			<Carousel
				pagingEnabled={ true }
				snapEnabled={ false }
				loop={ false }
				width={ SCREEN_WIDTH }
				height={ SCREEN_HEIGHT - statusBarHeight - navBarHeight - scaleHeight(16) }
				onSnapToItem={ setPage }
				data={ cards }
				renderItem={ ({ index }) => cards[index] }
				mode='parallax'
				modeConfig={ {
					parallaxScrollingScale: .9,
					parallaxScrollingOffset: SCREEN_WIDTH * .12,
				} }
			/>
			<PageIndicator
				count={ 3 }
				current={ page }
				activeColor={ theme.colors.blueAccent }
				color={ theme.colors.blueAccent }
				duration={ 250 }
			/>
		</Container>
	)
}

export default withCommon(React.memo(Champion))