/* eslint-disable no-unused-vars */
import { FlatList, type ListRenderItemInfo, View, TouchableOpacity } from 'react-native'
import React, {
	useCallback, useEffect, useMemo, useRef, useState
} from 'react'
import Container from '../../components/container'
import Header from '../../components/header'

import isEmpty from 'lodash/isEmpty'

// todo next phase
// import TabView from '../../components/tab-view'
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
import { scaleFont, scaleWidth } from '../../utils/pixel.ratio'
import { Clock, CloseCircle, Receipt2 } from 'iconsax-react-native'
import Modal from '../../components/modal'

import CloseIcon from '../../assets/svg/close.svg'
import { redeemSuccessIllu } from '../../assets/images'
import ActionButton from '../../components/action-button'
import { useGetTransactionQuery } from '../../store/transactions'
import useStorage from '../../hooks/useStorage'
import { type StatusTransactionType, type Transaction } from '../../models/transaction'
import Loading from '../../components/loading'
import ReloadView from '../../components/reload-view'
import { RefreshControl } from 'react-native-gesture-handler'
import moment from 'moment'

type Props = NavigationProps<'transactions'>

interface RedeemType {
  invoice_code: string
  description: string
  price: number
  point: number,
  is_new: boolean
}

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
  onPressHistoryItem: (item: Transaction) => void,
	listTransactionData?: Transaction[],
	isRefresh?: boolean,
	onRefresh?: () => void
}

interface RedeemTabProps {
  onPressRedeem: () => void
}

