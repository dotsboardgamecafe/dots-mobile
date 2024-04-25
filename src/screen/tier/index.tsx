import React, { Suspense, lazy, useCallback, useRef } from 'react'
import {
	FlatList, Image, TouchableOpacity, View,
	type ListRenderItemInfo
} from 'react-native'

import Container from '../../components/container'
import Text from '../../components/text'

import styles from './styles'
import RoundedBorder from '../../components/rounded-border'
import { ScrollView } from 'react-native-gesture-handler'
import Tabview from '../../components/tab-view'
import BottomSheet from '../../components/bottom-sheet'
import { type BottomSheetModal } from '@gorhom/bottom-sheet'

const LazyBannerTier = lazy(async() => await import('../../components/banner-tier'))

interface ListPointActivityType {
	title: string,
	schedule: string,
	point: string,
}

const listRedeem = [
	{
		id: '1',
		image: 'https://cf.geekdo-images.com/dT1vJbUizZFmJAphKg-byA__itemrep/img/pu4eSfZNzf3r7B-7pES03cfFROY=/fit-in/246x300/filters:strip_icc()/pic7720813.png',
		title: 'Hot Coffee Drink - E Voucher',
		price: 'Rp10.000',
		expiredDate: 'Expired on Feb 20, 2024'
	},
	{
		id: '2',
		image: 'https://cf.geekdo-images.com/dT1vJbUizZFmJAphKg-byA__itemrep/img/pu4eSfZNzf3r7B-7pES03cfFROY=/fit-in/246x300/filters:strip_icc()/pic7720813.png',
		title: 'Hot Coffee Drink - E Voucher',
		price: 'Rp10.000',
		expiredDate: 'Expired on Feb 20, 2024'
	},
	{
		id: '3',
		image: 'https://cf.geekdo-images.com/dT1vJbUizZFmJAphKg-byA__itemrep/img/pu4eSfZNzf3r7B-7pES03cfFROY=/fit-in/246x300/filters:strip_icc()/pic7720813.png',
		title: 'Hot Coffee Drink - E Voucher',
		price: 'Rp10.000',
		expiredDate: 'Expired on Feb 20, 2024'
	},
	{
		id: '4',
		image: 'https://cf.geekdo-images.com/dT1vJbUizZFmJAphKg-byA__itemrep/img/pu4eSfZNzf3r7B-7pES03cfFROY=/fit-in/246x300/filters:strip_icc()/pic7720813.png',
		title: 'Hot Coffee Drink - E Voucher',
		price: 'Rp10.000',
		expiredDate: 'Expired on Feb 20, 2024'
	},
	{
		id: '5',
		image: 'https://cf.geekdo-images.com/dT1vJbUizZFmJAphKg-byA__itemrep/img/pu4eSfZNzf3r7B-7pES03cfFROY=/fit-in/246x300/filters:strip_icc()/pic7720813.png',
		title: 'Hot Coffee Drink - E Voucher',
		price: 'Rp10.000',
		expiredDate: 'Expired on Feb 20, 2024'
	}
]

const listPointActivity: ListPointActivityType[] = [
	{
		title: 'Joined Resident Evil Tournament Game',
		schedule: 'Feb 10, 2024 - 15:00 PM',
		point: '+ 24 poin'
	},
	{
		title: 'Claiming Achievement',
		schedule: 'Feb 03, 2024 - 09:00 AM',
		point: '+ 6 poin'
	},
	{
		title: 'Played Dune Imperium Board Game',
		schedule: 'Jan 25, 2024 - 08:00 PM',
		point: '+ 20 poin'
	},
	{
		title: 'Buying Chocolate Drink',
		schedule: 'Jan 30, 2024 - 11:00 AM',
		point: '+ 8 poin'
	}
]

const PointActivityTab = (): React.ReactNode => {

	const _renderItem = useCallback(({ item }:ListRenderItemInfo<ListPointActivityType>): React.ReactElement => {
		return (
			<View style={ [styles.rowStyle, styles.rowCenterStyle, styles.spaceBetweenStyle] }>
				<View>
					<Text variant='bodyMiddleDemi' style={ styles.pointActivityContentTitleStyle }>{ item.title }</Text>
					<Text variant='bodySmallRegular' >{ item.schedule }</Text>
				</View>
				<Text variant='bodyMiddleBold'>{ item.point }</Text>
			</View>
		)
	}, [])

	return (
		<View style={ [styles.flexStyle, styles.midContentHorizontalStyle, styles.filterCardRedeemWrapperStyle] }>
			<FlatList
				data={ listPointActivity }
				renderItem={ _renderItem }
				keyExtractor={ item => item.title }
				scrollEnabled={ false }
				ItemSeparatorComponent={ () => <View style={ styles.listGameSeparatorStyle }/> }
			/>
		</View>
	)
}

