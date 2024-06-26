import React, {
	Suspense, lazy, useCallback, useEffect, useMemo, useRef, useState
} from 'react'
import {
	FlatList, ImageBackground, RefreshControl, View,
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
import { type NavigationProps } from '../../models/navigation'
import withCommon from '../../hoc/with-common'
import { BG } from '../../assets/images'
import { useGetUserProfileQuery } from '../../store/user'
import ReloadView from '../../components/reload-view'
import Loading from '../../components/loading'
import useStorage from '../../hooks/useStorage'
import { useGetPointActivityQuery } from '../../store/activity'
import { type PointActivity } from '../../models/activity'
import Image from '../../components/image'
import moment from 'moment'

const LazyBannerTier = lazy(async() => await import('../../components/banner-tier'))

type Props = NavigationProps<'tier'>

const howToEarnPoint = [
	'Smashing it in a regular game: No need for fancy rooms, just jump in and play!',
	'Joining the party in a special event: We\'ve got awesome limited-time games, come join the fun!',
	'Battling it out in a tournament: Feeling competitive? Tournaments are your jam!',
	'Snagging a badge: Show off your skills and collect cool badges!',
	'Grabbing a new board game: Gotta love that new game smell!',
	'Fueling up with food and drinks: Gotta stay energized for all that winning, right?',
]

const PointActivityTab = ({ pointActivity }: { pointActivity: PointActivity[] }): React.ReactNode => {

	const _renderItem = useCallback(({ item }:ListRenderItemInfo<PointActivity>): React.ReactElement => {
		return (
			<View style={ [styles.rowStyle, styles.rowCenterStyle, styles.spaceBetweenStyle] }>
				<View>
					<Text variant='bodyMiddleDemi' style={ styles.pointActivityContentTitleStyle }>{ item.title_description }</Text>
					<Text style={ styles.pointActivityDateStyle } variant='bodySmallRegular' >{ moment(item.created_date).format('MMMM DD, YYYY h:mm a') }</Text>
				</View>
				<Text variant='bodyMiddleBold'>{ `${item.point}+` }</Text>
			</View>
		)
	}, [])

	return (
		<View style={ [styles.flexStyle, styles.midContentHorizontalStyle, styles.filterCardRedeemWrapperStyle] }>
			<FlatList
				data={ pointActivity }
				renderItem={ _renderItem }
				keyExtractor={ (_, index) => index.toString() }
				scrollEnabled={ false }
				ItemSeparatorComponent={ () => <View style={ styles.listGameSeparatorStyle }/> }
			/>
		</View>
	)
}

const EarnPointActivityTab = (): React.ReactNode => {

	return (
		<View style={ [styles.flexStyle, styles.midContentHorizontalStyle, styles.filterCardRedeemWrapperStyle] }>
			<Text style={ styles.pointActivityContentTitleStyle } variant='bodyLargeBold'>Earn sweet loot by:</Text>

			<FlatList
				data={ howToEarnPoint }
				renderItem={ ({ item, index }) => {
					return (
						<View style={ [styles.rowStyle] }>
							<View style={ [styles.pointActivityContentTitleStyle, styles.orderedStyle] }/>
							<Text key={ index } style={ styles.pointActivityContentTitleStyle } variant='bodyMiddleRegular'>{ item }</Text>
						</View>
					)
				} }
				keyExtractor={ (_, index) => index.toString() }
				scrollEnabled={ false }
			/>
		</View>
	)
}

const Tier = ({ t }: Props): React.ReactNode => {
	const { user } = useStorage()
	const [isRefresh, setIsRefresh] = useState(false)
	const {
		data: userProfileData,
		isLoading: isLoadingUser,
		refetch: refetchUser,
		isError: isErrorUser
	} = useGetUserProfileQuery()
	const {
		data: pointActivityData,
		isLoading: isLoadingPointActivity,
		refetch: pointActivityRefetch,
		isError: isErrorPointActivity
	} = useGetPointActivityQuery(user?.user_code)
	const [scrollY, setScrollY] = useState(0)

	const bottomSheetRef = useRef<BottomSheetModal>(null)

	const _onPressRedeemItem = useCallback(() => {
		bottomSheetRef.current?.present()
	}, [bottomSheetRef])

	const _getScrollY = useMemo(() => {
		return scrollY > 24
	}, [scrollY])

	const _onRefresh = useCallback(() => {
		setIsRefresh(true)
		refetchUser()
		pointActivityRefetch()
	}, [])

	const _isLoading = useMemo(() => {
		const loading = isLoadingUser || isLoadingPointActivity
		return loading
	}, [isLoadingUser, isLoadingPointActivity])

	const _isError = useMemo(() => {
		const error = isErrorUser || isErrorPointActivity
		return error
	}, [isErrorUser, isErrorPointActivity])

	useEffect(() => {
		if (!_isLoading && isRefresh) setIsRefresh(false)
	}, [_isLoading, isRefresh])

	const _renderTopContent = useMemo(() => {
		return (
			<Suspense fallback={
				<View style={ styles.starsFieldContentStyle }/>
			 }>
				<LazyBannerTier
					userProfileData={ userProfileData }
					screen='tier'
					style={ styles.bannerStyle }
					starsFieldContentStyle={ styles.starsFieldContentStyle }/>
			</Suspense>
		)
	}, [userProfileData])

	const _renderCardBenefits = useMemo(() => {
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
						userProfileData?.tier_benefits ? userProfileData?.tier_benefits.map(item => {
							return (
								<RoundedBorder
									style={ styles.cardRedeemItemStyle }
									radius={ 12 }
									borderWidth={ 1 }
									key={ item.reward_code }
									contentStyle={ styles.cardRedeemItemBackgroundStyle }
								>
									<View>
										<View style={ styles.overflowHiddenStyle }>
											<View style={ { ...styles.ticketStyle, left: -15 } } />
											<Image style={ { ...styles.cardRedeemItemImageStyle, zIndex: -2 } } source={ { uri: item.reward_img_url  } }  />
											<View style={ { ...styles.ticketStyle, right: -15 } } />
										</View>
										<Text style={ styles.cardRedeemItemTitleStyle } variant='bodyMiddleBold'>{ item.reward_name }</Text>
										<View style={ [styles.rowStyle, styles.cardRedeemItemExpiryWrapperStyle] }>
											<Text
												style={ styles.cardRedeemItemExpiryLeftStyle }
												variant='bodySmallRegular'
												numberOfLines={ 2 }
											>
												{ item.reward_description }
											</Text>
										</View>
									</View>
								</RoundedBorder>
							)
						}) : null
					}
				</ScrollView>
			</View>
		)
	}, [_onPressRedeemItem, userProfileData])

	const _renderTabActivity = useMemo(() => {
		
		return (
			<View style={ styles.tabActivityWrapperStyle }>
				<Tabview
					tabs={ [
						{ key: 'pointActivity', title: t('tier-page.tab-activity'), component: () => <PointActivityTab pointActivity={ pointActivityData ?? [] } /> },
						{ key: 'earnActivity', title: t('tier-page.tab-earn-point'), component: () => <EarnPointActivityTab/> }
					] }
			 />
			</View>
		)
	}, [pointActivityData])

	const _renderMidContent = useMemo(() => {
		return (
			<View style={ styles.midContentStyle }>
				<Text style={ styles.midContentHorizontalStyle } variant='bodyExtraLargeBold'>{ t('tier-page.rewards-title') }</Text>
				{ _renderCardBenefits }
				{ _renderTabActivity }
			</View>
		)
	}, [_renderTabActivity, _renderCardBenefits])

	const _renderMainContent = useMemo(() => {
		if (_isError) return <ReloadView onRefetch={ _onRefresh } />

		return (
			<ScrollView
				showsVerticalScrollIndicator={ false }
				removeClippedSubviews
				onScroll={ e => { setScrollY(e.nativeEvent.contentOffset.y) } }
				scrollEventThrottle={ 16 }
				refreshControl={ <RefreshControl refreshing={ isRefresh } onRefresh={ _onRefresh }/> }
			>
				{ _renderTopContent }
				{ _renderMidContent }
			</ScrollView>
		)
	}, [_renderTopContent, _renderMidContent, _isError, _isLoading, isRefresh])

	return (
		<Container
			manualAppbar
			barStyle={ _getScrollY || _isError ? 'dark-content' : 'light-content' }
		>
			{
				_getScrollY || _isError ?
					<ImageBackground style={ styles.imageBgStyle } source={ BG } /> : null
			}
			{ _renderMainContent }
			<BottomSheet bsRef={ bottomSheetRef } viewProps={ { style: styles.bottomSheetView } }>
				<Text variant='headingLarge'>TODO </Text>
			</BottomSheet>
			<Loading isLoading={ _isLoading } />
		</Container>
	)
}

export default withCommon(React.memo(Tier))