const HistoryTab = ({ onPressHistoryItem, listTransactionData, isRefresh, onRefresh }: HistoryTabProps): React.ReactNode => {
	const _renderItem = useCallback(({ item }:ListRenderItemInfo<Transaction>): React.ReactElement => {
		return (
			<View style={ styles.historyWrapperStyle }>
				<View style={ [styles.rowStyle, styles.historyContentStyle] }>
					<Image style={ styles.historyImageStyle }
						source={ { uri: item.game_img_url } }
					/>
					<View style={ styles.growStyle }>
						<View style={ [styles.rowStyle, styles.spaceBetweenStyle] }>
							<Text style={ styles.textGrayStyle } variant='bodySmallRegular'>{ moment(item.created_date).format('MMM, Do YYYY - hh:mm') }</Text>
							<TouchableOpacity onPress={ () => { onPressHistoryItem(item) } }>
								<Text style={ styles.textBlueStyle } variant='bodySmallBold'>See order detail</Text>
							</TouchableOpacity>
						</View>
						<Text style={ styles.historyTextSpaceStyle } variant='bodyMiddleDemi'>{ item.game_name }</Text>
						<View style={ [styles.rowStyle, styles.spaceBetweenStyle, styles.historyTextSpaceStyle] }>
							<Text variant='bodySmallMedium'>{ currencyFormatter(item.final_price_amount) }</Text>
							{ /* {
								item.discount ?
									<Text variant='bodySmallMedium'>Discount Reward { item.discount }%</Text> : null
							} */ }
						</View>
						<View style={ styles.totalPriceSeparatorStyle }/>
						<View style={ [styles.rowStyle, styles.spaceBetweenStyle] }>
							<Text variant='bodyMiddleRegular'>Total Payment:</Text>
							<Text variant='bodyMiddleDemi'>{ currencyFormatter(item.final_price_amount) }</Text>
						</View>
					</View>
				</View>
			</View>
		)
	}, [])

	return (
		<FlatList
			bounces={ false }
			data={ listTransactionData }
			renderItem={ _renderItem }
			keyExtractor={ item => item.transaction_code }
			ItemSeparatorComponent={ () => <View style={ styles.itemSeparatorStyle }/> }
			refreshControl={ <RefreshControl refreshing={ Boolean(isRefresh) } onRefresh={ onRefresh }/> }
		/>
	)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
	const { user } = useStorage()
	const [selectedHistory, setSelectedHistory] = useState<Transaction>()
	const bottomSheetRef = useRef<BottomSheetModal>(null)
	const [visibleRedeem, setVisibleRedeem] = useState(false)
	const [isRefresh, setIsRefresh] = useState(false)
	const {
		data: listTransactionData,
		isFetching: isLoadingTransaction,
		refetch: refetchTransaction,
		isError: isErrorTransaction,
	} = useGetTransactionQuery(user?.user_code)

	const _onPressHistoryItem = useCallback((item: Transaction) => {
		setSelectedHistory(item)
		bottomSheetRef.current?.present()
	}, [])

	const _onPressRedeem = useCallback(() => {
		setVisibleRedeem(!visibleRedeem)
	}, [visibleRedeem])

	const _onRefresh = useCallback(() => {
		setIsRefresh(true)
		refetchTransaction()
	}, [])

	const _isLoading = useMemo(() => {
		const loading = isLoadingTransaction
		const isEmptyData = isEmpty(isErrorTransaction)
		return loading && isEmptyData
	}, [isLoadingTransaction, isErrorTransaction])

	useEffect(() => {
		if (!_isLoading && isRefresh) setIsRefresh(false)
	}, [_isLoading, isRefresh])

	const _renderStatusTransaction = useCallback((status?: StatusTransactionType) => {
		const content = {
			parentBackground: styles.tickSuccessBlurStyle,
			childBackground: styles.tickSuccessCircleStyle,
			textColor: styles.successTextStyle,
			message: 'Success',
			icon: <TickSuccessIcon/>,
		}

		switch (status) {
			case 'PENDING':
				content.parentBackground = styles.tickPendingBlurStyle
				content.childBackground = styles.tickPendingCircleStyle
				content.textColor = styles.pendingTextStyle
				content.message = 'Pending'
				content.icon = <Clock size={ scaleFont(14) } color={ styles.pendingTextStyle.color }/>
				break
			
			case 'EXPIRED':
				content.parentBackground = styles.tickExpiredBlurStyle
				content.childBackground = styles.tickExpiredCircleStyle
				content.textColor = styles.expiredTextStyle
				content.message = 'Expired'
				content.icon = <CloseCircle size={ scaleFont(14) } color={ styles.expiredTextStyle.color }/>
				break
		}

		return (
			<View style={ [styles.alignCenterStyle, styles.rowStyle, styles.justifyCenterStyle] }>
				<View style={ [styles.tickBlurStyle, styles.justifyCenterStyle, styles.alignCenterStyle, content.parentBackground] }>
					<View style={ [styles.tickCircleStyle, styles.justifyCenterStyle, styles.alignCenterStyle, content.parentBackground] }>
						{ content.icon }
					</View>
				</View>
				<Text style={ content.textColor } variant='bodyLargeHeavy'>{ content.message }</Text>
			</View>
		)
	}, [])

	const _renderBottomSheetContent = useMemo(() => {
		if (isErrorTransaction) return <ReloadView onRefetch={ _onRefresh } />
		let message = `Congratulations! You are earned ${selectedHistory?.awarded_user_point} points`

		if (selectedHistory?.status === 'EXPIRED') {
			message = 'Your transaction has expired'
		}
		if (selectedHistory?.status === 'PENDING') {
			message = 'Your transaction is currently being processed'
		}

		const dateTime = moment(selectedHistory?.created_date).local()
			.format('MMM, Do YYYY - hh:mm')

		return (
			<View style={ { paddingBottom: 34 } }>
				{ _renderStatusTransaction(selectedHistory?.status) }
				<Text
					variant='bodySmallDemi'
					style={ [styles.textCenterStyle, styles.historyDateStyle] }>
					{ dateTime }
				</Text>
				<View style={ [styles.rowStyle, styles.justifyBetweenStyle, styles.bookingWrapperStyle, styles.bottomSheetPaddingStyle] }>
					<Text variant='bodyMiddleRegular'>Booking ID</Text>
					<Text variant='bodyMiddleRegular'>#{ selectedHistory?.transaction_code }</Text>
				</View>
				<View style={ [styles.bottomSheetPaddingStyle, styles.orderSummaryStyle] }>
					<Text variant='bodyLargeDemi'>Order Summary</Text>
					<View style={ [styles.rowStyle, styles.justifyBetweenStyle, styles.baseLineStyle] }>
						<View style={ [styles.rowStyle, styles.orderSummaryDetailStyle] }>
							<Text variant='bodyMiddleDemi'>1x</Text>
							<Text style={ styles.orderSummaryTitleStyle } variant='bodyMiddleRegular'>{ selectedHistory?.game_name }</Text>
						</View>
						<View style={ styles.flexEndStyle }>
							<Text variant='bodyMiddleRegular'>{ selectedHistory && currencyFormatter(selectedHistory?.final_price_amount ?? 0) }</Text>
							{ /* {
								selectedHistory?.discount ?
									<Text variant='bodyMiddleRegular'>Discount Reward { selectedHistory?.discount }%</Text> : null
							} */ }
						</View>
					</View>
				</View>
				<View style={ styles.bottomSheetDetailSeparatorStyle }/>
				<View style={ [styles.rowStyle, styles.justifyBetweenStyle, styles.bottomSheetPaddingStyle, styles.alignCenterStyle] }>
					<Text variant='bodyMiddleRegular'>Total Payment</Text>
					<Text variant='bodyMiddleDemi'>{ selectedHistory && currencyFormatter(selectedHistory?.final_price_amount ?? 0) }</Text>
				</View>
				<View style={ styles.bottomSheetDetailSeparatorStyle }/>
				<Text variant='bodyMiddleDemi' style={ styles.bottomSheetPaddingStyle }>{ message }</Text>
			</View>
		)
	}, [selectedHistory, isErrorTransaction])

	const _renderContent = useMemo(() => {
		// todo next phase
		// return (
		// 	<TabView
		// 		tabs={ [
		// 			{
		// 				key: 'pointActivity',
		// 				title: t('transaction-page.tab-history'),
		// 				component: () => <HistoryTab onPressHistoryItem={ _onPressHistoryItem } />
		// 			},
		// 			{
		// 				key: 'earnActivity',
		// 				title: t('transaction-page.tab-redeem'),
		// 				component: () => <RedeemTab onPressRedeem={ _onPressRedeem } />
		// 			}
		// 		] }
		// 	 />
		// )

		return (
			<HistoryTab
				isRefresh={ isRefresh }
				onRefresh={ _onRefresh }
				listTransactionData={ listTransactionData }
				onPressHistoryItem={ _onPressHistoryItem }
			/>
		)
	}, [_onPressRedeem, listTransactionData, isRefresh])

	const _renderModalContent = useMemo(() => {
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
			{ _renderContent }
			<BottomSheet bsRef={ bottomSheetRef }>
				{ _renderBottomSheetContent }
			</BottomSheet>
			<Modal visible={ visibleRedeem } borderRadius={ 16 } dismissable={ false }>
				{ _renderModalContent }
			</Modal>
			<Loading isLoading={ _isLoading } />
		</Container>
	)
}

export default withCommon(React.memo(Transactions))