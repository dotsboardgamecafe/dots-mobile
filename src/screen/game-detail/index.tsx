import React, { useCallback, useMemo, useState } from 'react'
import {
	ImageBackground, type ListRenderItemInfo, ScrollView, View, FlatList, type NativeSyntheticEvent, type NativeScrollEvent,
	TouchableOpacity
} from 'react-native'
import {
	ArrowLeft, Clock, Level, Location, Profile2User
} from 'iconsax-react-native'

import Text from '../../components/text'
import Container from '../../components/container'
import { scaleHeight, scaleHorizontal, scaleVertical, scaleWidth } from '../../utils/pixel.ratio'
import withCommon from '../../hoc/with-common'
import { type NavigationProps } from '../../models/navigation'
import createStyle from './styles'
import { GameImageBackground } from '../../assets/images'
import FilterTag from '../../components/filter-tag'
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet'
import { PageIndicator } from 'react-native-page-indicator'
import CardGame from '../../components/card-game'
import { type Games } from '../../models/games'
import Blush from '../../components/blush'
import exitApp from '../../utils/exit.app'
import { useGetDetailGameQuery } from '../../store/game'
import Modal from '../../components/modal'
import ActionButton from '../../components/action-button'
import { type Rooms } from '../../models/rooms'
import Image from '../../components/image'
import { useGetSettingQuery } from '../../store/setting'
import FilterIcon from '../../components/filter-icon'

type Props = NavigationProps<'gameDetail'>;

