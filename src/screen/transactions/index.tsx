/* eslint-disable no-unused-vars */
import { FlatList, type ListRenderItemInfo, View, TouchableOpacity } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import Container from '../../components/container'
import Header from '../../components/header'
import TabView from '../../components/tab-view'
import withCommon from '../../hoc/with-common'
import { type NavigationProps } from '../../models/navigation'
import styles from './styles'
import Text from '../../components/text'
import Image from '../../components/image'
import { currencyFormatter } from '../../utils/formatter'
import BottomSheet from '../../components/bottom-sheet'
import { type BottomSheetModal } from '@gorhom/bottom-sheet'
import TickSuccessIcon from '../../assets/svg/tick-success.svg'
import TextInput from '../../components/text-input'
import { colorsTheme } from '../../constants/theme'
import { scaleWidth } from '../../utils/pixel.ratio'
import { Receipt2 } from 'iconsax-react-native'
import Modal from '../../components/modal'

import CloseIcon from '../../assets/svg/close.svg'
import { redeemSuccessIllu } from '../../assets/images'
import ActionButton from '../../components/action-button'

type Props = NavigationProps<'transactions'>

interface HistoryType {
  title: string
  image: string
  description: string
  price: number,
  discount: number,
  created_date: string
  code: string
  point: number
}

interface RedeemType {
  invoice_code: string
  description: string
  price: number
  point: number,
  is_new: boolean
}

const listTransaction:HistoryType[] = [
	{
		title: 'Rising Sun Board Game',
		image: 'https://cf.geekdo-images.com/iwevA6XmiNLHn1QnGUucqw__itemrep/img/QC2OAbicZssRpGJkUmp0Zbto-cs=/fit-in/246x300/filters:strip_icc()/pic3880340.jpg',
		description: 'Play game Dungeon of Dragon 3 times and get',
		price: 300000,
		discount: 0,
		created_date: 'Nov, 25th 2024 - 09:30',
		code: '1',
		point: 10
	},
	{
		title: 'Apiary Board Game',
		image: 'https://cf.geekdo-images.com/Nnzu4eqkUoGybbziFGPI6g__itemrep/img/iGanwQiMDaXz5AiNdf2ynDFHVXA=/fit-in/246x300/filters:strip_icc()/pic5212377.png',
		description: 'Congratulations! You’re successfully played Dungeon of Dragon board game for 3 times.',
		price: 350000,
		discount: 10,
		created_date: 'Nov, 25th 2024 - 09:30',
		code: '2',
		point: 10
	},
]

const listRedeem: RedeemType[] = [
	{
		invoice_code: '123456',
		description: 'Purchase Burger, Ice Tea, etc..',
		price: 160000,
		point: 16,
		is_new: true
	},
	{
		invoice_code: '654321',
		description: 'Ayam bakar, Teh Jus, etc..',
		price: 260000,
		point: 32,
		is_new: false
	}
]

interface HistoryTabProps {
  onPressHistoryItem: (item: HistoryType) => void
}

interface RedeemTabProps {
  onPressRedeem: () => void
}

const HistoryTab = ({ onPressHistoryItem }: HistoryTabProps): React.ReactNode => {
	const _renderItem = useCallback(({ item }:ListRenderItemInfo<HistoryType>): React.ReactElement => {
		return (
			<TouchableOpacity style={ styles.historyWrapperStyle } onPress={ () => { onPressHistoryItem(item) } }>
				<View style={ [
					styles.rowStyle, styles.historyContentStyle,
				] }>
					<Image style={ styles.historyImageStyle }
						source={ { uri: item.image } }
					/>
					<View style={ styles.growStyle }>
						<Text style={ styles.textGrayStyle } variant='bodySmallRegular'>{ item.created_date }</Text>
						<Text style={ styles.historyTextSpaceStyle } variant='bodyMiddleDemi'>{ item.title }</Text>
						<View style={ [styles.rowStyle, styles.spaceBetweenStyle, styles.historyTextSpaceStyle] }>
							<Text variant='bodySmallMedium'>{ currencyFormatter(item.price) }</Text>
							{
								item.discount ?
									<Text variant='bodySmallMedium'>Discount Reward { item.discount }%</Text> : null
							}
						</View>
						<View style={ styles.totalPriceSeparatorStyle }/>
						<View style={ [styles.rowStyle, styles.spaceBetweenStyle] }>
							<Text variant='bodyMiddleRegular'>Total Payment:</Text>
							<Text variant='bodyMiddleDemi'>{ currencyFormatter(item.price) }</Text>
						</View>
					</View>
				</View>
			</TouchableOpacity>
		)
	}, [])

	return (
		<FlatList
			bounces={ false }
			data={ listTransaction }
			renderItem={ _renderItem }
			keyExtractor={ item => item.code }
			ItemSeparatorComponent={ () => <View style={ styles.itemSeparatorStyle }/> }
		/>
	)
}

