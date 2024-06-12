import {
	type ListRenderItemInfo, View, Pressable,
	TouchableOpacity
} from 'react-native'
import React, {
	useCallback, useEffect, useMemo, useRef, useState
} from 'react'
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
import {  notificationsApi, useLazyGetNotificationsQuery, useUpdateSeenNotificationMutation } from '../../store/notifications'
import { type Notification } from '../../models/notification'
import Image from '../../components/image'
import Loading from '../../components/loading'
import ReloadView from '../../components/reload-view'
import moment from 'moment'
import { useDispatch } from 'react-redux'

interface TitleStyleType {
	title: string,
	color: string
}

const _generateNotifTitle = (type: string): TitleStyleType => {
	const result = {
		title: 'CANCELED ROOM',
		color: colors.lightTheme.redAccent
	}
	if (type === 'tournament_reminder') {
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
	const dispatch = useDispatch()
	const pageRef = useRef(1)
	const [
		fetchNotifications, { data: notificationsData, isFetching: isFetchingNotifications, isError: isErrorNotifications,  }
	] = useLazyGetNotificationsQuery()
	const [updateSeenNotification] = useUpdateSeenNotificationMutation()
	const [selectedNotif, setSelectedNotif] = useState<Notification>()
	const bottomSheetRef = useRef<BottomSheetModal>(null)

	const _onPressNotif = useCallback((notif: Notification) => {
		setSelectedNotif(notif)
		bottomSheetRef.current?.present()
		updateSeenNotification(notif)
	}, [])

	const _onPressClose = useCallback(() => {
		bottomSheetRef.current?.close()
	}, [bottomSheetRef])

	const onFetchNotifications = useCallback(() => {
		fetchNotifications(pageRef.current)
		pageRef.current += 1
	}, [fetchNotifications])

	useEffect(() => {
		onFetchNotifications()
		
		return () => {
			dispatch(notificationsApi.util.resetApiState())
		}
	}, [])

	const _renderItem = useCallback(({ item, index }:ListRenderItemInfo<Notification>): React.ReactElement => {
		const { title, color } = _generateNotifTitle(item.type)
		return (
			<Pressable style={ {
				...styles.rowStyle,
				...styles.itemWrapperStyle,
				backgroundColor: !item.status_read ? colorsTheme.yellowTransparent : colorsTheme.grayMedium
			} }
			onPress={ () => { _onPressNotif(item) } }
			>
				<View style={ {
					...styles.dotStyle,
					backgroundColor: !item.status_read ? colorsTheme.black : colorsTheme.gray300,
				} } />
				<Pressable
					// onPress={ () => { Alert.alert('image') } }
				>
					<Image
						source={ { uri: item.image_url } }
						style={ styles.imageGameStyle }
					/>
				</Pressable>
				<View style={ styles.growStyle }>
					<View style={ [styles.rowStyle, styles.spaceBetweenStyle] }>
						<Text variant='bodyMiddleBold' style={ { color, letterSpacing: -1 } }>{ title }</Text>
						<Text variant='bodySmallMedium'>{ moment(item.created_date).fromNow() }</Text>
					</View>
					<View style={ [styles.rowStyle, styles.rowCenterStyle, styles.spaceBetweenStyle] }>
						<View>
							<Text variant='bodyMiddleDemi' style={ styles.titleStyle }>{ item.title }</Text>
							<Text variant='bodySmallRegular' >{ item.created_date }</Text>
						</View>
					</View>
				</View>
			</Pressable>
		)
	}, [])

	const _renderContent = useMemo(() => {
		if (isErrorNotifications) {
			return (
				<ReloadView onRefetch={ async() => await fetchNotifications(0) } />
			)
		}
		return (
			<View>
				<FlatList
					data={ notificationsData ?? [] }
					renderItem={ _renderItem }
					keyExtractor={ (_, index) => index.toString() }
					ItemSeparatorComponent={ () => <View style={ styles.itemSeparatorStyle }/> }
					onEndReached={ onFetchNotifications }
					onEndReachedThreshold={ 0.8 }
				/>
			</View>
		)
	}, [notificationsData, isErrorNotifications])

	const _renderBottomSheetTopContent = useMemo(() => {
		return (
			<View style={ [styles.rowStyle, styles.spaceBetweenStyle] }>
				<Text variant='bodyExtraLargeHeavy'>{ selectedNotif?.title }</Text>
				<TouchableOpacity onPress={ _onPressClose }>
					<CloseIcon />
				</TouchableOpacity>
			</View>
		)
	}, [_onPressClose, selectedNotif])

	const _renderBottomSheetMidContent = useMemo(() => {
		return (
			<View style={ styles.blurViewWrapperStyle }>
				<Image
					key={ 'blurryImage' }
					source={ { uri: selectedNotif?.image_url } }
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
						<Image style={ styles.cardAwardItemImageStyle } source={ { uri: selectedNotif?.image_url } } />
					</RoundedBorder>
				</View>
			</View>
		)
	}, [selectedNotif])

	const _renderBottomSheetBottomContent = useMemo(() => {
		const separateSchedule = selectedNotif?.description.split('at')
		const schedule = separateSchedule ? separateSchedule[0] : ''
		const locations = separateSchedule ? separateSchedule[1] : ''

		return (
			<View style={ styles.bottomsheetBottomContentStyle }>
				<View style={ styles.rowStyle }>
					<Text style={ styles.titleBottomSheetBottomContentStyle } variant='bodyMiddleRegular'>Schedule</Text>
					<Text variant='bodyMiddleMedium'>{ schedule  }</Text>
				</View>
				<View style={ styles.rowStyle }>
					<Text style={ styles.titleBottomSheetBottomContentStyle } variant='bodyMiddleRegular'>Location</Text>
					<Text variant='bodyMiddleMedium'>{ locations }</Text>
				</View>
				<View style={ styles.rowStyle }>
					<Text style={ styles.titleBottomSheetBottomContentStyle } variant='bodyMiddleRegular'>Level</Text>
					<Text variant='bodyMiddleMedium'>unknown todo</Text>
				</View>
			</View>
		)
	}, [selectedNotif])

	const _bottomSheetContent = useMemo(() => {
		return (
			<React.Fragment>
				{ _renderBottomSheetTopContent }
				{ _renderBottomSheetMidContent }
				{ _renderBottomSheetBottomContent }
			</React.Fragment>
		)

	}, [
		_renderBottomSheetTopContent,
		_renderBottomSheetMidContent,
	])

	return (
		<Container>
			<Header title='Notifications' />
			{ _renderContent }
			<BottomSheet
				bsRef={ bottomSheetRef }
				viewProps={ { style: styles.bottomSheetView } }
			>
				{ _bottomSheetContent }
			</BottomSheet>
			<Loading isLoading={ isFetchingNotifications } />
		</Container>
	)
}

export default React.memo(Notifications)