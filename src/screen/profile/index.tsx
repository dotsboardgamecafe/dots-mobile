import React, {
	Suspense, lazy, useCallback, useMemo, useRef, useState
} from 'react'
import Container from '../../components/container'
import styles from './styles'
import {
	ImageBackground, TouchableOpacity, View, FlatList, ScrollView
} from 'react-native'
import Text from '../../components/text'
import { BG, neonCircleIllu, rackIllu } from '../../assets/images'
import { colorsTheme } from '../../constants/theme'
import RoundedBorder from '../../components/rounded-border'
import { formatGridData } from '../../utils/format-grid'
import { type NavigationProps } from '../../models/navigation'
import withCommon from '../../hoc/with-common'
import { type BottomSheetModal } from '@gorhom/bottom-sheet'
import BottomSheet from '../../components/bottom-sheet'

import ArrowRightIcon from '../../assets/svg/arrow-right.svg'
import CloseIcon from '../../assets/svg/close.svg'
import DiceIcon from '../../assets/svg/dice.svg'
import MaskIcon from '../../assets/svg/mask.svg'
import ChevronIcon from '../../assets/svg/chevron.svg'
import UserEditIcon from '../../assets/svg/user-edit.svg'
import {
	Lock,
	LogoutCurve,
	// ShieldTick, --------------> TODO
	// TableDocument
} from 'iconsax-react-native'
import { scaleWidth } from '../../utils/pixel.ratio'
import useStorage from '../../hooks/useStorage'
import { useGetUserProfileQuery } from '../../store/user'
import ReloadView from '../../components/reload-view'
import Loading from '../../components/loading'
import { useGetGameBoardCollectionQuery } from '../../store/game-board-collection'
import { useGetBadgesQuery } from '../../store/badges'
import { useGetGameFavouriteQuery } from '../../store/game-favourite'
import Image from '../../components/image'
import { type GameBoardCollection } from '../../models/game-board-collection'

type Props = NavigationProps<'profile'>

type SettingName = 'accountInformation' | 'editPassword' | 'tnc' | 'privacyPolicy' | 'logout'

interface SettingsType {
	name: SettingName,
	title: string,
	icon: React.ElementType
}

type Destionation = 'awards' | 'gameBoardCollection'

const LazyBannerTier = lazy(async() => await import('../../components/banner-tier'))

const listFavGameMechanics = {
	fun: <DiceIcon/>,
	excited: <MaskIcon/>
}

const settings: SettingsType[] = [
	{ name: 'accountInformation', title: 'profile-page.settings.account-information-title', icon: UserEditIcon },
	{ name: 'editPassword', title: 'profile-page.settings.edit-password-title', icon: Lock },
	// { name: 'tnc', title: 'profile-page.settings.tnc-title', icon: ShieldTick },
	// { name: 'privacyPolicy', title: 'profile-page.settings.privacy-policy-title', icon: TableDocument },
	{ name: 'logout', title: 'profile-page.settings.logout-title', icon: LogoutCurve },
]