const RedeemTab = ({ onPressRedeem }: RedeemTabProps): React.ReactNode => {
	const _renderItem = useCallback(({ item }:ListRenderItemInfo<RedeemType>): React.ReactElement => {
		return (
			<TouchableOpacity style={ styles.historyWrapperStyle }>
				<View style={ [
					styles.rowStyle, styles.historyContentStyle,
				] }>
					<View style={ styles.growStyle }>
						<View style={ styles.rowStyle }>
							<View style={ styles.badgeContainerStyle }>
								<Text style={ styles.badgeLabelStyle } variant='bodySmallBold'>New</Text>
							</View>
							<Text variant='bodyMiddleDemi'>Invoice #{ item.invoice_code }</Text>
						</View>
						<View style={ [styles.rowStyle, styles.spaceBetweenStyle, styles.baseLineStyle] }>
							<Text style={ [styles.textGrayStyle, styles.redeemDescriptionStyle] } variant='bodySmallRegular'>{ item.description }</Text>
							<View style={ styles.alignEndStyle }>
								<Text variant='bodySmallMedium'>Total: { currencyFormatter(item.price) }</Text>
								<View style={ [styles.rowStyle, styles.redeemPointWrapperStyle] }>
									<Text variant='bodyMiddleRegular'>Point Earned </Text>
									<Text variant='bodyMiddleDemi'>{ item.point } Point</Text>
								</View>
							</View>
						</View>
					</View>
				</View>
			</TouchableOpacity>
		)
	}, [])

	return (
		<View style={ styles.redeemWrapperStyle }>
			<View style={ [styles.redeemInputWrapperStyle, styles.rowStyle] }>
				<TextInput
					containerStyle={ styles.redeemInputStyle }
					borderFocusColor={ colorsTheme.blueAccent }
					prefix={
						<Receipt2
							variant='Bold'
							size={ scaleWidth(16) }
							color={ colorsTheme.gray }
						/>
					}
					inputProps={ {
						placeholder: '#212',
						placeholderTextColor: colorsTheme.gray,
						keyboardType: 'default',
					} }
				/>
				<TouchableOpacity style={ styles.buttonRedeemStyle } onPress={ onPressRedeem }>
					<Text
						variant='bodyMiddleBold'
						style={ styles.buttonRedeemLabelStyle }>Redeem</Text>
				</TouchableOpacity>
			</View>
			<FlatList
				bounces={ false }
				style={ styles.redeemWrapperStyle }
				data={ listRedeem }
				renderItem={ _renderItem }
				keyExtractor={ item => item.invoice_code }
				ItemSeparatorComponent={ () => <View style={ styles.itemSeparatorStyle }/> }
			/>
		</View>
	)
}

