import React, {
	useCallback, useEffect, useMemo, useRef, useState
} from 'react'
import { Shadow } from 'react-native-shadow-2'
import {
	FlatList, type ListRenderItemInfo, ScrollView, View,
	ActivityIndicator,
} from 'react-native'
import { ArrowLeft, CloseCircle } from 'iconsax-react-native'
import { type BottomSheetModal, SCREEN_WIDTH } from '@gorhom/bottom-sheet'
import moment from 'moment'

import { type NavigationProps } from '../../models/navigation'
import withCommon from '../../hoc/with-common'
import Container from '../../components/container'
import Text from '../../components/text'
import { scaleHeight, scaleWidth } from '../../utils/pixel.ratio'
import createStyle from './styles'
import ActionButton2 from '../../components/action-button2'
import VP from '../../assets/svg/VP.svg'
import ActionButton from '../../components/action-button'
import ShareBottomSheet from '../../components/share-bottom-sheet'
import Modal from '../../components/modal'
import { useGetRoomDetailQuery, useGetTourneyDetailQuery, usePostJoinRoomMutation, usePostJoinTourneyMutation } from '../../store/room'
import { type Users } from '../../models/users'
import Image from '../../components/image'
import { type Rooms } from '../../models/rooms'
import ErrorModal from '../../components/error-modal'
import { newLogo } from '../../assets/images'
import Toast from 'react-native-toast-message'
import { get } from 'lodash'

type Props = NavigationProps<'roomDetail'>;

