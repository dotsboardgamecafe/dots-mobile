import {
	View,
	ScrollView,
	Pressable,
	FlatList,
	TouchableOpacity,
} from 'react-native'
import { BlurView } from '@react-native-community/blur'
import { Grayscale } from 'react-native-color-matrix-image-filters'
import get from 'lodash/get'

import React, {
	useCallback, useEffect, useMemo, useRef, useState
} from 'react'
import Container from '../../components/container'
import Header from '../../components/header'
import RoundedBorder from '../../components/rounded-border'
import Text from '../../components/text'
import styles from './styles'
import { formatGridData } from '../../utils/format-grid'
import { neonCircleIllu, getAwardIllu } from '../../assets/images'
import BottomSheet from '../../components/bottom-sheet'
import { type BottomSheetModal } from '@gorhom/bottom-sheet'
import ActionButton from '../../components/action-button'
import VPIcon from '../../assets/svg/VP.svg'
import CloseIcon from '../../assets/svg/close.svg'
import CalendarIcon from '../../assets/svg/calendar.svg'
import { scaleHeight, scaleWidth } from '../../utils/pixel.ratio'
import Modal from '../../components/modal'
import withCommon from '../../hoc/with-common'
import { type NavigationProps } from '../../models/navigation'
import useStorage from '../../hooks/useStorage'
import { badgesApi, useLazyGetBadgesQuery, useUpdateBadgeClaimedMutation } from '../../store/badges'
import Loading from '../../components/loading'
import ReloadView from '../../components/reload-view'
import { type Badges } from '../../models/badges'
import Image from '../../components/image'
import Toast from 'react-native-toast-message'
import { useDispatch } from 'react-redux'

type Props = NavigationProps<'awards'>

const defaultLimit = 15

