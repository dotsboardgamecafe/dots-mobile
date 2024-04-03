import React, { useCallback, useMemo, useRef, useState } from 'react'
import { Shadow } from 'react-native-shadow-2'

import { type NavigationProps } from '../../models/navigation'
import withCommon from '../../hoc/with-common'
import Container from '../../components/container'
import Text from '../../components/text'
import {
	FlatList, Image, type ListRenderItemInfo, ScrollView, View
} from 'react-native'
import { ArrowLeft, CloseCircle, ExportCurve } from 'iconsax-react-native'
import { scaleHeight, scaleWidth } from '../../utils/pixel.ratio'
import createStyle from './styles'
import { type BottomSheetModal, SCREEN_WIDTH } from '@gorhom/bottom-sheet'
import ActionButton2 from '../../components/action-button2'
import Rank1ST from '../../assets/svg/Rank1ST.svg'
import Rank2ND from '../../assets/svg/Rank2ND.svg'
import Rank3RD from '../../assets/svg/Rank3RD.svg'
import VP from '../../assets/svg/VP.svg'
import { gameMasters } from '../game-detail/data'
import { type GameMaster } from '../../models/games'
import ActionButton from '../../components/action-button'
import ShareBottomSheet from '../../components/share-bottom-sheet'
import Modal from '../../components/modal'

type Props = NavigationProps<'roomDetail'>

