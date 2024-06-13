import React, {
	Suspense, lazy, useCallback, useMemo, useRef, useState
} from 'react'
import Container from '../../components/container'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
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
import ChevronIcon from '../../assets/svg/chevron.svg'
import UserEditIcon from '../../assets/svg/user-edit.svg'
import {
	Camera,
	Edit2,
	Gallery,
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
import ActionButton from '../../components/action-button'
import Modal from '../../components/modal'
import { Avatar } from 'react-native-paper'
import { Grayscale } from 'react-native-color-matrix-image-filters'
import FilterIcon from '../../components/filter-icon'
import { useDispatch } from 'react-redux'
import Toast from 'react-native-toast-message'
import { baseApi } from '../../utils/base.api'

type Props = NavigationProps<'profile'>

type SettingName = 'accountInformation' | 'editPassword' | 'tnc' | 'privacyPolicy' | 'logout' | 'editProfile' | 'takePhoto' | 'selectImage'

interface SettingsType {
	name: SettingName,
	title: string,
	icon: React.ElementType
}

type Destionation = 'awards' | 'gameBoardCollection'

type BottomSheetType = 'settings' | 'changeAvatar'

const LazyBannerTier = lazy(async() => await import('../../components/banner-tier'))

const settings: SettingsType[] = [
	{ name: 'accountInformation', title: 'profile-page.settings.account-information-title', icon: UserEditIcon },
	{ name: 'editProfile', title: 'profile-page.settings.edit-profile-title', icon: Edit2 },
	{ name: 'editPassword', title: 'profile-page.settings.edit-password-title', icon: Lock },
	// { name: 'tnc', title: 'profile-page.settings.tnc-title', icon: ShieldTick },
	// { name: 'privacyPolicy', title: 'profile-page.settings.privacy-policy-title', icon: TableDocument },
	{ name: 'logout', title: 'profile-page.settings.logout-title', icon: LogoutCurve },
]

const changeAvatar: SettingsType[] = [
	{ name: 'takePhoto', title: 'profile-page.settings.take-photo-title', icon: Camera },
	{ name: 'selectImage', title: 'profile-page.settings.select-library-title', icon: Gallery },
]

const Profile = ({ navigation, theme, t }: Props):React.ReactNode => {
	const dispatch = useDispatch()
	const [selectedImage, setSelectedImage] = useState('')
	const [selectedBottomSheet, setSelectedBottomSheet] = useState<BottomSheetType | null>(null)
	const [modalVisible, setModalVisible] = useState(false)
	const { user } = useStorage()
	const {
		data: userProfileData,
		isFetching: isLoadingUser,
		refetch: refetchUser,
		isError: isErrorUser
	} = useGetUserProfileQuery()
	const {
		data: gameBoardCollectionData,
		isFetching: isLoadingGameBoardCollection,
		refetch: refetchGameBoardCollection,
		isError: isErrorGameBoardCollection
	} = useGetGameBoardCollectionQuery(user?.user_code)
	const {
		data: badgesData,
		isFetching: isLoadingBadges,
		refetch: refetchBadges,
		isError: isErrorBadges
	} = useGetBadgesQuery({
		limit: 4,
		page: 1,
		code: user?.user_code,
	})
	const {
		data: gameFavouriteData,
		isFetching: isLoadingGameFavourite,
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

	const _toggleModal = useCallback(() => {
		setModalVisible(!modalVisible)
	}, [modalVisible])

	const _handleResponseImage = useCallback((response: any) => {
		 if (response.errorCode) {
			Toast.show({
				type: 'error',
				text1: 'Camera Error: ' + response.errorCode
			})
		} else {
			const imageUri: string = response.assets ? response.assets[0].uri : ''

			_toggleModal()
			setSelectedImage(imageUri)
		}
	}, [_toggleModal])

	const _onPressSettingItem = useCallback((name: SettingName) => () => {
		bottomSheetRef.current?.close()
		if (name === 'logout') {
			dispatch(baseApi.util.resetApiState())
			onSetLogout()
			return
		}
		if (name === 'takePhoto' || name === 'selectImage') {
			if (name === 'takePhoto')  {
				launchCamera({ mediaType: 'photo' }, _handleResponseImage)
			} else {
				launchImageLibrary({
					mediaType: 'photo',
					maxWidth: 5000,
					maxHeight: 5000
				}, _handleResponseImage)
			}

			return
		}
		
		navigation.navigate(name)
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

	const _onShowBottomSheet = useCallback((bottomSheetType: BottomSheetType) => {
		setSelectedBottomSheet(bottomSheetType)
		bottomSheetRef.current?.present()
	}, [])

	const _isLoading = useMemo(() => {
		const isLoading = isLoadingUser || isLoadingBadges || isLoadingGameFavourite || isLoadingGameBoardCollection
		return isLoading
	}, [isLoadingUser, isLoadingBadges, isLoadingGameFavourite, isLoadingGameBoardCollection])

	const _isError = useMemo(() => {
		const isError = isErrorUser || isErrorBadges || isErrorGameFavourite || isErrorGameBoardCollection
		return isError
	}, [isErrorUser, isErrorBadges, isErrorGameFavourite, isErrorGameBoardCollection])

	const _greyScaledImage = useCallback((image: string, shouldGrayScale: boolean) => {
		const imageStyle = shouldGrayScale ? styles.cardAwardUnClaimStyle :  styles.cardAwardItemImageStyle
		if (shouldGrayScale) {
			return (
				<Grayscale style={ [styles.rowCenterStyle, styles.justifyCenterStyle] }>
					<Image style={ [imageStyle, styles.cardAwardAbsoluteStyle] } source={ { uri: image  } }  />
				</Grayscale>
			)
		}

		return <Image style={ [imageStyle, styles.cardAwardAbsoluteStyle] } source={ { uri: image  } }  />
	}, [])

	const _renderModalContent = useMemo(() => {
		return (
			<React.Fragment>
				<View style={ styles.rowEndStyle }>
					<TouchableOpacity onPress={ _toggleModal }>
						<CloseIcon />
					</TouchableOpacity>
				</View>
				<View style={ styles.rowCenterStyle }>
					<Avatar.Image size={ scaleWidth(120) } source={ { uri: selectedImage } }/>
					<Text style={ styles.changePictureDescriptionStyle } variant='bodyLargeRegular'>
						Are you sure want to change this picture ?
					</Text>
					<ActionButton
						label={ 'Change Picture' }
						onPress={ _toggleModal }
					/>
				</View>
			</React.Fragment>
		)
	}, [
		_toggleModal,
		selectedImage
	])

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

	const _renderListGame = useMemo(() => {
		const { numColumns, resultData } = formatGridData<GameBoardCollection>(gameBoardCollectionData ?? [])

		return (
			<FlatList
				style={ styles.listGameWrapperStyle }
				data={ resultData }
				renderItem={ ({ item, index }) => {
					if (item) return <Image source={ { uri: item.game_image_url } } style={ styles.boardGameItemStyle } />

					return <View key={ index } style={ styles.boardGameItemStyle }/>
				} }
				keyExtractor={ (item, index) => item ? item.game_id.toString() : index.toString() }
				numColumns={ numColumns }
				scrollEnabled={ false }
				contentContainerStyle={ [styles.justifyCenterStyle, styles.rowCenterStyle] }
				columnWrapperStyle={ styles.justifyCenterStyle }
				ItemSeparatorComponent={ () => <Image resizeMode='contain' source={ rackIllu } style={ styles.boardGameItemSeparatorStyle } /> }
				ListFooterComponent={ () => <Image resizeMode='contain' source={ rackIllu } style={ styles.boardGameItemSeparatorStyle } />  }
				ListEmptyComponent={ () => <View/> }
				removeClippedSubviews
			/>
		)
	}, [gameBoardCollectionData])

	const _renderBoardGameCollection = useMemo((): React.ReactNode => {
		return (
			<React.Fragment>
				{ _renderTitle(t('profile-page.game-collection-title'), 'gameBoardCollection') }
				{ _renderListGame }
			</React.Fragment>
		)
	}, [_renderListGame])

	const _renderAward = useMemo((): React.ReactNode => {
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
								{
									item?.is_badge_owned ?
										<Image style={ [styles.cardAwardItemImageNeonStyle] } source={ neonCircleIllu }  /> : null
								}
								{ _greyScaledImage(item?.badge_image_url, !item?.is_badge_owned) }
							</View>
						)
					})
				) }
			</View>
		)
	}, [badgesData])

	const _renderFavoriteGame = useMemo((): React.ReactNode => {
		return (
			<View style={ styles.awardWrapperStyle }>
				{ _renderTitle(t('profile-page.favorite-game-title'), 'awards', false) }
				{ _renderScrollView(
					gameFavouriteData?.map(item => {
						const codeGame = item.game_category_name.toLowerCase().split(' ')
							.join('_')
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
								<FilterIcon set_group='game_mechanic' set_key={ codeGame }  />
								<Text style={ styles.gamefavTitleStyle } variant='bodyMiddleRegular'>{ item.game_category_name }</Text>
							</RoundedBorder>
						)
					})
				) }
			</View>
		)
	}, [gameFavouriteData])

	const _renderMidContent = useMemo(() => {
		return (
			<View style={ styles.midContentStyle }>
				{ _renderBoardGameCollection }
				{ _renderAward }
				{ _renderFavoriteGame }
			</View>
		)
	}, [_renderBoardGameCollection, _renderAward, _renderFavoriteGame])

	const _renderTopContent = useMemo(() => {
		return (
			<Suspense fallback={
				<View style={ styles.starsFieldContentStyle } />
			 }>
				<LazyBannerTier
					userProfileData={ userProfileData }
					screen='profile'
					style={ styles.bannerStyle }
					starsFieldContentStyle={ styles.starsFieldContentStyle }
					onPressTripleDot={ () => { _onShowBottomSheet('settings') } }
					onPressChangeAvatar={ () => { _onShowBottomSheet('changeAvatar') } }
				/>
			</Suspense>
		)
	}, [bottomSheetRef, userProfileData, selectedImage])

	const _renderBottomSheetTopContent = useMemo(() => {
		const title = selectedBottomSheet === 'settings' ? 'Settings' : 'Change Avatar'
		return (
			<View style={ [styles.rowStyle, styles.justifyBetweenStyle] }>
				<Text variant='bodyExtraLargeHeavy'>{ title }</Text>
				<TouchableOpacity onPress={ () => bottomSheetRef.current?.close() }>
					<CloseIcon />
				</TouchableOpacity>
			</View>
		)
	}, [selectedBottomSheet])

	const _renderBottomSheetMidContent = useMemo(() => {
		const listMenu = selectedBottomSheet === 'settings' ? settings : changeAvatar
		return (
			<FlatList
				style={ styles.settingWrapperStyle }
				data={ listMenu }
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
	}, [selectedBottomSheet])

	const _renderBottomSheetContent = useMemo(() => {
		return (
			<React.Fragment>
				{ _renderBottomSheetTopContent }
				{ _renderBottomSheetMidContent }
				<Text
					variant='bodyExtraSmallRegular'
					style={ styles.versionSyle }
				>
						Version 1.0 - DOTS Board Game Cafe App
				</Text>
			</React.Fragment>
		)
	}, [_renderBottomSheetTopContent])

	const _renderMainContent = useMemo(() => {
		if (_isError) return <ReloadView onRefetch={ _onRefresh } />

		return (
			<ScrollView
				bounces={ false }
				showsVerticalScrollIndicator={ false }
				removeClippedSubviews
				onScroll={ e => { setScrollY(e.nativeEvent.contentOffset.y) } }
				scrollEventThrottle={ 16 }
				contentContainerStyle={ styles.mainContentStyle }
			>
				{ _renderTopContent }
				{ _renderMidContent }
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
			{ _renderMainContent }
			<BottomSheet
				bsRef={ bottomSheetRef }
				viewProps={ { style: styles.bottomSheetView } }>
				{ _renderBottomSheetContent }
			</BottomSheet>
			<Modal borderRadius={ 12 } visible={ modalVisible } onDismiss={ _toggleModal }>
				{ _renderModalContent }
			</Modal>
			<Loading isLoading={ _isLoading } />
		</Container>
	)
}

export default withCommon(React.memo(Profile))