const Awards = ({ t }: Props): React.ReactNode => {
	const dispatch = useDispatch()
	const pageRef = useRef(1)
	const [selectedFilter, setSelectedFilter] = useState(0)
	const { user } = useStorage()
	const [
		getBadges,
		{
			data: badgesData,
			isLoading: isLoadingBadges,
			isError: isErrorBadges
		}
	] = useLazyGetBadgesQuery()
	const [
		updateBadgeClaimed,
		{
			isLoading: isLoadingUpdateBadgeClaimed,
		}
	] = useUpdateBadgeClaimedMutation()
	const bottomSheetRef = useRef<BottomSheetModal>(null)
	const [selectedAward, setSelectedAward] = useState<Badges>()
	const [modalVisible, setModalVisible] = useState(false)

	const _onPressAward = useCallback((value: Badges) => () => {
		setSelectedAward(value)
		if (value) {
			bottomSheetRef.current?.present()
		} else {
			bottomSheetRef.current?.close()
		}
	}, [bottomSheetRef])

	const _onPressClose = useCallback(() => {
		bottomSheetRef.current?.close()
	}, [bottomSheetRef])

	const _toggleModal = useCallback(() => {
		setModalVisible(!modalVisible)
	}, [modalVisible])

	const _isLoading = useMemo(() => {
		const isLoading = isLoadingBadges
		return isLoading
	}, [isLoadingBadges])

	const _isError = useMemo(() => {
		const isError = isErrorBadges
		return isError
	}, [isErrorBadges])

	const _onRefresh = useCallback(() => {
		dispatch(badgesApi.util.resetApiState())
		pageRef.current = 1
		getBadges({
			code: user?.user_code,
			page: pageRef.current,
			limit: defaultLimit
		})
	}, [user])

	const _onSelectedFilter = useCallback((index: number) => () => {
		setSelectedFilter(index)
	}, [])

	const _factoryBadges = useMemo(() => {
		if (badgesData?.length) {
			const resultBadges = badgesData
			if (selectedFilter) {
				return resultBadges?.filter(item => selectedFilter === 1 ? item.is_badge_owned && item.is_claim : item.is_badge_owned && !item.is_claim)
			}
			return resultBadges
		}

		return []
	}, [badgesData, selectedFilter])

	const onFetchBagdes = useCallback(() => {
		getBadges({
			code: user?.user_code,
			page: pageRef.current,
			limit: defaultLimit
		})
		pageRef.current += 1
	}, [getBadges])

	useEffect(() => {
		onFetchBagdes()
		
		return () => {
			dispatch(badgesApi.util.resetApiState())
		}
	}, [])

	const _onPressUpdateClaimedBadge = useCallback((badge?: Badges) => async() => {
		try {
			await updateBadgeClaimed({ user_code: user?.user_code ?? '', badge_code: badge?.badge_code ?? '' }).unwrap()
			_toggleModal()
		} catch (error) {
			Toast.show({
				type: 'error',
				text1: get(error, 'data', 'Something went wrong')
			})
		}
	}, [user, _toggleModal])

	const _onPressSuccessClaim = useCallback(() => {
		_toggleModal()
		if (selectedAward) {
			setSelectedAward({
				...selectedAward,
				is_claim: true
			})
		}
	}, [_toggleModal, selectedAward])

	const _renderFilterCardRedeem = useMemo(() => {
		const listFilter = [
			'All', 'Claimed', 'Unclaim'
		]

		return (
			<View style={ [styles.filterCardRedeemWrapperStyle, styles.midContentHorizontalStyle] }>
				<ScrollView
					horizontal={ true }
					bounces={ false }
					showsHorizontalScrollIndicator={ false }
					pagingEnabled
					snapToInterval={ 300 }
					decelerationRate='fast'
					removeClippedSubviews
				>
					{
						listFilter.map((item, index) => {
							if (selectedFilter === index) {
								return (
									<RoundedBorder
										style={ styles.selectedfilterCardRedeemItemStyle }
										radius={ 16 }
										borderWidth={ 1 }
										key={ item }
										contentStyle={ styles.selectedfilterCardRedeemItemBackgroundStyle }
									>
										<Text variant='bodyMiddleRegular'>{ item }</Text>
									</RoundedBorder>
								)
							}
							return (
								<Pressable
									key={ item }
									onPress={ _onSelectedFilter(index) }
									style={ styles.filterCardRedeemItemStyle }>
									<Text variant='bodyMiddleRegular'>{ item }</Text>
								</Pressable>
							)
						})
					}
				</ScrollView>
			</View>
		)
	}, [_onSelectedFilter, selectedFilter])

	const _greyScaledImageItem = useCallback((image: string, shouldGrayScale: boolean) => {
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

	const _renderListBadge = useMemo(() => {
		const { numColumns, resultData } = formatGridData<Badges>(_factoryBadges ?? [])

		if (_isError) return <ReloadView onRefetch={ _onRefresh } />

		return (
			<FlatList
				style={ [styles.listGameWrapperStyle, styles.midContentHorizontalStyle] }
				data={ resultData }
				renderItem={ ({ item }) => {
					if (item) {
						return (
							<TouchableOpacity style={ styles.boardGameItemStyle } onPress={ _onPressAward(item) }>
								{
									item?.is_badge_owned ?
										<Image style={ [styles.cardAwardItemImageNeonStyle] } source={ neonCircleIllu }  /> : null
								}
								{ _greyScaledImageItem(item?.badge_image_url, !item?.is_badge_owned) }
							</TouchableOpacity>
						)
					}

					return <View style={ styles.boardGameItemStyle }/>
				} }
				keyExtractor={ (_, index) => index.toString() as any }
				numColumns={ numColumns }
				contentContainerStyle={ [styles.justifyCenterStyle, styles.rowCenterStyle] }
				columnWrapperStyle={ styles.justifyCenterStyle }
				removeClippedSubviews
				onEndReached={ onFetchBagdes }
				onEndReachedThreshold={ 0.8 }
			/>
		)
	}, [_onPressAward, _isError, _factoryBadges, _onRefresh])
  
	const _renderBottomSheetTopContent = useMemo(() => {
		return (
			<View style={ [styles.rowStyle, styles.justifyBetweenStyle] }>
				<Text variant='bodyExtraLargeHeavy'>{ selectedAward?.badge_name }</Text>
				<TouchableOpacity onPress={ _onPressClose }>
					<CloseIcon />
				</TouchableOpacity>
			</View>
		)
	}, [_onPressClose, selectedAward])

	const _greyScaledBluryImage = useCallback((image?: string, shouldGrayScale?: boolean) => {
		const resultImage = <Image
			key={ 'blurryImage' }
			source={ { uri: image } }
			style={ styles.absoluteStyle }
		/>
		
		if (shouldGrayScale) {
			return (
				<Grayscale style={ styles.absoluteStyle }>
					{ resultImage }
				</Grayscale>
			)
		}

		return resultImage
	}, [])

	const _greyScaledDetailImage = useCallback((image?: string, shouldGrayScale?: boolean) => {
		const resultImage = <Image style={ styles.cardAwardItemImageStyle } source={ { uri: image } } />
		
		if (shouldGrayScale) {
			return (
				<Grayscale>
					{ resultImage }
				</Grayscale>
			)
		}

		return resultImage
	}, [])

	const _renderBottomSheetMidContent = useMemo(() => {

		return (
			<View style={ styles.blurViewWrapperStyle }>
				{ _greyScaledBluryImage(selectedAward?.badge_image_url, !selectedAward?.is_badge_owned) }
				<BlurView
					style={ styles.absoluteStyle }
					blurType='light'
					blurAmount={ 10 }
					reducedTransparencyFallbackColor='white'
				/>
				{ _greyScaledDetailImage(selectedAward?.badge_image_url, !selectedAward?.is_badge_owned) }
				{
					selectedAward?.is_claim ?
						<View style={ [styles.absoluteStyle, styles.labelClaimedStyle] } >
							<Text variant='bodySmallMedium' style={ styles.labelClaimedTextStyle }>Claimed</Text>
						</View> :
						null
				}
			</View>
		)
	}, [selectedAward])

	const _renderButton =  useMemo(() => {
		// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
		if (selectedAward?.is_claim) {
			return (
				<View style={ [styles.rowStyle, styles.rowCenterStyle, styles.descriptionPointWrapperStyle] }>
					<CalendarIcon/>
					<Text style={ styles.claimDateStyle } variant='bodySmallRegular'>{ selectedAward?.created_date }</Text>
				</View>
			)
		}

		if (selectedAward?.is_badge_owned) {
			return (
				<ActionButton
					style={ styles.buttonWrapperStyle }
					label={ 'Claim' }
					onPress={ _onPressUpdateClaimedBadge(selectedAward) }
					loading={ isLoadingUpdateBadgeClaimed }
				/>
			)
		}

		return null
	}, [selectedAward, _toggleModal, isLoadingUpdateBadgeClaimed, _onPressUpdateClaimedBadge])

	const _renderBottomSheetBottomContent = useMemo(() => {
		
		return (
			<React.Fragment>
				<View style={ [styles.rowCenterStyle, styles.rowStyle, styles.descriptionPointWrapperStyle] }>
					<Text variant='bodyMiddleRegular'>{ selectedAward?.description }</Text>
					<React.Fragment>
						<Text variant='bodyMiddleMedium'>{ selectedAward?.vp_point }</Text>
						<VPIcon width={ scaleWidth(20) } height={ scaleHeight(20) } />
					</React.Fragment>
				</View>
				{ _renderButton }
			</React.Fragment>
		)
	}, [selectedAward, _renderButton])

	const _bottomSheetContent = useMemo(() => {
		if (selectedAward) {
			return (
				<React.Fragment>
					{ _renderBottomSheetTopContent }
					{ _renderBottomSheetMidContent }
					{ _renderBottomSheetBottomContent }
				</React.Fragment>
			)
		}

		return null
	}, [
		_renderBottomSheetTopContent,
		_renderBottomSheetMidContent,
		_renderBottomSheetBottomContent
	])

	const _renderModalContent = useMemo(() => {
		return (
			<React.Fragment>
				<View style={ styles.rowEndStyle }>
					<TouchableOpacity onPress={ _onPressSuccessClaim }>
						<CloseIcon />
					</TouchableOpacity>
				</View>
				<View style={ styles.rowCenterStyle }>
					<Image source={ getAwardIllu } style={ styles.getAwardImageStyle } />
					<Text style={ styles.congratsStyle } variant='bodyExtraLargeBold'>Congratulations!</Text>
					<View style={ [styles.rowStyle] }>
						<Text variant='bodyMiddleRegular'>You’re successfully earned </Text>
						<Text variant='bodyMiddleMedium'>{ selectedAward?.vp_point }</Text>
						<VPIcon width={ scaleWidth(20) } height={ scaleHeight(20) } />
					</View>
					<Text style={ styles.claimedDescriptionStyle } variant='bodyMiddleRegular'>for claiming the badge “{ selectedAward?.badge_name }”</Text>
					<ActionButton
						style={ styles.buttonWrapperStyle }
						label={ 'OK' }
						onPress={ _onPressSuccessClaim }
					/>
				</View>
			</React.Fragment>
		)
	}, [
		selectedAward,
		_onPressSuccessClaim
	])

	return (
		<Container>
			<Header title={ t('awards-page.header-title') } />
			{ _renderFilterCardRedeem }
			{ _renderListBadge }
			<BottomSheet
				bsRef={ bottomSheetRef }
				viewProps={ { style: styles.bottomSheetView } }
			>
				{ _bottomSheetContent }
			</BottomSheet>
			<Modal borderRadius={ 12 } visible={ modalVisible } onDismiss={ _toggleModal }>
				{ _renderModalContent }
			</Modal>
			<Loading isLoading={ _isLoading } />
		</Container>
	)
}

export default withCommon(React.memo(Awards))