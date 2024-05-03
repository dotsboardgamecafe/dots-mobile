import {
	View, ScrollView, Pressable, FlatList, Image,
	TouchableOpacity
} from 'react-native'
import { BlurView } from '@react-native-community/blur'

import React, { useCallback, useRef, useState } from 'react'
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

const listAwards = [
	{
		title: 'Little Genius Badge',
		image: 'https://cf.geekdo-images.com/iwevA6XmiNLHn1QnGUucqw__itemrep/img/QC2OAbicZssRpGJkUmp0Zbto-cs=/fit-in/246x300/filters:strip_icc()/pic3880340.jpg',
		description: 'Play game Dungeon of Dragon 3 times and get',
		point: 200,
		claimed: false,
		claimDate: ''
	},
	{
		title: 'Curious Badge',
		image: 'https://cf.geekdo-images.com/Nnzu4eqkUoGybbziFGPI6g__itemrep/img/iGanwQiMDaXz5AiNdf2ynDFHVXA=/fit-in/246x300/filters:strip_icc()/pic5212377.png',
		description: 'Congratulations! You’re successfully played Dungeon of Dragon board game for 3 times.',
		point: 200,
		claimed: true,
		claimDate: 'Nov, 25th 2023'
	},
	{
		title: 'Little Genius Badge',
		image: 'https://cf.geekdo-images.com/XNbpOGwHR2PkoZ3TiIfxaw__itemrep/img/07N0xOAF1zoCpbPtUYlmzYrYe9I=/fit-in/246x300/filters:strip_icc()/pic7545827.png',
		description: 'Play game Dungeon of Dragon 3 times and get',
		point: 200,
		claimed: false,
		claimDate: ''
	},
	{
		title: 'Curious Badge',
		image: 'https://cf.geekdo-images.com/A_XP2_VN3ugyqPhezowB_w__itemrep/img/wGng6fVAYRI5NKBX6x-pksZKJGI=/fit-in/246x300/filters:strip_icc()/pic8026369.png',
		description: 'Congratulations! You’re successfully played Dungeon of Dragon board game for 3 times.',
		point: 200,
		claimed: true,
		claimDate: 'Nov, 25th 2023'
	},
	{
		title: 'Curious Badge',
		image: 'https://cf.geekdo-images.com/JUrmY8GgFPQlENiPT7BGZw__itemrep/img/3ttYjcoLikqMvCeaX3iyc71YubI=/fit-in/246x300/filters:strip_icc()/pic6884563.jpg',
		description: 'Congratulations! You’re successfully played Dungeon of Dragon board game for 3 times.',
		point: 200,
		claimed: true,
		claimDate: 'Nov, 25th 2023'
	}
]

const Awards = (): React.ReactNode => {
	const bottomSheetRef = useRef<BottomSheetModal>(null)
	const [selectedAward, setSelectedAward] = useState<any>()
	const [modalVisible, setModalVisible] = useState(false)

	const _onPressAward = useCallback((value: any) => () => {
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

	const _renderFilterCardRedeem = useCallback(() => {
		const listFilter = [
			'All', 'Food and Beverage', 'Tournament', 'Game Room', 'Most Favorite'
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
							if (index === 1) {
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
								<Pressable style={ styles.filterCardRedeemItemStyle } key={ item }>
									<Text variant='bodyMiddleRegular'>{ item }</Text>
								</Pressable>
							)
						})
					}
				</ScrollView>
			</View>
		)
	}, [])

	const _renderListGame = useCallback(() => {
		const { numColumns, resultData } = formatGridData(listAwards)

		return (
			<FlatList
				style={ [styles.listGameWrapperStyle, styles.midContentHorizontalStyle] }
				data={ resultData }
				renderItem={ ({ item }) => {
					if (item) return (
						<TouchableOpacity style={ styles.boardGameItemStyle } onPress={ _onPressAward(item) }>
							<Image style={ [styles.cardAwardItemImageNeonStyle] } source={ neonCircleIllu }  />
							<Image style={ [styles.cardAwardItemImageStyle, styles.cardAwardAbsoluteStyle] } source={ { uri: item.image  } }  />
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
	}, [_onPressAward])
  
	const _renderBottomSheetTopContent = useCallback(() => {
		return (
			<View style={ [styles.rowStyle, styles.justifyBetweenStyle] }>
				<Text variant='bodyExtraLargeHeavy'>{ selectedAward?.title }</Text>
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
					source={ { uri: selectedAward.image } }
					style={ styles.absoluteStyle }
				/>
				<BlurView
					style={ styles.absoluteStyle }
					blurType='light'
					blurAmount={ 10 }
					reducedTransparencyFallbackColor='white'
				/>
				<Image style={ styles.cardAwardItemImageStyle } source={ { uri: selectedAward.image } } />
			</View>
		)
	}, [selectedAward])

	const _renderButton =  useCallback(() => {
		if (selectedAward.claimed) {
			return (
				<View style={ [styles.rowStyle, styles.rowCenterStyle, styles.descriptionPointWrapperStyle] }>
					<CalendarIcon/>
					<Text style={ styles.claimDateStyle } variant='bodySmallRegular'>{ selectedAward.claimDate }</Text>
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
					<Text variant='bodyMiddleRegular'>{ selectedAward.description }</Text>
					{
						selectedAward.claimed ? null :
							<React.Fragment>
								<Text variant='bodyMiddleMedium'> { selectedAward.point }</Text>
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
						<Text variant='bodyMiddleMedium'> { selectedAward?.point }</Text>
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
			<Header title='Awards' />
			{ _renderFilterCardRedeem() }
			{ _renderListGame() }
			<BottomSheet
				bsRef={ bottomSheetRef }
				viewProps={ { style: styles.bottomSheetView } }
			>
				{ _bottomSheetContent() }
			</BottomSheet>
			<Modal borderRadius={ 12 } visible={ modalVisible } onDismiss={ _toggleModal }>
				{ _renderModalContent() }
			</Modal>
		</Container>
	)
}

export default Awards