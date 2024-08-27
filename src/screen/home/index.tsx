import {
	ActivityIndicator, FlatList, Pressable, RefreshControl, ScrollView, TouchableOpacity, View
} from 'react-native'
import React, {
	Suspense, useCallback, lazy, useRef, useState,
	useMemo,
	useEffect
} from 'react'
import Carousel, { type ICarouselInstance } from 'react-native-reanimated-carousel'

import isEmpty from 'lodash/isEmpty'

import Container from '../../components/container'
import styles from './styles'
import { Avatar } from 'react-native-paper'
import { fullWidth, scaleHeight, scaleWidth } from '../../utils/pixel.ratio'
import Text from '../../components/text'
import IconReceipt from '../../assets/svg/receipt.svg'
import IconNotification from '../../assets/svg/notification.svg'
import withCommon from '../../hoc/with-common'
import { type NavigationProps } from '../../models/navigation'
import { TabActions } from '@react-navigation/native'
import { useGetUserProfileQuery } from '../../store/user'
import Loading from '../../components/loading'
import ReloadView from '../../components/reload-view'
import { LOGO } from '../../assets/images'
import { PageIndicator } from 'react-native-page-indicator'
import { colorsTheme } from '../../constants/theme'
import { useGetBannerPublishedQuery } from '../../store/banner'
import { useGetActivitiesHiglightQuery } from '../../store/activity'
import useStorage from '../../hooks/useStorage'
import moment from 'moment'
import Image from '../../components/image'
import { requestPermission } from '../../utils/persmissions'
import { useGetBadgeCountNotificationQuery } from '../../store/notifications'
import navigationConstant from '../../constants/navigation'
import { type Games } from '../../models/games'

type Props = NavigationProps<'home'>

const LazyBannerTier = lazy(async() => await import('../../components/banner-tier'))

const textFormatter = (text:string, target:string): React.ReactNode => {
	const newText = text.split(`${target}`)
	newText.splice(1, 0, target)

	return newText.map((item, index) => {
		if (item === target) {
			return <Text key={ index } style={ styles.hightLightDescriptionStyle } variant='bodyLargeDemi'>{ item }</Text>
		}
		
		return <Text key={ index } variant='paragraphMiddleRegular'>{ item }</Text>
	})
}

