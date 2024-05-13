import {
	ActivityIndicator,
	Alert, FlatList, Pressable, RefreshControl, ScrollView, TouchableOpacity, View
} from 'react-native'
import React, {
	Suspense, useCallback, lazy, useRef, useState,
	useMemo
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
import Loading from '../loading'
import ReloadView from '../../components/reload-view'
import { LOGO } from '../../assets/images'
import { PageIndicator } from 'react-native-page-indicator'
import { colorsTheme } from '../../constants/theme'
import { useGetBannerPublishedQuery } from '../../store/banner'
import { useGetActivitiesHiglightQuery } from '../../store/activity'
import useStorage from '../../hooks/useStorage'
import moment from 'moment'
import Image from '../../components/image'

type Props = NavigationProps<'home'>

const LazyBannerTier = lazy(async() => await import('../../components/banner-tier'))

const textFormatter = (text:string, target:string): React.ReactNode => {
	const newText = text.split(`${target}`)
	newText.splice(1, 0, target)

	return newText.map((item, index) => {
		if (item === target) {
			return (
				<Pressable key={ index } onPress={ () => { Alert.alert(target) } }>
					<Text style={ styles.hightLightDescriptionStyle } key={ index } variant='bodyLargeDemi'>{ item }</Text>
				</Pressable>
			)
		}
		
		return <Text key={ index } variant='paragraphMiddleRegular'>{ item }</Text>
	})
}

const getGreetingMessage = (): string => {
	const currentTime = new Date()
	const currentHour = currentTime.getHours()

	let greeting

	if (currentHour < 12) {
		greeting = 'Good morning!'
	} else if (currentHour < 18) {
		greeting = 'Good afternoon!'
	} else {
		greeting = 'Good evening!'
	}

	return greeting
}

const Home = ({ navigation, t }:Props): React.ReactNode => {
	const { user } = useStorage()
	const [carouselIndex, setCarouselIndex] = useState(0)
	const carouselRef = useRef<ICarouselInstance>(null)
	const {
		data: userProfileData,
		isLoading: isLoadingUser,
		refetch: refetchUser,
		isError: isErrorUser,
	} = useGetUserProfileQuery()
	const {
		data: bannerPublishedData,
		isLoading: isLoadingBannerPublished,
		refetch: refetchBannerPublished,
		isError: isErrorBannerPublished
	} = useGetBannerPublishedQuery()
	const {
		data: activitiesHighlightData,
		isLoading: isLoadingActivitiesHighlight,
		refetch: refetchActivitiesHighlight,
		isError: isErrorActivitiesHighlight
	} = useGetActivitiesHiglightQuery(user?.user_code)

	const _isLoading = useMemo(() => {
		const loading = isLoadingUser || isLoadingBannerPublished || isLoadingActivitiesHighlight
		const isEmptyData = isEmpty(userProfileData) || isEmpty(bannerPublishedData) || isEmpty(activitiesHighlightData)
		return loading && isEmptyData
	}, [
		isLoadingUser,
		isErrorBannerPublished,
		userProfileData,
		bannerPublishedData,
		activitiesHighlightData,
		isLoadingActivitiesHighlight
	])

	const _isError = useMemo(() => {
		return isErrorUser || isErrorBannerPublished || isErrorActivitiesHighlight
	}, [isErrorUser, isErrorBannerPublished, isErrorActivitiesHighlight])

	const _navigateToProfile = useCallback(() => {
		const jumpAction = TabActions.jumpTo('Profil')
		navigation.dispatch(jumpAction)
	}, [])
	
	const _navigateToNotifications = useCallback(() => {
		navigation.navigate('notifications')
	}, [])

	const _navigateToTier = useCallback(() => {
		navigation.navigate('tier')
	}, [])

	const _onRefresh = useCallback(() => {
		refetchUser()
		refetchBannerPublished()
		refetchActivitiesHighlight()
	}, [refetchUser, refetchBannerPublished, refetchActivitiesHighlight])

	const _renderHeader = useCallback(() => {
		return (
			<View style={ [styles.sectionWrapperStyle, styles.headerWrapperStyle] }>
				<View style={ styles.avatarWrapperStyle }>
					<TouchableOpacity onPress={ _navigateToProfile }>
						<Avatar.Image size={ scaleWidth(48) } source={  userProfileData?.image_url ? { uri: userProfileData?.image_url } : LOGO }/>
					</TouchableOpacity>
					<View style={ styles.greetingWrapperStyle }>
						<Text style={ styles.greetingTextStyle } variant='bodySmallRegular'>{ getGreetingMessage() } 👋</Text>
						<TouchableOpacity onPress={ _navigateToProfile }>
							<Text variant='bodyLargeDemi'>{ userProfileData?.fullname }</Text>
						</TouchableOpacity>
					</View>
				</View>
				<View style={ styles.rightHeaderWrapperStyle }>
					<Pressable style={ styles.iconWrapperStyle }>
						<IconReceipt/>
					</Pressable>
					<TouchableOpacity style={ styles.iconWrapperStyle } onPress={ _navigateToNotifications }>
						<IconNotification/>
						<View style={ styles.badgeStyle }>
							<Text style={ styles.badgeTextStyle } variant='bodyDoubleExtraSmallRegular'>12</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		)
	}, [userProfileData])
	
	const _renderTier = useCallback(() => {
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

	const _renderBanner = useCallback(() => {
		return (
			<View>
				<Carousel
					ref={ carouselRef }
					autoPlay
					autoPlayInterval={ 4000 }
					snapEnabled
					loop
					width={ fullWidth }
					height={ scaleHeight(180) }
					data={ bannerPublishedData ?? [] }
					onProgressChange={ (_, absoluteProgress: number) => { setCarouselIndex(Math.round(absoluteProgress)) } }
					renderItem={ ({ item }) => {
						return (
							<Pressable onPress={ () => { Alert.alert(item.banner_code) } }>
								<Image
									width={ fullWidth }
									height={ scaleHeight(180) }
									resizeMode='contain'
									source={ { uri: item.image_url ? item.image_url : '/path/images.png' } }
									style={ styles.bannerStyle }
								/>
							</Pressable>
						)
					} }
				/>
				<View style={ styles.indicatorWrapperStyle }>
					<PageIndicator count={ bannerPublishedData?.length ?? 0 } color={ colorsTheme.background } current={ carouselIndex } />
				</View>
			</View>
		)
	}, [carouselIndex, bannerPublishedData])

	const _renderListGame = useCallback(() => {
		return (
			<View style={ [styles.sectionWrapperStyle, styles.listGameWrapperStyle] }>
				<Text variant='bodyDoubleExtraLargeBold'>{ t('home-page.activities-title') }</Text>
				<FlatList
					data={ activitiesHighlightData }
					style={ styles.listGameStyle }
					scrollEnabled={ false }
					renderItem={ ({ item }) => {
						const description = t('home-page.activities-result-description', {
							username: item.username,
							gameName: item.game_name,
							point: item.point
						})
						const resultData = moment(item.created_date).startOf('hour')
							.fromNow()
						
						return (
							<View style={ styles.gameItemWrapperStyle }>
								<Pressable onPress={ () => { Alert.alert('image') } }>
									<Image
										source={ { uri: item.game_image_url } }
										style={ styles.imageGameStyle }
									/>
								</Pressable>
								<View style={ styles.gameDescriptionWrapperStyle }>
									<Text style={ styles.gameLatestUpdateLabelStyle } variant='bodySmallRegular'>{ resultData }</Text>
									<View style={ [styles.gameDescriptionWrapperStyle, styles.gameDescriptionLabelStyle] }>
										{ textFormatter(description, item.game_name) }
									</View>
								</View>
							</View>
						)
					} }
					keyExtractor={ (_, index) => index.toString() }
					ItemSeparatorComponent={ () => <View style={ styles.listGameSeparatorStyle }/> }
				/>
			</View>
		)
	}, [activitiesHighlightData])

	const _renderContent = useCallback(() => {
		if (_isError) return <ReloadView onRefetch={ _onRefresh } />

		return (
			<ScrollView
				showsVerticalScrollIndicator={ false }
				contentContainerStyle={ styles.scrollContentStyle }
				refreshControl={ <RefreshControl refreshing={ _isLoading } onRefresh={ _onRefresh }/> }
			>
				{ _renderHeader() }
				{ _renderTier() }
				{ _renderBanner() }
				{ _renderListGame() }
			</ScrollView>
		)
	}, [_isError, _onRefresh, _isLoading, _renderBanner, _renderHeader, _renderListGame, _renderTier])

	return (
		<Container contentStyle={ styles.contentStyle } barStyle='dark-content'>
			{ _renderContent() }
			<Loading isLoading={ _isLoading } />
		</Container>
	)
}

export default withCommon(React.memo(Home))