const EarnPointActivityTab = (): React.ReactNode => {
	const _renderItem = useCallback(({ item }:ListRenderItemInfo<ListPointActivityType>): React.ReactElement => {
		return (
			<View style={ [styles.rowStyle, styles.rowCenterStyle, styles.spaceBetweenStyle] }>
				<View>
					<Text variant='bodyMiddleDemi' style={ styles.pointActivityContentTitleStyle }>{ item.title }</Text>
					<Text variant='bodySmallRegular' >{ item.schedule }</Text>
				</View>
				<Text variant='bodyMiddleBold'>{ item.point }</Text>
			</View>
		)
	}, [])

	return (
		<View style={ [styles.flexStyle, styles.midContentHorizontalStyle, styles.filterCardRedeemWrapperStyle, { opacity: 0.7 }] }>
			<FlatList
				data={ listPointActivity }
				renderItem={ _renderItem }
				keyExtractor={ item => item.title }
				scrollEnabled={ false }
				ItemSeparatorComponent={ () => <View style={ styles.listGameSeparatorStyle }/> }
			/>
		</View>
	)
}

const Tier = (): React.ReactNode => {
	const bottomSheetRef = useRef<BottomSheetModal>(null)

	const _onPressRedeemItem = useCallback(() => {
		bottomSheetRef.current?.present()
	}, [bottomSheetRef])

	const _renderTopContent = useCallback(() => {
		return (
			<Suspense fallback={
				<View style={ styles.starsFieldContentStyle }/>
			 }>
				<LazyBannerTier
					screen='tier'
					style={ styles.bannerStyle }
					starsFieldContentStyle={ styles.starsFieldContentStyle }/>
			</Suspense>
		)
	}, [])

	const _renderCardRedeem = useCallback(() => {
		return (
			<View style={ [styles.filterCardRedeemWrapperStyle, styles.midContentHorizontalStyle] }>
				<ScrollView
					horizontal={ true }
					bounces={ false }
					showsHorizontalScrollIndicator={ false }
					pagingEnabled
					removeClippedSubviews
				>
					{
						listRedeem.map(item => {
							return (
								<RoundedBorder
									style={ styles.cardRedeemItemStyle }
									radius={ 12 }
									borderWidth={ 1 }
									key={ item.id }
									contentStyle={ styles.cardRedeemItemBackgroundStyle }
								>
									<TouchableOpacity onPress={ _onPressRedeemItem }>
										<View style={ styles.overflowHiddenStyle }>
											<View style={ { ...styles.ticketStyle, left: -15 } } />
											<Image style={ { ...styles.cardRedeemItemImageStyle, zIndex: -2 } } source={ { uri: item.image  } }  />
											<View style={ { ...styles.ticketStyle, right: -15 } } />
										</View>
										<Text style={ styles.cardRedeemItemTitleStyle } variant='bodyMiddleBold'>{ item.title }</Text>
										<Text variant='bodyMiddleBold'>{ item.price }</Text>
										<View style={ [styles.rowStyle, styles.cardRedeemItemExpiryWrapperStyle] }>
											<Text style={ styles.cardRedeemItemExpiryLeftStyle } variant='bodySmallRegular'>{ item.expiredDate }</Text>
										</View>
									</TouchableOpacity>
								</RoundedBorder>
							)
						})
					}
				</ScrollView>
			</View>
		)
	}, [_onPressRedeemItem])

	const _renderTabActivity = useCallback(() => {
		
		return (
			<View style={ styles.tabActivityWrapperStyle }>
				<Tabview
					tabs={ [
						{ key: 'pointActivity', title: 'Point Activity', component: () => <PointActivityTab/> },
						{ key: 'earnActivity', title: 'How to Earn Points', component: () => <EarnPointActivityTab/> }
					] }
			 />
			</View>
		)
	}, [])

	const _renderMidContent = useCallback(() => {
		return (
			<View style={ styles.midContentStyle }>
				<Text style={ styles.midContentHorizontalStyle } variant='bodyExtraLargeBold'>Your Rewards</Text>
				{ _renderCardRedeem() }
				{ _renderTabActivity() }
			</View>
		)
	}, [_renderTabActivity, _renderCardRedeem])

	return (
		<Container
			manualAppbar
			barStyle='light-content'
		>
			<ScrollView
				bounces={ false }
				showsVerticalScrollIndicator={ false }
				removeClippedSubviews
			>
				{ _renderTopContent() }
				{ _renderMidContent() }
			</ScrollView>
			<BottomSheet bsRef={ bottomSheetRef } viewProps={ { style: styles.bottomSheetView } }>
				<Text variant='headingLarge'>TODO </Text>
			</BottomSheet>
		</Container>
	)
}

export default React.memo(Tier)