const Home = ({ navigation, t }:Props): React.ReactNode => {
	const [isRefresh, setIsRefresh] = useState(false)
	const { user } = useStorage()
	const [carouselIndex, setCarouselIndex] = useState(0)
	const carouselRef = useRef<ICarouselInstance>(null)
	const {
		data: userProfileData,
		isFetching: isLoadingUser,
		refetch: refetchUser,
		isError: isErrorUser,
	} = useGetUserProfileQuery()
	const {
		data: bannerPublishedData,
		isFetching: isLoadingBannerPublished,
		refetch: refetchBannerPublished,
		isError: isErrorBannerPublished
	} = useGetBannerPublishedQuery()
	const {
		data: activitiesHighlightData,
		isFetching: isLoadingActivitiesHighlight,
		refetch: refetchActivitiesHighlight,
		isError: isErrorActivitiesHighlight
	} = useGetActivitiesHiglightQuery(user?.user_code)
	const {
		data: notificationData,
		isFetching: isLoadingNotificationData,
		refetch: refetchNotificationData,
		isError: isErrorNotificationData
	} = useGetBadgeCountNotificationQuery()

	const _isLoading = useMemo(() => {
		const loading = isLoadingUser || isLoadingBannerPublished || isLoadingActivitiesHighlight || isLoadingNotificationData
		const isEmptyData = isEmpty(userProfileData) || isEmpty(bannerPublishedData) || isEmpty(activitiesHighlightData) ||  isEmpty(notificationData)
		return loading && isEmptyData
	}, [
		isLoadingUser,
		isErrorBannerPublished,
		userProfileData,
		bannerPublishedData,
		activitiesHighlightData,
		isLoadingActivitiesHighlight,
		isLoadingNotificationData,
		notificationData
	])

	const _isError = useMemo(() => {
		return isErrorUser || isErrorBannerPublished || isErrorActivitiesHighlight || isErrorNotificationData
	}, [isErrorUser, isErrorBannerPublished, isErrorActivitiesHighlight, isErrorNotificationData])

	const _navigateToProfile = useCallback(() => {
		const jumpAction = TabActions.jumpTo(navigationConstant.screenName.profile)
		navigation.dispatch(jumpAction)
	}, [])
	
	const _navigateToNotifications = useCallback(() => {
		navigation.navigate('notifications')
	}, [])

	const _navigateToTier = useCallback(() => {
		navigation.navigate('tier')
	}, [])

	const _navigateToTransactions = useCallback(() => {
		navigation.navigate('transactions')
	}, [])

	const _onRefresh = useCallback(() => {
		setIsRefresh(true)
		refetchUser()
		refetchBannerPublished()
		refetchActivitiesHighlight()
		refetchNotificationData()
	}, [refetchUser, refetchBannerPublished, refetchActivitiesHighlight, refetchNotificationData])

	useEffect(() => {
		requestPermission()
	}, [])

	useEffect(() => {
		if (!_isLoading && isRefresh) setIsRefresh(false)
	}, [_isLoading, isRefresh])

	const _onPressActivity = useCallback((game: Partial<Games>) => () => {
		navigation.navigate('gameDetail', game)
	}, [])

	const _renderHeader = useMemo(() => {
		return (
			<View style={ [styles.sectionWrapperStyle, styles.headerWrapperStyle] }>
				<View style={ styles.avatarWrapperStyle }>
					<TouchableOpacity onPress={ _navigateToProfile }>
						<Avatar.Image size={ scaleWidth(48) } source={  userProfileData?.image_url ? { uri: userProfileData?.image_url } : LOGO }/>
					</TouchableOpacity>
					<View style={ styles.greetingWrapperStyle }>
						<Text style={ styles.greetingTextStyle } variant='bodySmallRegular'>Hello 👋</Text>
						<TouchableOpacity onPress={ _navigateToProfile }>
							<Text variant='bodyLargeDemi'>{ userProfileData?.fullname }</Text>
						</TouchableOpacity>
					</View>
				</View>
				<View style={ styles.rightHeaderWrapperStyle }>
					<TouchableOpacity style={ styles.iconWrapperStyle } onPress={ _navigateToTransactions }>
						<IconReceipt/>
					</TouchableOpacity>
					<TouchableOpacity style={ styles.iconWrapperStyle } onPress={ _navigateToNotifications }>
						<IconNotification/>
						{
							notificationData?.count_unread ?
								<View style={ styles.badgeStyle }>
									<Text style={ styles.badgeTextStyle } variant='bodyDoubleExtraSmallRegular'>{ notificationData?.count_unread }</Text>
								</View>
								:
								null
						}
					</TouchableOpacity>
				</View>
			</View>
		)
	}, [userProfileData, notificationData])
	
	const _renderTier = useMemo(() => {
		return (
			<Pressable
				onPress={ _navigateToTier }
				style={ [styles.sectionWrapperStyle, styles.tierWrapperStyle] }>
				<Suspense fallback={
					<View style={ [styles.starFieldStyle, styles.loadingStarFieldStyle] }>
						<ActivityIndicator/>
					</View>
				}>
					<LazyBannerTier screen='home' style={ styles.starFieldStyle } userProfileData={ userProfileData } />
				</Suspense>
			</Pressable>
		)
	}, [navigation, userProfileData])

	const _renderBanner = useMemo(() => {
		return (
			<View>
				<Carousel
					ref={ carouselRef }
					autoPlay
					autoPlayInterval={ 5000 }
					snapEnabled
					loop
					width={ fullWidth }
					height={ scaleHeight(220) }
					data={ bannerPublishedData ?? [] }
					onProgressChange={ (_, absoluteProgress: number) => {
						if (absoluteProgress) setCarouselIndex(Math.round(absoluteProgress))
					 } }
					renderItem={ ({ item }) => {
						return (
							<View>
								<Image
									width={ fullWidth }
									height={ scaleHeight(220) }
									resizeMode='cover'
									source={ { uri: item.image_url ? item.image_url : '/path/images.png' } }
									style={ styles.bannerStyle }
									keepRatio
								/>
							</View>
						)
					} }
				/>
				<View style={ styles.indicatorWrapperStyle }>
					<PageIndicator count={ bannerPublishedData?.length ?? 0 } color={ colorsTheme.background } current={ carouselIndex } />
				</View>
			</View>
		)
	}, [carouselIndex, bannerPublishedData])

	const _renderListGame = useMemo(() => {
		return (
			<View style={ [styles.sectionWrapperStyle, styles.listGameWrapperStyle] }>
				<Text variant='bodyDoubleExtraLargeJunegull'>{ t('home-page.activities-title') }</Text>
				<FlatList
					data={ activitiesHighlightData }
					style={ styles.listGameStyle }
					contentContainerStyle={ styles.activityHighlightListStyle }
					scrollEnabled={ false }
					renderItem={ ({ item }) => {
						const description = t('home-page.activities-result-description', {
							username: item.username,
							gameName: item.game_name,
							point: item.point
						})
						const resultData = moment(item.created_date).local()
							.fromNow()
						
						return (
							<TouchableOpacity
								style={ styles.gameItemWrapperStyle }
								onPress={ _onPressActivity({ game_code: item.game_code, image_url: item.game_image_url }) }>
								<Image
									source={ { uri: item.game_image_url } }
									style={ styles.imageGameStyle }
								/>
								<View style={ styles.gameDescriptionWrapperStyle }>
									<Text style={ styles.gameLatestUpdateLabelStyle } variant='bodySmallRegular'>{ resultData }</Text>
									<View style={ [styles.gameDescriptionWrapperStyle, styles.gameDescriptionLabelStyle] }>
										{ textFormatter(description, item.game_name) }
									</View>
								</View>
							</TouchableOpacity>
						)
					} }
					keyExtractor={ (_, index) => index.toString() }
					ItemSeparatorComponent={ () => <View style={ styles.listGameSeparatorStyle }/> }
				/>
			</View>
		)
	}, [activitiesHighlightData])

	const _renderContent = useMemo(() => {
		if (_isError) return <ReloadView onRefetch={ _onRefresh } />

		return (
			<ScrollView
				showsVerticalScrollIndicator={ false }
				contentContainerStyle={ styles.scrollContentStyle }
				refreshControl={ <RefreshControl refreshing={ isRefresh } onRefresh={ _onRefresh }/> }
			>
				{ _renderHeader }
				{ _renderTier }
				{ _renderBanner }
				{ _renderListGame }
			</ScrollView>
		)
	}, [_isError, _onRefresh, _isLoading, _renderBanner, _renderHeader, _renderListGame, _renderTier, isRefresh])

	return (
		<Container contentStyle={ styles.contentStyle } barStyle='dark-content'>
			{ _renderContent }
			<Loading isLoading={ _isLoading } />
		</Container>
	)
}

export default withCommon(React.memo(Home))