const RoomDetail = ({ route, navigation, theme, t }: Props): React.ReactNode => {
	const params = route.params
	const styles = createStyle(theme)
	const playerColors = ['#1EA0DFc0', '#D0C210c0', '#FB1515c0', '#4B0B8Bc0']
	const shareRef = useRef<BottomSheetModal>(null)
	const bsErrRef = useRef<BottomSheetModal>(null)
	const [regModalVisible, setRegModalVisible] = useState(false)
	const [data, setData] = useState<Rooms>()
	const [gameCode, setGameCode] = useState('')
	const [isLoading, setLoading] = useState(false)
	const { data: room, isLoading: roomLoading, refetch: roomRefetch } = useGetRoomDetailQuery(params.room_code ?? '', { skip: !params.room_code })
	const { data: tourney, isLoading: tourneyLoading, refetch: tourneyRefetch } = useGetTourneyDetailQuery(params.tournament_code ?? '', { skip: !params.tournament_code })
	const [postJoinRoom, {
		data: joinRoomData,
		isLoading: joinRoomLoading,
		error: joinRoomError
	}] = usePostJoinRoomMutation()
	const [postJoinTourney, {
		data: joinTourneyData,
		isLoading: joinTourneyLoading,
		error: joinTourneyError
	}] = usePostJoinTourneyMutation()

	const quotePrize = useMemo(() => {
		if (data?.room_type === 'normal' || data?.room_type === 'special_event') {
			return (
				<View style={ styles.ph }>
					<Text variant='paragraphMiddleRegular' style={ styles.quote }>
						{ data?.description }
					</Text>
				</View>
			)
		}

		if (data?.tournament_code) {
			return (
				<View style={ [styles.ph32] }>
					<Text variant='bodyDoubleExtraLargeBold' style={ styles.prizes }>PRIZES</Text>
					<Image
						source={ { uri: data?.prizes_img_url } }
						style={ styles.prizesImg }
						keepRatio
					/>
				</View>
			)
		}
	}, [data])

	const schedule = useMemo(() => {
		const d1 = moment(`${data?.start_date} ${data?.start_time}`)
		const d2 = moment(`${data?.end_date} ${data?.end_time}`)
		const startDate = d1.local()
		const endDate = d2.local()
		return startDate.format('MMM, Do [at] HH:mm') + ' - ' + endDate.format(startDate.isSame(endDate, 'date') ? 'HH:mm' : 'MMM, Do [at] HH:mm')
	}, [data])

	const _titleCase = useCallback((str: string): string => {
		const splitStr = str.toLowerCase().split(' ')
		for (let i = 0; i < splitStr.length; i++) {
			splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
		}
		return splitStr.join(' ')
	}, [])

	const detail = useMemo(() => {
		return (
			<View style={ [styles.ph, styles.mt16] }>
				<Text variant='bodyLargeMedium'>{ data?.tournament_code ? 'Tournament' : data?.room_type === 'special_event' ? 'Event' : 'Room' } { t('room-detail.details') }</Text>
				<View style={ styles.rowDetail }>
					<Text variant='bodyMiddleMedium' style={ styles.detailKey }>{ t('room-detail.schedule') }</Text>
					<Text variant='bodyMiddleMedium' style={ styles.detailVal }>{ schedule }
					</Text>
				</View>
				<View style={ styles.rowDetail }>
					<Text variant='bodyMiddleMedium' style={ styles.detailKey }>{ t('room-detail.location') }</Text>
					<Text variant='bodyMiddleMedium' style={ styles.detailVal }>
						{ data?.cafe_name }, { data?.cafe_address }
					</Text>
				</View>
				<View style={ styles.rowDetail }>
					<Text variant='bodyMiddleMedium' style={ styles.detailKey }>{ t('room-detail.level') }</Text>
					<Text variant='bodyMiddleMedium' style={ styles.detailVal }>{ _titleCase(data?.difficulty ?? '') }</Text>
				</View>
			</View>
		)
	}, [data, schedule, _titleCase])

	const tourneyDesc = useMemo(() => {
		if (data?.tournament_rules) {
			return (
				<View style={ [styles.ph, styles.mv32] }>
					<Text variant='bodyLargeMedium'>Tournament Rules</Text>
					<Text variant='paragraphMiddleRegular' style={ styles.mt8 }>
						{ data.tournament_rules }
					</Text>
				</View>
			)
		}
	}, [data])

	const gameInfoAction = useMemo(() => {
		// if (data?.room_type !== 'special_event')
		return (
			<ActionButton2
				label='Game Info'
				style={ styles.gameInfoAction }
				onPress={ () => {
					navigation.navigate('gameDetail', { game_code: data?.game_code })
				} }
			/>
		)
	}, [data])

	const joinAction = useMemo(() => {
		const totalSlot = (data?.tournament_code ? data?.player_slot : data?.maximum_participant) ?? 0
		const usedSlot = data?.current_used_slot ?? 0
		if (usedSlot >= totalSlot) {
			return null
		}

		const room = data?.tournament_code ? 'room' : 'tournament'
		if (data?.have_joined) {
			return (
				<Text variant='bodyMiddleBold' style={ styles.labelJoined }>
					{ t('room-detail.joined', { room }) }
				</Text>
			)
		}

		const vp = ` - Get ${data?.tournament_code ? data?.participant_vp : data?.reward_point}`
		return (
			<View style={ styles.actionJoin }>
				<ActionButton
					label={ t('room-detail.join', { vp }) }
					suffix={ vp && <VP width={ scaleWidth(20) } /> }
					onPress={ () => { setRegModalVisible(true) } }
				/>
			</View>
		)
	}, [data])

	const players = useCallback(({ item, index }: ListRenderItemInfo<Users>) => {
		return (
			<View style={ styles.playerContainer }>
				<Shadow
					startColor={ playerColors[index % 4] }
					distance={ scaleWidth(8) }
					containerStyle={ styles.playerShadow }
				>
					<Shadow
						startColor='#ffffffc0'
						distance={ scaleWidth(8) }
						containerStyle={ styles.playerShadow }
						style={ styles.playerShadow }
					>
						<View style={ styles.playerBorder } />
						<Image
							source={ { uri: item.user_image_url ?? '' } }
							style={ styles.player }
							fallbackImg={ newLogo }
						/>
					</Shadow>
				</Shadow>
				<Text variant='bodyMiddleMedium' style={ [styles.mt8, { textAlign: 'center' }] }>{ item.user_name }</Text>
			</View>
		)
	}, [playerColors, data])

	const _postJoin = useCallback(() => {
		if (data?.room_code) {
			postJoinRoom(params.room_code ?? '')
		} else if (data?.tournament_code) {
			postJoinTourney(params.tournament_code ?? '')
		}
		setRegModalVisible(false)
	}, [data])

	const hideRegModal = useCallback(() => { setRegModalVisible(false) }, [])

	useEffect(() => {
		if (!params.room_code && !params.tournament_code) {
			bsErrRef.current?.present()
		} else if (params.room_code) {
			setData(room)
			setLoading(roomLoading)
		} else {
			setData(tourney)
			setLoading(tourneyLoading)
		}
	}, [params, room, tourney])

	useEffect(() => {
		setGameCode(data?.game_code ?? '')
		const focusSubscribe = navigation.addListener('focus', () => {
			if (!data) return

			if (data?.room_code) {
				roomRefetch()
				setLoading(roomLoading)
			} else {
				tourneyRefetch()
				setLoading(tourneyLoading)
			}
		})

		return focusSubscribe
	}, [data])

	useEffect(() => {
		if (joinRoomData) {
			navigation.push('webview', {
				link: joinRoomData.invoice_url,
				game_code: gameCode
			})
		} else if (joinRoomError) {
			Toast.show({
				type: 'error',
				text1: get(joinRoomError, 'data', 'Failed to join room') as string
			})
		}
	}, [joinRoomData, joinRoomError, gameCode])

	useEffect(() => {
		if (joinTourneyData) {
			navigation.push('webview', {
				link: joinTourneyData.invoice_url,
				game_code: gameCode
			})
		} else if (joinTourneyError) {
			Toast.show({
				type: 'error',
				text1: get(joinTourneyError, 'data', 'Failed to join room') as string
			})
		}
	}, [joinTourneyData, joinTourneyError, gameCode])

	return (
		<Container>
			<View style={ styles.header }>
				<ArrowLeft
					variant='Linear'
					color={ theme.colors.onBackground }
					size={ scaleWidth(24) }
					onPress={ navigation.goBack }
				/>
				<Text variant='bodyExtraLargeHeavy' style={ styles.title }>
					{ data?.name ?? params.name }
				</Text>
			</View>
			{ isLoading && <View style={ {
				flex: 1, justifyContent: 'center', alignItems: 'center'
			} }><ActivityIndicator size='large' /></View> }
			{ !isLoading &&
				<>
					<ScrollView showsVerticalScrollIndicator={ false }>
						<Image
							source={ { uri: params.room_img_url ?? params.image_url ?? data?.room_banner_url ?? data?.image_url } }
							style={ {
								width: SCREEN_WIDTH,
								height: scaleHeight(210)
							} }
							keepRatio
						/>
						<View style={ styles.imageInfo }>
							<Text variant='bodyLargeMedium' style={ styles.imageInfoLabel }>{ t('room-detail.currency') }{ (data?.booking_price ?? 0).toLocaleString('id-ID', { maximumFractionDigits: 0 }) }</Text>
							<Text variant='bodyLargeMedium' style={ styles.imageInfoLabel }>{ t('room-detail.slot') } { data?.current_used_slot }/{ data?.tournament_code ? data?.player_slot : data?.maximum_participant }</Text>
						</View>
						{ quotePrize }
						{ detail }
						{ tourneyDesc }
						{ gameInfoAction }
						<View style={ [styles.ph, styles.mv32] }>
							{ (data?.room_participants?.length ?? 0) > 0 &&
								<Text variant='bodyLargeMedium'>{ t('room-detail.players') }</Text>
							}
							<FlatList
								scrollEnabled={ false }
								data={ data?.room_participants ?? data?.tournament_participants }
								renderItem={ players }
								ItemSeparatorComponent={ () => <View style={ styles.h8 } /> }
								contentContainerStyle={ [styles.wrapList] }
							/>
						</View>
					</ScrollView>
					{ joinAction }
				</>
			}
			<ShareBottomSheet
				sRef={ shareRef }
				onShare={ (type: string) => {
					shareRef.current?.dismiss()
				} }
			/>
			<Modal
				visible={ regModalVisible }
				onDismiss={ hideRegModal }
				style={ { alignItems: 'center' } }
			>
				<CloseCircle
					variant='Outline'
					size={ scaleWidth(24) }
					color={ theme.colors.gray }
					onPress={ hideRegModal }
					style={ { alignSelf: 'flex-end' } }
				/>
				<Text variant='bodyExtraLargeHeavy' style={ styles.mt16 }>{ t('room-detail.booking') }</Text>
				<Image
					source={ { uri: data?.game_img_url } }
					style={ styles.bookingImage }
				/>
				<Text variant='bodyLargeBold' style={ styles.bookingTitle }>{ data?.game_name }</Text>
				<View style={ styles.bookingRow }>
					<Text variant='bodyMiddleRegular' style={ styles.bookingKey }>{ t('room-detail.schedule') } :</Text>
					<Text variant='bodyMiddleMedium' style={ styles.bookingVal }>{ schedule }</Text>
				</View>
				<View style={ styles.bookingRow }>
					<Text variant='bodyMiddleRegular' style={ styles.bookingKey }>{ t('room-detail.location') } :</Text>
					<Text variant='bodyMiddleMedium' style={ styles.bookingVal }>{ data?.cafe_name }, { data?.cafe_address }</Text>
				</View>
				<View style={ styles.bookingRow }>
					<Text variant='bodyMiddleRegular' style={ styles.bookingKey }>{ t('room-detail.level') } :</Text>
					<Text variant='bodyMiddleMedium' style={ styles.bookingVal }>{ _titleCase(data?.difficulty ?? '') }</Text>
				</View>
				<ActionButton
					label={ t('room-detail.pay') }
					style={ styles.mt16 }
					loading={ data?.room_code ? joinRoomLoading : joinTourneyLoading }
					onPress={ _postJoin }
				/>
			</Modal>
			<ErrorModal
				bsRef={ bsErrRef }
				title='Failed To Open'
				message='Invalid room/tournament'
				onDismiss={ () => {
					if (navigation.canGoBack()) {
						navigation.goBack()
					} else {
						navigation.popToTop()
						navigation.replace('main', {})
					}
				} }
			/>
		</Container>
	)
}

export default withCommon(React.memo(RoomDetail))