const GameDetail = ({ route, theme, navigation, t }: Props): React.ReactNode => {
	const { params: game } = route
	const styles = createStyle(theme)
	const [blushOp, setBlushOp] = useState(1)
	const [gamePlayIndex, setGamePlayIndex] = useState(0)
	const { data, error } = useGetDetailGameQuery(game.game_code ?? '')
	const { data: listGameMechanic } = useGetSettingQuery('game_mechanic')

	const _descriptionSection = useMemo(() => {
		if (data?.description)
			return (
				<View style={ styles.section }>
					<Text variant='bodyLargeBold' style={ styles.sectionTitle }>Description</Text>
					<Text variant='paragraphMiddleRegular' style={ styles.mt12 }>
						{ data?.description }
					</Text>
					{ /* <Text variant='bodyMiddleBold' style={ styles.contReading }>Continue Reading</Text> */ }
				</View>
			)
	}, [data])

	const _gameMechanicSection = useMemo(() => {
		if (data?.game_categories) {
			const categories = data.game_categories.map(c => c.category_name)
			const list = listGameMechanic?.filter(m => m.content_value && categories.includes(m.content_value))
			if (list?.length) {
				return (
					<View style={ styles.section }>
						<Text variant='bodyLargeBold' style={ styles.sectionTitleHowTo }>Mechanics</Text>
						<FlatList
							data={ list }
							keyExtractor={ (i, idx) => `${ idx }-${ i.setting_code }` }
							renderItem={ ({ item }) => <FilterTag
								id={ item.set_order ?? 0 }
								code={ item.setting_code ?? '' }
								icon={ <FilterIcon { ...item } /> }
								label={ item.content_value ?? '' }
							/> }
							ItemSeparatorComponent={ () => <View style={ { height: scaleHeight(list.length > 3 ? 8 : 0) } } /> }
							contentContainerStyle={ styles.wrapList }
							showsVerticalScrollIndicator={ false }
							scrollEnabled={ false }
						/>
					</View>
				)
			}
		}
	}, [data, listGameMechanic])

	const _howToPlaySection = useMemo(() => {
		const list = data?.collection_url ?? []

		if (list.length) {
			const content = list.length > 1 ?
				<>
					<FlatList
						horizontal
						data={ list }
						renderItem={ _gamePlayItem }
						pagingEnabled
						onScroll={ onGamePlaySroll }
						showsHorizontalScrollIndicator={ false }
					/>
					<PageIndicator
						count={ list.length }
						current={ gamePlayIndex }
						color='#2325269E'
						activeColor='#232526'
						style={ {
							position: 'absolute',
							bottom: scaleVertical(16),
							alignSelf: 'center',
						} }
					/>
				</> :
				<View style={ styles.section }>
					<Image
						source={ { uri: list[0] } }
						style={ { borderRadius: 16 } }
						keepRatio
					/>
				</View>

			return (
				<>
					<View style={ styles.section }>
						<Text variant='bodyLargeBold' style={ styles.sectionTitleHowTo }>How to Play</Text>
					</View>
					{ content }
				</>
			)
		}
	}, [data])

	const _gameMasterSection = useMemo(() => {
		if (data?.game_masters)
			return (
				<View style={ styles.section }>
					<Text variant='bodyLargeBold' style={ styles.sectionTitle }>Game Master</Text>
					<View style={ styles.wrapList }>
						<View style={ { alignContent: 'center', marginHorizontal: scaleHorizontal(16) } }>
							<Image
								source={ { uri: data.game_masters.image_url } }
								style={ styles.gameMaster }
							/>
							<Text variant='bodyMiddleMedium' style={ [styles.mt8, { textAlign: 'center' }] }>{ data.game_masters.user_name }</Text>
						</View>
					</View>
					{ /* <FlatList
					scrollEnabled={ false }
					data={ data?.game_masters }
					renderItem={ gameMaster }
					ItemSeparatorComponent={ () => <View style={ { height: scaleVertical(8) } } /> }
					contentContainerStyle={ [styles.wrapList] }
				/> */ }
				</View>
			)
	}, [data])

	const _roomSection = useMemo(() => {
		if (data?.game_rooms?.length)
			return <View style={ styles.section }>
				<Text variant='bodyLargeBold' style={ styles.sectionTitleHowTo }>Available Room</Text>
				<FlatList
					data={ data?.game_rooms }
					renderItem={ room }
					ItemSeparatorComponent={ () => <View style={ { height: scaleHeight(16) } } /> }
					scrollEnabled={ false }
					contentContainerStyle={ styles.mt16 }
				/>
			</View>
	}, [data])

	const _relatedGamesSection = useMemo(() => {
		if (data?.game_related?.length)
			return <View style={ styles.section }>
				<Text variant='bodyLargeBold' style={ styles.sectionTitleHowTo }>Related Games</Text>
				<FlatList
					data={ data?.game_related }
					keyExtractor={ item => item.game_code }
					renderItem={ ({ item }) => <CardGame style={ { flex: 1 / 2 } } item={ item } onPress={ navigateToDetail } /> }
					ItemSeparatorComponent={ () => <View style={ { height: 10 } } /> }
					style={ styles.list }
					columnWrapperStyle={ styles.columnWrapper }
					numColumns={ 2 }
					scrollEnabled={ false }
				/>
			</View>
	}, [data])

	const _playersAvatar = useMemo(() => {
		if (data?.user_have_played_game_history) {
			return data.user_have_played_game_history
				.map(i => i.user_image)
				.filter(i => i) as string[]
		}

		return []
	}, [data])

	const onPageScroll = useCallback(({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
		const start = 30
		const end = 200
		const th = end - start
		const y = nativeEvent.contentOffset.y
		if (y < 30) setBlushOp(1)
		else if (y > 200) setBlushOp(0)
		else setBlushOp((th - y) / th)
	}, [])

	const avatar = useCallback(({ item, index }: ListRenderItemInfo<string>) => {
		return (
			<Image
				source={ { uri: item } }
				style={ [styles.avatar, index > 0 && styles.avatarNotFirst] }
			/>
		)
	}, [])

	const _gamePlayItem = useCallback(({ item, index }: ListRenderItemInfo<string>) => {
		return (
			<Image
				source={ { uri: item } }
				style={ styles.gamePlay }
				resizeMode='stretch'
			// keepRatio
			/>
		)
	}, [])

	// const _gameMaster = useCallback(({ item, index }: ListRenderItemInfo<GameMasters>) => {
	// 	return (
	// 		<View style={ { alignContent: 'center', marginHorizontal: scaleHorizontal(16) } }>
	// 			<Image
	// 				source={ { uri: item.image_url } }
	// 				style={ styles.gameMaster }
	// 			/>
	// 			<Text variant='bodyMiddleMedium' style={ [styles.mt8, { textAlign: 'center' }] }>{ item.user_name }</Text>
	// 		</View>
	// 	)
	// }, [])

	const _navigateToRoomDteail = useCallback((param: Partial<Rooms>) => {
		navigation.navigate('roomDetail', param)
	}, [])

	const room = useCallback(({ item }: ListRenderItemInfo<Rooms>) => {
		return (
			<TouchableOpacity
				onPress={ () => { _navigateToRoomDteail(item) } }
			>
				<Image
					source={ { uri: item.room_image_url ?? '' } }
					// resizeMode='cover'
					style={ styles.room }
					keepRatio
				/>
			</TouchableOpacity>
		)
	}, [])

	const onGamePlaySroll = useCallback(({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
		const x = nativeEvent.contentOffset.x
		setGamePlayIndex(x / SCREEN_WIDTH)
	}, [])

	const _onPressBack = useCallback(() => {
		if (navigation.canGoBack()) {
			navigation.goBack()
		} else {
			exitApp()
		}
	}, [navigation])

	const navigateToDetail = useCallback((game: Games) => {
		navigation.push('gameDetail', game)
	}, [])

	return (
		<Container contentStyle={ styles.container }>
			<Blush
				color='#F8EA0E30'
				distance={ 200 }
				style={ styles.blushYellow }
				opacity={ blushOp }
			/>
			<Blush
				color='#2F319050'
				distance={ 200 }
				style={ styles.blushBlue }
				opacity={ blushOp }
			/>
			<Blush
				color='#FB151510'
				distance={ 50 }
				style={ styles.blushRed }
				opacity={ blushOp }
			/>
			<View style={ styles.header }>
				<TouchableOpacity onPress={ _onPressBack }>
					<ArrowLeft
						variant='Linear'
						color={ theme.colors.onBackground }
						size={ scaleWidth(24) }
					/>
				</TouchableOpacity>
				<Text variant='bodyExtraLargeHeavy' style={ styles.title }>
					{ data?.name }
				</Text>
				{ /* <ExportCurve
					variant='Linear'
					color={ theme.colors.onBackground }
					size={ scaleWidth(24) }
				/> */ }
			</View>

			<ScrollView
				onScroll={ onPageScroll }
				showsVerticalScrollIndicator={ false }
			>
				<View style={ styles.contentTop }>
					<ImageBackground
						source={ GameImageBackground }
						style={ styles.gameImageBg }
					>
						<Image
							source={ { uri: data?.image_url ?? game.image_url } }
							resizeMode='cover'
							style={ styles.gameImage }
						/>
					</ImageBackground>

					<View style={ styles.players }>
						<FlatList
							data={ _playersAvatar }
							renderItem={ avatar }
							horizontal
							style={ styles.avatarContainer }
						/>

						{ (data?.total_player ?? 0) > 0 &&
							<>
								<Text
									variant='bodySmallBold'
									style={ { marginStart: scaleHorizontal(8) } }
								>
									{ data?.total_player }
								</Text>
								<Text
									variant='bodySmallMedium'
									style={ { marginHorizontal: scaleHorizontal(2), flex: 1 } }
								>
									people have played
								</Text>
							</>
						}

						{ data?.is_popular &&
							<View style={ styles.popularContainer }>
								<Text variant='bodySmallBold' style={ styles.popularTag }>{ t('main-page.popular') }</Text>
							</View>
						}
					</View>
				</View>

				<View style={ styles.infoContainer }>
					<View style={ styles.row }>
						<Profile2User
							variant='Bold'
							size={ scaleWidth(16) }
							color={ theme.colors.gray }
							style={ { marginEnd: scaleHorizontal(4) } }
						/>
						<Text variant='bodyMiddleRegular' style={ { flex: 1 } }>Players: { data?.minimal_participant }-{ data?.maximum_participant } players</Text>

						<Level
							variant='Bold'
							size={ scaleWidth(16) }
							color={ theme.colors.gray }
							style={ { marginEnd: scaleHorizontal(4) } }
						/>
						<Text variant='bodyMiddleRegular' style={ { flex: 1 } }>Level: { data?.level }</Text>
					</View>
					<View style={ [styles.row, styles.mt8] }>
						<Clock
							variant='Bold'
							size={ scaleWidth(16) }
							color={ theme.colors.gray }
							style={ { marginEnd: scaleHorizontal(4) } }
						/>
						<Text variant='bodyMiddleRegular' style={ { flex: 1 } }>Duration: { data?.duration } min</Text>

						{ /* <Category
							variant='Bold'
							size={ scaleWidth(16) }
							color={ theme.colors.gray }
							style={ { marginEnd: scaleHorizontal(4) } }
						/>
						<Text variant='bodyMiddleRegular' style={ { flex: 1 } }>Category: { data?.game_type }</Text> */ }
						<Location
							variant='Bold'
							size={ scaleWidth(16) }
							color={ theme.colors.gray }
							style={ { marginEnd: scaleHorizontal(4) } }
						/>
						<Text variant='bodyMiddleRegular' style={ { flex: 1 } }>Location: { data?.cafe_name }</Text>
					</View>
				</View>

				{ _descriptionSection }
				{ _gameMechanicSection }
				{ _howToPlaySection }
				{ _gameMasterSection }
				{ _roomSection }
				{ _relatedGamesSection }
			</ScrollView>

			{
				typeof error === 'object' && error && 'data' in error &&
				<Modal
					visible
					onDismiss={ navigation.goBack }
					style={ { alignItems: 'center' } }
				>
					<Text>{ (error as { data: string; }).data }</Text>
					<ActionButton label='Go Back' onPress={ navigation.goBack } />
				</Modal>
			}
		</Container>
	)
}

export default withCommon(React.memo(GameDetail))