const Transactions = ({ t }: Props): React.ReactNode => {
	const [selectedHistory, setSelectedHistory] = useState<HistoryType>()
	const bottomSheetRef = useRef<BottomSheetModal>(null)
	const [visibleRedeem, setVisibleRedeem] = useState(false)

	const _onPressHistoryItem = useCallback((item: HistoryType) => {
		setSelectedHistory(item)
		bottomSheetRef.current?.present()
	}, [])

	const _onPressRedeem = useCallback(() => {
		setVisibleRedeem(!visibleRedeem)
	}, [visibleRedeem])

	const _renderBottomSheetContent = useCallback(() => {
		return (
			<View style={ { paddingBottom: 34 } }>
				<View style={ [styles.alignCenterStyle, styles.rowStyle, styles.justifyCenterStyle] }>
					<View style={ [styles.tickBlurStyle, styles.justifyCenterStyle, styles.alignCenterStyle] }>
						<View style={ [styles.tickCircleStyle, styles.justifyCenterStyle, styles.alignCenterStyle] }>
							<TickSuccessIcon/>
						</View>
					</View>
					<Text style={ styles.successTextStyle } variant='bodyLargeHeavy'>Success</Text>
				</View>
				<Text variant='bodySmallDemi' style={ [styles.textCenterStyle, styles.historyDateStyle] }>{ selectedHistory?.created_date }</Text>
				<View style={ [styles.rowStyle, styles.justifyBetweenStyle, styles.bookingWrapperStyle, styles.bottomSheetPaddingStyle] }>
					<Text variant='bodyMiddleRegular'>Booking ID</Text>
					<Text variant='bodyMiddleRegular'>#{ selectedHistory?.code }</Text>
				</View>
				<View style={ [styles.bottomSheetPaddingStyle, styles.orderSummaryStyle] }>
					<Text variant='bodyLargeDemi'>Order Summary</Text>
					<View style={ [styles.rowStyle, styles.justifyBetweenStyle, styles.baseLineStyle] }>
						<View style={ [styles.rowStyle, styles.orderSummaryDetailStyle] }>
							<Text variant='bodyMiddleDemi'>1x</Text>
							<Text style={ styles.orderSummaryTitleStyle } variant='bodyMiddleRegular'>{ selectedHistory?.title }</Text>
						</View>
						<View style={ styles.flexEndStyle }>
							<Text variant='bodyMiddleRegular'>{ currencyFormatter(selectedHistory?.price ?? 0) }</Text>
							{
								selectedHistory?.discount ?
									<Text variant='bodyMiddleRegular'>Discount Reward { selectedHistory?.discount }%</Text> : null
							}
						</View>
					</View>
				</View>
				<View style={ styles.bottomSheetDetailSeparatorStyle }/>
				<View style={ [styles.rowStyle, styles.justifyBetweenStyle, styles.bottomSheetPaddingStyle, styles.alignCenterStyle] }>
					<Text variant='bodyMiddleRegular'>Total Payment</Text>
					<Text variant='bodyMiddleDemi'>{ currencyFormatter(selectedHistory?.price ?? 0) }</Text>
				</View>
				<View style={ styles.bottomSheetDetailSeparatorStyle }/>
				<Text variant='bodyMiddleDemi' style={ styles.bottomSheetPaddingStyle }>Congratulations! You are earned 10 points</Text>
			</View>
		)
	}, [selectedHistory])

	const _renderContent = useCallback(() => {
		return (
			<TabView
				tabs={ [
					{
						key: 'pointActivity',
						title: t('transaction-page.tab-history'),
						component: () => <HistoryTab onPressHistoryItem={ _onPressHistoryItem } />
					},
					{
						key: 'earnActivity',
						title: t('transaction-page.tab-redeem'),
						component: () => <RedeemTab onPressRedeem={ _onPressRedeem } />
					}
				] }
			 />
		)
	}, [_onPressRedeem])

	const _renderModalContent = useCallback(() => {
		return (
			<View>
				<View style={ styles.alignEndStyle }>
					<TouchableOpacity onPress={ _onPressRedeem }>
						<CloseIcon />
					</TouchableOpacity>
				</View>
				<View style={ styles.alignCenterStyle }>
					<Image resizeMode='contain' source={ redeemSuccessIllu } style={ styles.redeemImageModalStyle } />
					<Text style={ styles.congratsStyle } variant='bodyExtraLargeBold'>Congratulations!</Text>
					<Text style={ styles.claimedDescriptionStyle } variant='bodyMiddleRegular'>You’re successfully earned 15 point from redeem invoice</Text>
					<ActionButton
						style={ styles.buttonWrapperStyle }
						label={ 'OK' }
						onPress={ _onPressRedeem }
					/>
				</View>
			</View>
		)
	}, [_onPressRedeem])

	return (
		<Container>
			<Header title='Transactions' />
			{ _renderContent() }
			<BottomSheet bsRef={ bottomSheetRef }>
				{ _renderBottomSheetContent() }
			</BottomSheet>
			<Modal visible={ visibleRedeem } borderRadius={ 16 } dismissable={ false }>
				{ _renderModalContent() }
			</Modal>
		</Container>
	)
}

export default withCommon(React.memo(Transactions))