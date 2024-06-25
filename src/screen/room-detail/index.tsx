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
import Rank1ST from '../../assets/svg/Rank1ST.svg'
import Rank2ND from '../../assets/svg/Rank2ND.svg'
import Rank3RD from '../../assets/svg/Rank3RD.svg'
import VP from '../../assets/svg/VP.svg'
import ActionButton from '../../components/action-button'
import ShareBottomSheet from '../../components/share-bottom-sheet'
import Modal from '../../components/modal'
import { useGetRoomDetailQuery, useGetTourneyDetailQuery, usePostJoinRoomMutation, usePostJoinTourneyMutation } from '../../store/room'
import { type Users } from '../../models/users'
import Image from '../../components/image'
import { type Rooms } from '../../models/rooms'
import ErrorModal from '../../components/error-modal'
import { LOGO } from '../../assets/images'

type Props = NavigationProps<'roomDetail'>

const RoomDetail = ({ route, navigation, theme, t }: Props): React.ReactNode => {
	const params = route.params
	const styles = createStyle(theme)
	const playerColors = ['#1EA0DFc0', '#D0C210c0', '#FB1515c0', '#4B0B8Bc0']
	const shareRef = useRef<BottomSheetModal>(null)
	const bsErrRef = useRef<BottomSheetModal>(null)
	const [regModalVisible, setRegModalVisible] = useState(false)
	const [isRoom, setIsRoom] = useState(false)
	const [isTourney, setIsTourney] = useState(false)
	const [data, setData] = useState<Rooms>()
	const [gameCode, setGameCode] = useState('')
	const [isLoading, setLoading] = useState(false)
	const { data: room, isLoading: roomLoading, refetch: roomRefetch } = useGetRoomDetailQuery(params.room_code ?? '', { skip: !isRoom })
	const { data: tourney, isLoading: tourneyLoading, refetch: tourneyRefetch } = useGetTourneyDetailQuery(params.tournament_code ?? '', { skip: !isTourney })
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
		setGameCode(data?.game_code ?? '')

		if (data?.room_type === 'normal' || data?.room_type === 'special_event') {
			return (
				<View style={ styles.ph }>
					<Text variant='paragraphMiddleRegular' style={ styles.quote }>
						{ data?.description }
					</Text>
				</View>
			)
		}

		if (isTourney) {
			return (
				<View style={ [styles.ph] }>
					<Text variant='bodyDoubleExtraLargeBold' style={ styles.prizes }>PRIZES</Text>
					<Image
						source={ { uri: data?.prizes_img_url } }
						style={ styles.prizesImg }
						keepRatio
					/>
				</View>
			)
		}

		return (
			<View style={ [styles.ph] }>
				<Text variant='bodyDoubleExtraLargeBold' style={ styles.prizes }>PRIZES</Text>

				<Shadow
					startColor='#DCC10C'
					distance={ scaleWidth(16) }
					containerStyle={ styles.firstPrizeShadow1 }
				>
					<Shadow
						startColor='#ffffffb0'
						distance={ scaleWidth(8) }
						containerStyle={ styles.firstPrizeShadow2 }
						style={ styles.firstPrizeShadow2 }
					>
						<View style={ styles.firstPrizeContent }>
							<View style={ styles.firstPrizeBorder } />
							<Rank1ST width={ scaleWidth(72) } style={ styles.firstPriceIcon } />
							<View style={ styles.rowAlignCenter }>
								<View>
									<Image
										source={ { uri: 'https://picsum.photos/72' } }
										resizeMode='cover'
										style={ styles.firstPriceBadge }
									/>
									<Image
										source={ { uri: 'https://picsum.photos/72' } }
										resizeMode='cover'
										style={ [styles.firstPriceBadge, styles.mt16] }
									/>
								</View>
								<Image
									source={ { uri: 'https://picsum.photos/124' } }
									resizeMode='cover'
									style={ styles.firstPriceBadgeMain }
								/>
							</View>
							<View style={ styles.rowAlignCenter }>
								<Text variant='bodyLargeBold'>10.000</Text>
								<VP width={ 32 } style={ { marginStart: scaleWidth(4) } } />
							</View>
						</View>
					</Shadow>
				</Shadow>

				<View style={ [styles.otherPrize, styles.secondPrize] }>
					<Rank2ND width={ scaleWidth(50) } />
					<View style={ { flex: 1, alignSelf: 'flex-end' } }>
						<View style={ styles.otherPrizeLine } />
					</View>
					<Text variant='bodyMiddleBold'>5.000</Text>
					<VP width={ scaleWidth(32) } />
					<Text variant='bodyMiddleBold' style={ styles.mh12 }>+</Text>
					<Image
						source={ { uri: 'https://picsum.photos/32' } }
						resizeMode='cover'
						style={ styles.otherPrizeBadge }
					/>
				</View>

				<View style={ [styles.otherPrize, styles.thirdPrize] }>
					<Rank3RD width={ scaleWidth(50) } />
					<View style={ { flex: 1, alignSelf: 'flex-start' } }>
						<View style={ styles.otherPrizeLine } />
					</View>
					<Text variant='bodyMiddleBold'>3.000</Text>
					<VP width={ scaleWidth(32) } />
					<Text variant='bodyMiddleBold' style={ styles.mh12 }>+</Text>
					<Image
						source={ { uri: 'https://picsum.photos/32' } }
						resizeMode='cover'
						style={ styles.otherPrizeBadge }
					/>
				</View>
			</View>
		)
	}, [data, isTourney])

	const schedule = useMemo(() => {
		let d1 = data?.start_date
		let d2 = data?.end_date
		if (!isTourney) {
			d1 = data?.start_date?.substring(0, 19)
			d2 = data?.end_date?.substring(0, 19)
		}
		const startDate = moment(d1 ?? '')
		const endDate = moment(d2 ?? '')
		return startDate.format('MMM, Do [at] h:mm') + ' - ' + endDate.format(startDate.isSame(endDate, 'date') ? 'h:mm' : 'MMM, Do [at] h:mm')
	}, [data, isTourney])

	const detail = useMemo(() => {
		return (
			<View style={ [styles.ph, styles.mt16] }>
				<Text variant='bodyLargeMedium'>{ isTourney ? 'Tournament' : data?.room_type === 'special_event' ? 'Event' : 'Room' } { t('room-detail.details') }</Text>
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
					<Text variant='bodyMiddleMedium' style={ styles.detailVal }>{ data?.difficulty }</Text>
				</View>
			</View>
		)
	}, [data, isTourney, schedule])

	const tourneyDesc = useMemo(() => {
		if (data?.room_type === 'Tournament') {
			return (
				<View style={ [styles.ph, styles.mv32] }>
					<Text variant='bodyLargeMedium'>Tournament Rules</Text>
					<Text variant='paragraphMiddleRegular' style={ styles.mt8 }>
						In Apiary, each player controls one of twenty unique factions. Your faction starts the game with a hive, a few resources, and worker bees. A worker-placement, hive-building challenge awaits you: explore planets, gather resources, develop technologies, and create carvings to demonstrate your faction`s strengths (measured in victory points) over one year`s Flow. However, the Dearth quickly approaches, and your workers can take only a few actions before they must hibernate! Can you thrive or merely survive?
					</Text>
				</View>
			)
		}
	}, [data])

	const gameInfoAction = useMemo(() => {
		if (data?.room_type !== 'special_event')
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
		const totalSlot = (isTourney ? data?.player_slot : data?.maximum_participant) ?? 0
		const usedSlot = data?.current_used_slot ?? 0
		if (usedSlot >= totalSlot) {
			return null
		}

		const room = isTourney ? 'room' : 'tournament'
		if (data?.have_joined) {
			return (
				<Text variant='bodyMiddleBold' style={ styles.labelJoined }>
					{ t('room-detail.joined', { room }) }
				</Text>
			)
		}

		const vp = ` - Get ${isTourney ? data?.participant_vp : data?.reward_point}`
		return (
			<View style={ styles.actionJoin }>
				<ActionButton
					label={ t('room-detail.join', { vp }) }
					suffix={ vp && <VP width={ scaleWidth(20) } /> }
					onPress={ () => { setRegModalVisible(true) } }
				/>
			</View>
		)
	}, [data, isTourney, isRoom])

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
							fallbackImg={ LOGO }
						/>
					</Shadow>
				</Shadow>
				<Text variant='bodyMiddleMedium' style={ [styles.mt8, { textAlign: 'center' }] }>{ item.user_name }</Text>
			</View>
		)
	}, [playerColors, data])

	const hideRegModal = useCallback(() => {
		if (isRoom) {
			postJoinRoom(params.room_code ?? '')
		} else if (isTourney) {
			postJoinTourney(params.tournament_code ?? '')
		}
		setRegModalVisible(false)
	}, [isRoom, isTourney])

	useEffect(() => {
		if (!params.room_code && !params.tournament_code) {
			bsErrRef.current?.present()
		} else if (params.room_code) {
			setIsRoom(true)
			setData(room)
			setLoading(roomLoading)
		} else {
			setIsTourney(true)
			setData(tourney)
			setLoading(tourneyLoading)
		}
	}, [params, room, tourney])

	useEffect(() => {
		const focusSubscribe = navigation.addListener('focus', () => {
			if (!data) return

			if (isRoom) {
				roomRefetch()
				setLoading(roomLoading)
			} else {
				tourneyRefetch()
				setLoading(tourneyLoading)
			}
		})

		return focusSubscribe
	}, [isRoom, data])

	useEffect(() => {
		if (joinRoomData) {
			navigation.push('webview', {
				link: joinRoomData.invoice_url,
				game_code: gameCode
			})
		} else if (joinRoomError) {
			console.error(joinRoomError)
		}
	}, [joinRoomData, joinRoomError, gameCode])

	useEffect(() => {
		if (joinTourneyData) {
			navigation.push('webview', {
				link: joinTourneyData.invoice_url,
				game_code: gameCode
			})
		} else if (joinTourneyError) {
			console.error(joinTourneyError)
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
				{ /* <ExportCurve
					variant='Linear'
					color={ theme.colors.onBackground }
					size={ scaleWidth(24) }
					onPress={ () => shareRef.current?.present() }
				/> */ }
			</View>
			{ isLoading && <View style={ {
				flex: 1, justifyContent: 'center', alignItems: 'center'
			} }><ActivityIndicator size='large' /></View> }
			{ !isLoading &&
				<>
					<ScrollView showsVerticalScrollIndicator={ false }>
						<Image
							source={ { uri: params.room_img_url ?? data?.room_banner_url ?? data?.image_url } }
							resizeMode='cover'
							style={ {
								width: SCREEN_WIDTH,
								height: scaleHeight(210)
							} }
							keepRatio
						/>
						<View style={ styles.imageInfo }>
							<Text variant='bodyLargeMedium' style={ styles.imageInfoLabel }>{ t('room-detail.currency') }{ (data?.booking_price ?? 0).toLocaleString('id-ID', { maximumFractionDigits: 0 }) }</Text>
							<Text variant='bodyLargeMedium' style={ styles.imageInfoLabel }>{ t('room-detail.slot') } { data?.current_used_slot }/{ isTourney ? data?.player_slot : data?.maximum_participant }</Text>
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
					<Text variant='bodyMiddleMedium' style={ styles.bookingVal }>{ data?.difficulty }</Text>
				</View>
				<ActionButton
					label={ t('room-detail.pay') }
					style={ styles.mt16 }
					loading={ isRoom ? joinRoomLoading : joinTourneyLoading }
					onPress={ hideRegModal }
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