const Profile = ({ navigation, theme, t }: Props):React.ReactNode => {
	const { user } = useStorage()
	const {
		data: userProfileData,
		isLoading: isLoadingUser,
		refetch: refetchUser,
		isError: isErrorUser
	} = useGetUserProfileQuery()
	const {
		data: gameBoardCollectionData,
		isLoading: isLoadingGameBoardCollection,
		refetch: refetchGameBoardCollection,
		isError: isErrorGameBoardCollection
	} = useGetGameBoardCollectionQuery(user?.user_code)
	const {
		data: badgesData,
		isLoading: isLoadingBadges,
		refetch: refetchBadges,
		isError: isErrorBadges
	} = useGetBadgesQuery({
		code: user?.user_code,
		limit: 1,
		page: 3
	})
	const {
		data: gameFavouriteData,
		isLoading: isLoadingGameFavourite,
		refetch: refetchGameFavourite,
		isError: isErrorGameFavourite
	} = useGetGameFavouriteQuery(user?.user_code)
	const [scrollY, setScrollY] = useState(0)
	const bottomSheetRef = useRef<BottomSheetModal>(null)
	const { onSetLogout } = useStorage()

	const onPressArrow = useCallback(
		(destination?: Destionation) => () => {
			if (destination) navigation.navigate(destination)
		},
		[],
	)

	const _onPressSettingItem = useCallback((name: SettingName) => () => {
		if (name !== 'logout') {
			navigation.navigate(name)
		} else {
			onSetLogout()
		}
		bottomSheetRef.current?.close()
	}, [bottomSheetRef, onSetLogout])

	const _getScrollY = useMemo(() => {
		return scrollY > 24
	}, [scrollY])

	const _onRefresh = useCallback(() => {
		refetchUser()
		refetchGameBoardCollection()
		refetchBadges()
		refetchGameFavourite()
	}, [])

	const _isLoading = useMemo(() => {
		const isLoading = isLoadingUser || isLoadingBadges || isLoadingGameFavourite || isLoadingGameBoardCollection
		return isLoading
	}, [isLoadingUser, isLoadingBadges, isLoadingGameFavourite, isLoadingGameBoardCollection])

	const _isError = useMemo(() => {
		const isError = isErrorUser || isErrorBadges || isErrorGameFavourite || isErrorGameBoardCollection
		return isError
	}, [isErrorUser, isErrorBadges, isErrorGameFavourite, isErrorGameBoardCollection])

	const _renderTitle = useCallback((title: string, destination?: Destionation, withIcon = true) => {
		return (
			<View style={ [styles.rowStyle, styles.rowCenterStyle, styles.midContentHorizontalStyle] }>
				<Text variant='bodyExtraLargeBold'>{ title }</Text>
				{
					withIcon ?
						<TouchableOpacity onPress={ onPressArrow(destination) } style={ styles.iconWrapperStyle }>
							<ArrowRightIcon/>
						</TouchableOpacity> : null
				}
			</View>
		)
	}, [])

	const _renderScrollView = useCallback((component: React.ReactNode) => {
		return (
			<ScrollView
				style={ [styles.midContentHorizontalStyle, styles.cardAwardItemWrapperStyle] }
				contentContainerStyle={ styles.scrollContentStyle }
				horizontal={ true }
				bounces={ false }
				showsHorizontalScrollIndicator={ false }
				pagingEnabled
				decelerationRate='fast'
				removeClippedSubviews
				scrollEventThrottle={ 16 }
				snapToAlignment='start'
			>
				{ component }
			</ScrollView>
		)
	}, [])

	const _renderListGame = useCallback(() => {
		const { numColumns, resultData } = formatGridData<GameBoardCollection>(gameBoardCollectionData ?? [])

		return (
			<FlatList
				style={ styles.listGameWrapperStyle }
				data={ resultData }
				renderItem={ ({ item }) => {
					if (item) return <Image source={ { uri: item.game_image_url } } style={ styles.boardGameItemStyle } />

					return <View style={ styles.boardGameItemStyle }/>
				} }
				keyExtractor={ (_, index) => index.toString() as any }
				numColumns={ numColumns }
				scrollEnabled={ false }
				contentContainerStyle={ [styles.justifyCenterStyle, styles.rowCenterStyle] }
				columnWrapperStyle={ styles.justifyCenterStyle }
				ItemSeparatorComponent={ () => <Image resizeMode='contain' source={ rackIllu } style={ styles.boardGameItemSeparatorStyle } /> }
				ListFooterComponent={ () => <Image resizeMode='contain' source={ rackIllu } style={ styles.boardGameItemSeparatorStyle } />  }
				removeClippedSubviews
			/>
		)
	}, [gameBoardCollectionData])

	const _renderBoardGameCollection = useCallback((): React.ReactNode => {
		return (
			<React.Fragment>
				{ _renderTitle(t('profile-page.game-collection-title'), 'gameBoardCollection') }
				{ _renderListGame() }
			</React.Fragment>
		)
	}, [_renderListGame])

	const _renderAward = useCallback((): React.ReactNode => {
		return (
			<View style={ [styles.awardWrapperStyle] }>
				{ _renderTitle(t('profile-page.awards-title'), 'awards') }
				{ _renderScrollView(
					badgesData?.map(item => {
						return (
							<View
								style={ styles.cardAwardItemStyle }
								key={ item.badge_id }
							>
								<Image style={ [styles.cardAwardItemImageNeonStyle] } source={ neonCircleIllu }  />
								<Image style={ [styles.cardAwardItemImageStyle, styles.cardAwardAbsoluteStyle] } source={ { uri: item.badge_image_url  } }  />
							</View>
						)
					})
				) }
			</View>
		)
	}, [badgesData])

	const _renderFavoriteGame = useCallback((): React.ReactNode => {
		return (
			<View style={ styles.awardWrapperStyle }>
				{ _renderTitle(t('profile-page.favorite-game-title'), 'awards', false) }
				{ _renderScrollView(
					gameFavouriteData?.map(item => {
						return (
							<RoundedBorder
								style={ styles.roundedGameFavStyle }
								spaceBorder={ 0.5 }
								radius={ 12 }
								borderWidth={ 1 }
								key={ item.game_category_id }
								colors={ [colorsTheme.blueAccent, colorsTheme.yellowAccent, colorsTheme.redAccent] }
								contentStyle={ [styles.rowStyle, styles.rowCenterStyle, styles.itemGameFavWrapperStyle] }
							>
								{ listFavGameMechanics[item.game_category_name.toLowerCase() as keyof typeof listFavGameMechanics] }
								<Text style={ styles.gamefavTitleStyle } variant='bodyMiddleRegular'>{ item.game_category_name }</Text>
							</RoundedBorder>
						)
					})
				) }
			</View>
		)
	}, [gameFavouriteData])

	const _renderMidContent = useCallback(() => {
		return (
			<View style={ styles.midContentStyle }>
				{ _renderBoardGameCollection() }
				{ _renderAward() }
				{ _renderFavoriteGame() }
			</View>
		)
	}, [_renderBoardGameCollection, _renderAward, _renderFavoriteGame])

	const _renderTopContent = useCallback(() => {
		return (
			<Suspense fallback={
				<View style={ styles.starsFieldContentStyle } />
			 }>
				<LazyBannerTier
					userProfileData={ userProfileData }
					screen='profile'
					style={ styles.bannerStyle }
					starsFieldContentStyle={ styles.starsFieldContentStyle }
					onPressTripleDot={ () => bottomSheetRef.current?.present() }
				/>
			</Suspense>
		)
	}, [bottomSheetRef, userProfileData])

	const _renderBottomSheetTopContent = useCallback(() => {
		return (
			<View style={ [styles.rowStyle, styles.justifyBetweenStyle] }>
				<Text variant='bodyExtraLargeHeavy'>Settings</Text>
				<TouchableOpacity onPress={ () => bottomSheetRef.current?.close() }>
					<CloseIcon />
				</TouchableOpacity>
			</View>
		)
	}, [])

	const _renderBottomSheetMidContent = useCallback(() => {
		return (
			<FlatList
				style={ styles.settingWrapperStyle }
				data={ settings }
				renderItem={ ({ item }) => {
					return (
						<View>
							<TouchableOpacity
								style={ [styles.rowStyle, styles.justifyBetweenStyle, styles.rowCenterStyle] }
								onPress={ _onPressSettingItem(item.name) }
							>
								<View style={ [styles.rowStyle, styles.rowCenterStyle] }>
									<item.icon size={ scaleWidth(20) } variant='Bold' color={ theme.colors.black } fill={ theme.colors.black } />
									<Text style={ styles.settingTitleStyle } variant='bodyMiddleRegular'>{ t(item.title) }</Text>
								</View>
								<ChevronIcon/>
							</TouchableOpacity>
							<View style={ styles.settingsSeparatorStyle } />
						</View>
					)
				} }
				keyExtractor={ item => item.name }
				bounces={ false }
			 />
		)
	}, [])

	const _renderBottomSheetContent = useCallback(() => {
		return (
			<React.Fragment>
				{ _renderBottomSheetTopContent() }
				{ _renderBottomSheetMidContent() }
				<Text
					variant='bodyExtraSmallRegular'
					style={ styles.versionSyle }
				>
						Version 1.0 - DOTS Board Game Cafe App
				</Text>
			</React.Fragment>
		)
	}, [])

	const _renderMainContent = useCallback(() => {
		if (_isError) return <ReloadView onRefetch={ _onRefresh } />

		return (
			<ScrollView
				bounces={ false }
				showsVerticalScrollIndicator={ false }
				removeClippedSubviews
				onScroll={ e => { setScrollY(e.nativeEvent.contentOffset.y) } }
				scrollEventThrottle={ 16 }
			>
				{ _renderTopContent() }
				{ _renderMidContent() }
			</ScrollView>
		)
	}, [_renderTopContent, _renderMidContent])
	
	return (
		<Container
			manualAppbar
			barStyle={ _getScrollY || isErrorUser ? 'dark-content' : 'light-content' }
		>
			{
				_getScrollY || isErrorUser ?
					<ImageBackground style={ styles.imageBgStyle } source={ BG } /> : null
			}
			{ _renderMainContent() }
			<BottomSheet
				bsRef={ bottomSheetRef }
				viewProps={ { style: styles.bottomSheetView } }>
				{ _renderBottomSheetContent() }
			</BottomSheet>
			<Loading isLoading={ _isLoading } />
		</Container>
	)
}

export default withCommon(React.memo(Profile))