const RoomDetail = ({ route, navigation, theme }: Props): React.ReactNode => {
	const { type } = route.params as unknown as { type: string }
	const styles = createStyle(theme)
	const playerColors = ['#1EA0DFc0', '#D0C210c0', '#FB1515c0', '#4B0B8Bc0']
	const shareRef = useRef<BottomSheetModal>(null)
	const [regModalVisible, setRegModalVisible] = useState(false)

	const quotePrize = useMemo(() => {
		if (type === 'Room' || type === 'Event') {
			return (
				<View style={ styles.ph }>
					<Text variant='paragraphMiddleRegular' style={ styles.quote }>
						“Join me for a thrilling adventure in the world of Rising Sun -  Let’s play together and have a blast!”
					</Text>
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
	}, [])

	const detail = useMemo(() => {
		return (
			<View style={ styles.ph }>
				<Text variant='bodyLargeMedium'>{ type === 'Tournament' ? type : 'Room' } Details</Text>
				<View style={ styles.rowDetail }>
					<Text variant='bodyMiddleMedium' style={ styles.detailKey }>Schedule</Text>
					<Text variant='bodyMiddleMedium' style={ styles.detailVal }>Nov, 25th at 11:00 - 14:00</Text>
				</View>
				<View style={ styles.rowDetail }>
					<Text variant='bodyMiddleMedium' style={ styles.detailKey }>Location</Text>
					<Text variant='bodyMiddleMedium' style={ styles.detailVal }>Bandung City, Paskal 23 Mall</Text>
				</View>
				<View style={ styles.rowDetail }>
					<Text variant='bodyMiddleMedium' style={ styles.detailKey }>Level</Text>
					<Text variant='bodyMiddleMedium' style={ styles.detailVal }>Beginner</Text>
				</View>
			</View>
		)
	}, [])

	const tourneyDesc = useMemo(() => {
		if (type === 'Tournament') {
			return (
				<View style={ [styles.ph, styles.mv32] }>
					<Text variant='bodyLargeMedium'>Tournament Rules</Text>
					<Text variant='paragraphMiddleRegular' style={ styles.mt8 }>
						In Apiary, each player controls one of twenty unique factions. Your faction starts the game with a hive, a few resources, and worker bees. A worker-placement, hive-building challenge awaits you: explore planets, gather resources, develop technologies, and create carvings to demonstrate your faction`s strengths (measured in victory points) over one year's Flow. However, the Dearth quickly approaches, and your workers can take only a few actions before they must hibernate! Can you thrive or merely survive?
					</Text>
				</View>
			)
		}
	}, [])

	const gameInfoAction = useMemo(() => {
		if (type !== 'Event')
			return (
				<ActionButton2
					label='Game Info'
					style={ styles.gameInfoAction }
					onPress={ () => { navigation.navigate('gameDetail') } }
				/>
			)
	}, [])

	const gameMaster = useCallback(({ item, index }: ListRenderItemInfo<GameMaster>) => {
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
							source={ { uri: item.photo } }
							style={ styles.player }
						/>
					</Shadow>
				</Shadow>
				<Text variant='bodyMiddleMedium' style={ [styles.mt8, { textAlign: 'center' }] }>{ item.name }</Text>
			</View>
		)
	}, [playerColors])

	const showRegModal = useCallback(() => { setRegModalVisible(true) }, [])
	const hideRegModal = useCallback(() => { setRegModalVisible(false) }, [])

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
					Rising Sun Game { type }
				</Text>
				<ExportCurve
					variant='Linear'
					color={ theme.colors.onBackground }
					size={ scaleWidth(24) }
					onPress={ () => shareRef.current?.present() }
				/>
			</View>

			<ScrollView
				showsVerticalScrollIndicator={ false }
			>
				<Image
					source={ { uri: 'https://picsum.photos/320/210' } }
					resizeMode='cover'
					style={ {
						width: SCREEN_WIDTH,
						height: scaleHeight(210)
					} }
				/>
				<View style={ styles.imageInfo }>
					<Text variant='bodyLargeMedium' style={ styles.imageInfoLabel }>Rp350.000</Text>
					<Text variant='bodyLargeMedium' style={ styles.imageInfoLabel }>Slot 3/5</Text>
				</View>
				{ quotePrize }
				{ detail }
				{ tourneyDesc }
				{ gameInfoAction }
				<View style={ [styles.ph, styles.mv32] }>
					<Text variant='bodyLargeMedium'>Joined Players</Text>
					<FlatList
						scrollEnabled={ false }
						data={ gameMasters }
						renderItem={ gameMaster }
						ItemSeparatorComponent={ () => <View style={ styles.h8 } /> }
						contentContainerStyle={ [styles.wrapList] }
					/>
				</View>

			</ScrollView>
			<View style={ styles.actionJoin }>
				<ActionButton
					label='Join Room - Get 10'
					suffix={ <VP width={ scaleWidth(20) } /> }
					onPress={ showRegModal }
				/>
			</View>

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
				<Text variant='bodyExtraLargeHeavy' style={ styles.mt16 }>Booking Confirmation</Text>
				<Image
					source={ { uri: 'https://picsum.photos/84' } }
					style={ styles.bookingImage }
				/>
				<Text variant='bodyLargeBold' style={ styles.bookingTitle }>Rising Sun Game</Text>
				<View style={ styles.bookingRow }>
					<Text variant='bodyMiddleRegular' style={ styles.bookingKey }>Schedule :</Text>
					<Text variant='bodyMiddleMedium' style={ styles.bookingVal }>Nov, 25th at 11:00 - 14:00</Text>
				</View>
				<View style={ styles.bookingRow }>
					<Text variant='bodyMiddleRegular' style={ styles.bookingKey }>Location :</Text>
					<Text variant='bodyMiddleMedium' style={ styles.bookingVal }>Bandung, Paskal 23 Mall</Text>
				</View>
				<View style={ styles.bookingRow }>
					<Text variant='bodyMiddleRegular' style={ styles.bookingKey }>Level :</Text>
					<Text variant='bodyMiddleMedium' style={ styles.bookingVal }>Beginner</Text>
				</View>
				<ActionButton
					label='Pay with Xendit'
					style={ styles.mt16 }
					onPress={ hideRegModal }
				/>
			</Modal>
		</Container>
	)
}

export default withCommon(React.memo(RoomDetail))