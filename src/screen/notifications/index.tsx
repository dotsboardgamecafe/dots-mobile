import {
	type ListRenderItemInfo, View, Pressable,
	TouchableOpacity
} from 'react-native'
import React, {
	useCallback, useEffect, useMemo, useRef, useState
} from 'react'
import isEmpty from 'lodash/isEmpty'
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
import { type DescriptionNotification, type Notification } from '../../models/notification'
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
		title: '',
		color: '',
	}
	switch (type) {
		case 'tournament_reminder':
		case 'level_up':
		case 'got_reward':
		case 'payment_success':
			result.color = colors.lightTheme.blueAccent
			break

		case 'room_booking_confirmation':
		case 'tournament_booking_confirmation':
			result.color = colors.lightTheme.blue500
			break

		default:
			result.color = colors.lightTheme.redAccent
			break
	}

	switch (type) {
		case 'tournament_reminder':
			result.title = 'UPCOMING TOURNAMENT'
			break

		case 'room_booking_confirmation':
			result.title = 'ROOM REMINDER'
			break
		case 'tournament_booking_confirmation':
			result.title = 'TOURNAMENT REMINDER'
			break

		default:
			result.title = type.split('_').join(' ')
				.toUpperCase()
			break
	}

	return result
}

const _generateDescription = (type: string, description?: string): string => {
	const parseDescription = JSON.parse(description ?? '{}')
	let currentDescription = ''
	let generatedDate = ''

	switch (type) {
		case 'tournament_reminder':
		case 'room_booking_confirmation':
		case 'tournament_booking_confirmation':
			generatedDate =	parseDescription.start_date && parseDescription.end_time ?
				`at ${moment(`${parseDescription.start_date} ${parseDescription.start_time}`)
					.format('hh:mm')} - ${moment(`${parseDescription.start_date} ${parseDescription.end_time}`)
					.format('hh:mm')} `
				: ''
			currentDescription = `${moment(parseDescription.start_date as string)
				.format('MMM, Do YYYY')} ${generatedDate}at ${parseDescription.cafe_name}, ${parseDescription.cafe_address}`
			break
	
		default:
			currentDescription = description ? description.substring(1, description.length - 1) : ''
			break
	}

	return currentDescription
	
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
		if (!notif.status_read) updateSeenNotification(notif)
	}, [])

	const _onPressClose = useCallback(() => {
		bottomSheetRef.current?.close()
	}, [bottomSheetRef])

	const onFetchNotifications = useCallback(() => {
		if (notificationsData?.data && notificationsData?.data.length < notificationsData?.pagination.count) {
			pageRef.current += 1
			fetchNotifications(pageRef.current)
		}
	}, [fetchNotifications, notificationsData])

	useEffect(() => {
		fetchNotifications(pageRef.current)
		
		return () => {
			dispatch(notificationsApi.util.resetApiState())
		}
	}, [])

	const _renderItem = useCallback(({ item, index }:ListRenderItemInfo<Notification>): React.ReactElement => {
		const { title, color } = _generateNotifTitle(item.type)
		const description = _generateDescription(item.type, item.description)

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
				<Pressable>
					<Image
						source={ { uri: item.image_url } }
						style={ styles.imageGameStyle }
					/>
				</Pressable>
				<View style={ styles.growStyle }>
					<View style={ [styles.rowStyle, styles.spaceBetweenStyle] }>
						<Text variant='bodyMiddleBold' style={ { color, letterSpacing: -1 } }>{ title }</Text>
						<Text variant='bodySmallMedium'>{
							 moment(item.created_date).local()
								.fromNow() }
						</Text>
					</View>
					<View style={ [styles.rowStyle, styles.rowCenterStyle, styles.spaceBetweenStyle] }>
						<View>
							<Text style={ [styles.titleStyle, styles.resultLocationStyle] } variant='bodyMiddleDemi'>{ item.title }</Text>
							<Text style={ styles.resultLocationStyle } variant='bodySmallRegular' >{ description }</Text>
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
					data={ notificationsData?.data ?? [] }
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
		const description: DescriptionNotification | string = JSON.parse(selectedNotif?.description ?? '{}')

		if (!isEmpty(description) && typeof description === 'object') {
			const startDate = moment(description.start_date)
				.format('MMM, Do')
			const startTime = description.start_time ? moment(`${description.start_date} ${description.start_time}`)
				.format('hh:mm') : ''
			const endTime = description.end_time ?  moment(`${description.start_date} ${description.end_time}`)
				.format('hh:mm') : ''
			const fullLocation = `${description.cafe_name}, ${description.cafe_address}`
			const resultTime = startTime && endTime ? `at ${ startTime } - ${ endTime }` : ''
			return (
				<View style={ styles.bottomsheetBottomContentStyle }>
					<View style={ styles.rowStyle }>
						<Text style={ styles.titleBottomSheetBottomContentStyle } variant='bodyMiddleRegular'>Schedule</Text>
						<Text variant='bodyMiddleMedium'>{ startDate } { resultTime }</Text>
					</View>
					<View style={ styles.rowStyle }>
						<Text style={ styles.titleBottomSheetBottomContentStyle } variant='bodyMiddleRegular'>Location</Text>
						<Text variant='bodyMiddleMedium' style={ styles.resultLocationStyle }>{ fullLocation }</Text>
					</View>
					<View style={ styles.rowStyle }>
						<Text style={ styles.titleBottomSheetBottomContentStyle } variant='bodyMiddleRegular'>Level</Text>
						<Text variant='bodyMiddleMedium'>{ description.level }</Text>
					</View>
				</View>
			)
		}

		return (
			<View style={ styles.bottomsheetBottomContentStyle }>
				<Text variant='bodyMiddleMedium'>{ (description as string) }</Text>
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