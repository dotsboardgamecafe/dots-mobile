import {
	type ListRenderItemInfo, View, Pressable, Image, Alert,
	TouchableOpacity
} from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import Container from '../../components/container'
import Header from '../../components/header'
import styles from './styles'
import { FlatList } from 'react-native-gesture-handler'
import Text from '../../components/text'
import { colorsTheme } from '../../constants/theme'
import colors from '../../constants/colors'
import BottomSheet from '../../components/bottom-sheet'
import { type BottomSheetModal } from '@gorhom/bottom-sheet'
import { BlurView } from '@react-native-community/blur'
import CloseIcon from '../../assets/svg/close.svg'
import RoundedBorder from '../../components/rounded-border'

type NotifType = 	'upcoming' | 'canceled' | 'confirmation'

interface ListPointActivityType {
	code: string,
	title: string,
	schedule: string,
	image:string,
	type: NotifType
}

interface TitleStyleType {
	title: string,
	color: string
}

const listPointActivity: ListPointActivityType[] = [
	{
		code: '1',
		title: 'Apiary Tournament Game',
		schedule: 'Feb 10, 2024 - 15:00 PM',
		image: 'https://cf.geekdo-images.com/iwevA6XmiNLHn1QnGUucqw__itemrep/img/QC2OAbicZssRpGJkUmp0Zbto-cs=/fit-in/246x300/filters:strip_icc()/pic3880340.jpg',
		type: 'upcoming'
	},
	{
		code: '2',
		title: 'Vanguard Game Room',
		schedule: 'Feb 03, 2024 - 09:00 AM',
		image: 'https://cf.geekdo-images.com/XNbpOGwHR2PkoZ3TiIfxaw__itemrep/img/07N0xOAF1zoCpbPtUYlmzYrYe9I=/fit-in/246x300/filters:strip_icc()/pic7545827.png',
		type: 'confirmation'
	},
	{
		code: '3',
		title: 'Apiary Tournament Game',
		schedule: 'Jan 25, 2024 - 08:00 PM',
		image: 'https://cf.geekdo-images.com/Nnzu4eqkUoGybbziFGPI6g__itemrep/img/iGanwQiMDaXz5AiNdf2ynDFHVXA=/fit-in/246x300/filters:strip_icc()/pic5212377.png',
		type: 'canceled'
	},
]

const _generateNotifTitle = (type: NotifType): TitleStyleType => {
	const result = {
		title: 'CANCELED ROOM',
		color: colors.lightTheme.redAccent
	}
	if (type === 'upcoming') {
		result.title = 'UPCOMING REMINDER'
		result.color = colors.lightTheme.blueAccent
	}
	if (type === 'confirmation') {
		result.title = 'BOOKING CONFIRMATION'
		result.color = colors.lightTheme.blue500
	}
	return result
}

