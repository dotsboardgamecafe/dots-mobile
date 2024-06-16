import {
	View, ScrollView, Pressable, FlatList,
	TouchableOpacity
} from 'react-native'
import { BlurView } from '@react-native-community/blur'
import { Grayscale } from 'react-native-color-matrix-image-filters'

import React, { useCallback, useMemo, useRef, useState } from 'react'
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
import { useGetBadgesQuery } from '../../store/badges'
import Loading from '../../components/loading'
import ReloadView from '../../components/reload-view'
import { type Badges } from '../../models/badges'
import Image from '../../components/image'

type Props = NavigationProps<'awards'>

const Awards = ({ t }: Props): React.ReactNode => {
	const [selectedFilter, setSelectedFilter] = useState(0)
	const { user } = useStorage()
	const {
		data: badgesData,
		isLoading: isLoadingBadges,
		refetch: refetchBadges,
		isError: isErrorBadges
	} = useGetBadgesQuery({
		code: user?.user_code,
	})
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
		refetchBadges()
	}, [])

	const _onSelectedFilter = useCallback((index: number) => () => {
		setSelectedFilter(index)
	}, [])

	const _factoryAwards = useMemo(() => {
		if (badgesData?.length) {
			const resultBadges = badgesData
			if (selectedFilter) {
				return resultBadges?.filter(item => selectedFilter === 1 ? item.is_badge_owned : !item.is_claim)
			}
			return resultBadges
		}

		return []
	}, [badgesData, selectedFilter])

	const _renderFilterCardRedeem = useCallback(() => {
		const listFilter = [
			'All', 'Owned', 'Unclaim'
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

	const _renderListBadge = useCallback(() => {
		const { numColumns, resultData } = formatGridData<Badges>(_factoryAwards ?? [])

		if (_isError) return <ReloadView onRefetch={ _onRefresh } />

		return (
			<FlatList
				style={ [styles.listGameWrapperStyle, styles.midContentHorizontalStyle] }
				data={ resultData }
				renderItem={ ({ item }) => {
					if (item) return (
						<TouchableOpacity style={ styles.boardGameItemStyle } onPress={ _onPressAward(item) }>
							{
								item?.is_badge_owned ?
									<Image style={ [styles.cardAwardItemImageNeonStyle] } source={ neonCircleIllu }  /> : null
							}
							{ _greyScaledImage(item?.badge_image_url, !item?.is_badge_owned) }
						</TouchableOpacity>
					)

					return <View style={ styles.boardGameItemStyle }/>
				} }
				keyExtractor={ (_, index) => index.toString() as any }
				numColumns={ numColumns }
				scrollEnabled={ false }
				contentContainerStyle={ [styles.justifyCenterStyle, styles.rowCenterStyle] }
				columnWrapperStyle={ styles.justifyCenterStyle }
				removeClippedSubviews
			/>
		)
	}, [_onPressAward, _isError, _factoryAwards])
  
	const _renderBottomSheetTopContent = useCallback(() => {
		return (
			<View style={ [styles.rowStyle, styles.justifyBetweenStyle] }>
				<Text variant='bodyExtraLargeHeavy'>{ selectedAward?.badge_name }</Text>
				<TouchableOpacity onPress={ _onPressClose }>
					<CloseIcon />
				</TouchableOpacity>
			</View>
		)
	}, [_onPressClose, selectedAward])

	const _renderBottomSheetMidContent = useCallback(() => {
		return (
			<View style={ styles.blurViewWrapperStyle }>
				<Image
					key={ 'blurryImage' }
					source={ { uri: selectedAward?.badge_image_url } }
					style={ styles.absoluteStyle }
				/>
				<BlurView
					style={ styles.absoluteStyle }
					blurType='light'
					blurAmount={ 10 }
					reducedTransparencyFallbackColor='white'
				/>
				<Image style={ styles.cardAwardItemImageStyle } source={ { uri: selectedAward?.badge_image_url } } />
			</View>
		)
	}, [selectedAward])

	const _renderButton =  useCallback(() => {
		if (selectedAward?.is_claim) {
			return (
				<View style={ [styles.rowStyle, styles.rowCenterStyle, styles.descriptionPointWrapperStyle] }>
					<CalendarIcon/>
					<Text style={ styles.claimDateStyle } variant='bodySmallRegular'>{ selectedAward.created_date }</Text>
				</View>
			)
		}
		return (
			<ActionButton
				style={ styles.buttonWrapperStyle }
				label={ 'Play the Game' }
				onPress={ _toggleModal }
			/>
		)
	}, [selectedAward, _toggleModal])

	const _renderBottomSheetBottomContent = useCallback(() => {
		return (
			<React.Fragment>
				<View style={ [styles.rowCenterStyle, styles.rowStyle, styles.descriptionPointWrapperStyle] }>
					<Text variant='bodyMiddleRegular'>{ selectedAward?.badge_name }</Text>
					{
						selectedAward?.is_claim ? null :
							<React.Fragment>
								<Text variant='bodyMiddleMedium'>100</Text>
								<VPIcon width={ scaleWidth(20) } height={ scaleHeight(20) } />
							</React.Fragment>
					}
				</View>
				{ _renderButton() }
			</React.Fragment>
		)
	}, [selectedAward, _renderButton])

	const _bottomSheetContent = useCallback(() => {
		if (selectedAward) {
			return (
				<React.Fragment>
					{ _renderBottomSheetTopContent() }
					{ _renderBottomSheetMidContent() }
					{ _renderBottomSheetBottomContent() }
				</React.Fragment>
			)
		}

		return null
	}, [
		_renderBottomSheetTopContent,
		_renderBottomSheetMidContent,
		_renderBottomSheetBottomContent
	])

	const _renderModalContent = useCallback(() => {
		return (
			<React.Fragment>
				<View style={ styles.rowEndStyle }>
					<TouchableOpacity onPress={ _toggleModal }>
						<CloseIcon />
					</TouchableOpacity>
				</View>
				<View style={ styles.rowCenterStyle }>
					<Image source={ getAwardIllu } style={ styles.getAwardImageStyle } />
					<Text style={ styles.congratsStyle } variant='bodyExtraLargeBold'>Congratulations!</Text>
					<View style={ [styles.rowStyle] }>
						<Text variant='bodyMiddleRegular'>You’re successfully earned</Text>
						<Text variant='bodyMiddleMedium'>100</Text>
						<VPIcon width={ scaleWidth(20) } height={ scaleHeight(20) } />
					</View>
					<Text style={ styles.claimedDescriptionStyle } variant='bodyMiddleRegular'>for claiming the badge “Comedy Smile”</Text>
					<ActionButton
						style={ styles.buttonWrapperStyle }
						label={ 'OK' }
						onPress={ _toggleModal }
					/>
				</View>
			</React.Fragment>
		)
	}, [
		_toggleModal
	])

	return (
		<Container>
			<Header title={ t('awards-page.header-title') } />
			{ _renderFilterCardRedeem() }
			{ _renderListBadge() }
			<BottomSheet
				bsRef={ bottomSheetRef }
				viewProps={ { style: styles.bottomSheetView } }
			>
				{ _bottomSheetContent() }
			</BottomSheet>
			<Modal borderRadius={ 12 } visible={ modalVisible } onDismiss={ _toggleModal }>
				{ _renderModalContent() }
			</Modal>
			<Loading isLoading={ _isLoading } />
		</Container>
	)
}

export default withCommon(React.memo(Awards))