const Notifications = (): React.ReactNode => {
	const [selectedNotif, setSelectedNotif] = useState<ListPointActivityType>()
	const bottomSheetRef = useRef<BottomSheetModal>(null)

	const _onPressNotif = useCallback((notif: ListPointActivityType) => {
		setSelectedNotif(notif)
		bottomSheetRef.current?.present()
	}, [])

	const _onPressClose = useCallback(() => {
		bottomSheetRef.current?.close()
	}, [bottomSheetRef])

	const _renderItem = useCallback(({ item, index }:ListRenderItemInfo<ListPointActivityType>): React.ReactElement => {
		const { title, color } = _generateNotifTitle(item.type)
		return (
			<Pressable style={ {
				...styles.rowStyle,
				...styles.itemWrapperStyle,
				backgroundColor: index === 0 ? colorsTheme.yellowTransparent : colorsTheme.grayMedium
			} }
			onPress={ () => { _onPressNotif(item) } }
			>
				<View style={ {
					...styles.dotStyle,
					backgroundColor: index === 0 ? colorsTheme.black : colorsTheme.gray300,
				} } />
				<Pressable onPress={ () => { Alert.alert('image') } }>
					<Image
						source={ { uri: item.image } }
						style={ styles.imageGameStyle }
					/>
				</Pressable>
				<View style={ styles.growStyle }>
					<View style={ [styles.rowStyle, styles.spaceBetweenStyle] }>
						<Text variant='bodyMiddleBold' style={ { color, letterSpacing: -1 } }>{ title }</Text>
						<Text variant='bodySmallMedium'>30 Minutes Ago</Text>
					</View>
					<View style={ [styles.rowStyle, styles.rowCenterStyle, styles.spaceBetweenStyle] }>
						<View>
							<Text variant='bodyMiddleDemi' style={ styles.titleStyle }>{ item.title }</Text>
							<Text variant='bodySmallRegular' >{ item.schedule }</Text>
						</View>
					</View>
				</View>
			</Pressable>
		)
	}, [])

	const _renderContent = useCallback(() => {
		return (
			<View>
				<FlatList
					data={ listPointActivity }
					renderItem={ _renderItem }
					keyExtractor={ item => item.code }
					scrollEnabled={ false }
					ItemSeparatorComponent={ () => <View style={ styles.itemSeparatorStyle }/> }
				/>
			</View>
		)
	}, [])

	const _renderBottomSheetTopContent = useCallback(() => {
		return (
			<View style={ [styles.rowStyle, styles.spaceBetweenStyle] }>
				<Text variant='bodyExtraLargeHeavy'>{ selectedNotif?.title }</Text>
				<TouchableOpacity onPress={ _onPressClose }>
					<CloseIcon />
				</TouchableOpacity>
			</View>
		)
	}, [_onPressClose, selectedNotif])

	const _renderBottomSheetMidContent = useCallback(() => {
		return (
			<View style={ styles.blurViewWrapperStyle }>
				<Image
					key={ 'blurryImage' }
					source={ { uri: selectedNotif?.image } }
					style={ styles.absoluteStyle }
				/>
				<BlurView
					style={ styles.absoluteStyle }
					blurType='light'
					blurAmount={ 10 }
					reducedTransparencyFallbackColor='white'
				/>
				<View style={ [styles.roundedBorderStyle, styles.rowCenterStyle, styles.spaceBetweenStyle] }>
					<RoundedBorder
						style={ styles.roundedBorderStyle }
						radius={ 20 }
						contentStyle={ styles.roundedBorderContentStyle }>
						<Image style={ styles.cardAwardItemImageStyle } source={ { uri: selectedNotif?.image } } />
					</RoundedBorder>
				</View>
			</View>
		)
	}, [selectedNotif])

	const _renderBottomSheetBottomContent = useCallback(() => {
		return (
			<View style={ styles.bottomsheetBottomContentStyle }>
				<View style={ styles.rowStyle }>
					<Text style={ styles.titleBottomSheetBottomContentStyle } variant='bodyMiddleRegular'>Schedule</Text>
					<Text variant='bodyMiddleMedium'>{ selectedNotif?.schedule }</Text>
				</View>
				<View style={ styles.rowStyle }>
					<Text style={ styles.titleBottomSheetBottomContentStyle } variant='bodyMiddleRegular'>Location</Text>
					<Text variant='bodyMiddleMedium'>{ selectedNotif?.schedule }</Text>
				</View>
				<View style={ styles.rowStyle }>
					<Text style={ styles.titleBottomSheetBottomContentStyle } variant='bodyMiddleRegular'>Level</Text>
					<Text variant='bodyMiddleMedium'>{ selectedNotif?.schedule }</Text>
				</View>
			</View>
		)
	}, [selectedNotif])

	const _bottomSheetContent = useCallback(() => {
		return (
			<React.Fragment>
				{ _renderBottomSheetTopContent() }
				{ _renderBottomSheetMidContent() }
				{ _renderBottomSheetBottomContent() }
			</React.Fragment>
		)

	}, [
		_renderBottomSheetTopContent,
		_renderBottomSheetMidContent,
	])

	return (
		<Container>
			<Header title='Notifications' />
			{ _renderContent() }
			<BottomSheet
				bsRef={ bottomSheetRef }
				viewProps={ { style: styles.bottomSheetView } }
			>
				{ _bottomSheetContent() }
			</BottomSheet>
		</Container>
	)
}

export default React.memo(Notifications)