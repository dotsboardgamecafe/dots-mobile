import React, { useCallback, useEffect, useState } from 'react'
import {
	ImageBackground, type ListRenderItemInfo, ScrollView, View, FlatList, type NativeSyntheticEvent, type NativeScrollEvent
} from 'react-native'
import {
	ArrowLeft, Category, Clock, ExportCurve, Level, Location, Profile2User
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
import { avatars, gamePlays } from './data'
import { type GameMasters } from '../../models/games'
import Blush from '../../components/blush'
import { useGetDetailGameQuery } from '../../store/game'
import Modal from '../../components/modal'
import ActionButton from '../../components/action-button'
import GiDominoTiles from '../../assets/svg/GiDominoTiles.svg'
import { type Rooms } from '../../models/rooms'
import Image from '../../components/image'

type Props = NavigationProps<'gameDetail'>

const GameDetail = ({ route, theme, navigation, t }: Props): React.ReactNode => {
	const { params: game } = route
	const styles = createStyle(theme)
	const [blushOp, setBlushOp] = useState(1)
	const [gamePlayIndex, setGamePlayIndex] = useState(0)
	const { data, error } = useGetDetailGameQuery(game.game_code ?? '')

	useEffect(() => {
		console.log('gd error', error)
	}, [error])

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

	const gamePlay = useCallback(({ item, index }: ListRenderItemInfo<string>) => {
		return (
			<Image
				source={ { uri: item } }
				style={ styles.gamePlay }
			/>
		)
	}, [])

	const gameMaster = useCallback(({ item, index }: ListRenderItemInfo<GameMasters>) => {
		return (
			<View style={ { alignContent: 'center', marginHorizontal: scaleHorizontal(16) } }>
				<Image
					source={ { uri: item.image_url } }
					style={ styles.gameMaster }
				/>
				<Text variant='bodyMiddleMedium' style={ [styles.mt8, { textAlign: 'center' }] }>{ item.name }</Text>
			</View>
		)
	}, [])

	const room = useCallback(({ item }: ListRenderItemInfo<Rooms>) => {
		return (
			<Image
				source={ { uri: item.room_img_url } }
				resizeMode='cover'
				style={ styles.room }
			/>
		)
	}, [])

	const onGamePlaySroll = useCallback(({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
		const x = nativeEvent.contentOffset.x
		setGamePlayIndex(x / SCREEN_WIDTH)
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
				<ArrowLeft
					variant='Linear'
					color={ theme.colors.onBackground }
					size={ scaleWidth(24) }
					onPress={ navigation.goBack }
				/>
				<Text variant='bodyExtraLargeHeavy' style={ styles.title }>
					{ data?.name }
				</Text>
				<ExportCurve
					variant='Linear'
					color={ theme.colors.onBackground }
					size={ scaleWidth(24) }
				/>
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
							source={ { uri: game.image_url } }
							resizeMode='cover'
							style={ styles.gameImage }
						/>
					</ImageBackground>

					<View style={ styles.players }>
						<FlatList
							data={ avatars }
							renderItem={ avatar }
							horizontal
							style={ styles.avatarContainer }
						/>

						<Text
							variant='bodySmallBold'
							style={ { marginStart: scaleHorizontal(8) } }
						>
							20K+
						</Text>
						<Text
							variant='bodySmallMedium'
							style={ { marginHorizontal: scaleHorizontal(2), flex: 1 } }
						>
							people have played
						</Text>

						<View style={ styles.popularContainer }>
							<Text variant='bodySmallBold' style={ styles.popularTag }>{ t('main-page.popular') }</Text>
						</View>
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
						<Text variant='bodyMiddleRegular' style={ { flex: 1 } }>Slot: { game.minimal_participant }-{ game.maximum_participant } players</Text>

						<Level
							variant='Bold'
							size={ scaleWidth(16) }
							color={ theme.colors.gray }
							style={ { marginEnd: scaleHorizontal(4) } }
						/>
						<Text variant='bodyMiddleRegular' style={ { flex: 1 } }>Level: { game.difficulty }</Text>
					</View>
					<View style={ [styles.row, styles.mt8] }>
						<Clock
							variant='Bold'
							size={ scaleWidth(16) }
							color={ theme.colors.gray }
							style={ { marginEnd: scaleHorizontal(4) } }
						/>
						<Text variant='bodyMiddleRegular' style={ { flex: 1 } }>Duration: { game.duration } min</Text>

						<Category
							variant='Bold'
							size={ scaleWidth(16) }
							color={ theme.colors.gray }
							style={ { marginEnd: scaleHorizontal(4) } }
						/>
						<Text variant='bodyMiddleRegular' style={ { flex: 1 } }>Category: { game.game_type }</Text>
					</View>
					<View style={ [styles.row, styles.mt8] }>
						<Location
							variant='Bold'
							size={ scaleWidth(16) }
							color={ theme.colors.gray }
							style={ { marginEnd: scaleHorizontal(4) } }
						/>
						<Text variant='bodyMiddleRegular' style={ { flex: 1 } }>Location: { game.cafe_name }</Text>
					</View>
				</View>

				<View style={ styles.section }>
					<Text variant='bodyLargeBold' style={ styles.sectionTitle }>Description</Text>
					<Text variant='paragraphMiddleRegular' style={ styles.mt12 }>
						{ game.description }
					</Text>
					{ /* <Text variant='bodyMiddleBold' style={ styles.contReading }>Continue Reading</Text> */ }

					<Text variant='bodyLargeBold' style={ styles.sectionTitle }>Mechanics</Text>
					<FlatList
						scrollEnabled={ false }
						data={ game.game_categories }
						renderItem={ ({ item, index }) => <FilterTag
							id={ index }
							icon={ <GiDominoTiles width={ scaleWidth(17) } height={ scaleHeight(17) } /> }
							label={ item.category_name }
							active
						/>
						}
						ItemSeparatorComponent={ () => <View style={ { height: scaleVertical(8) } } /> }
						contentContainerStyle={ styles.wrapList }
					/>

					<Text variant='bodyLargeBold' style={ styles.sectionTitle }>Components</Text>
				</View>
				<View
				>
					<FlatList
						horizontal
						data={ gamePlays }
						renderItem={ gamePlay }
						pagingEnabled
						onScroll={ onGamePlaySroll }
						showsHorizontalScrollIndicator={ false }
					/>
					<PageIndicator
						count={ gamePlays.length }
						current={ gamePlayIndex }
						color='#2325269E'
						activeColor='#232526'
						style={ {
							position: 'absolute',
							bottom: scaleVertical(16),
							alignSelf: 'center',
						} }
					/>
				</View>

				<View style={ styles.section }>
					<Text variant='bodyLargeBold' style={ styles.sectionTitle }>Game Master</Text>
					<FlatList
						scrollEnabled={ false }
						data={ data?.game_masters }
						renderItem={ gameMaster }
						ItemSeparatorComponent={ () => <View style={ { height: scaleVertical(8) } } /> }
						contentContainerStyle={ [styles.wrapList] }
					/>

					{ game.game_rooms && <Text variant='bodyLargeBold' style={ styles.sectionTitle }>Available Room</Text> }
					<FlatList
						data={ data?.game_rooms }
						renderItem={ room }
						ItemSeparatorComponent={ () => <View style={ { height: scaleHeight(16) } } /> }
						scrollEnabled={ false }
						contentContainerStyle={ styles.mt16 }
					/>

					{ game.game_related && <Text variant='bodyLargeBold' style={ styles.sectionTitle }>Related Games</Text> }
					<FlatList
						data={ game.game_related }
						keyExtractor={ item => item.game_code }
						renderItem={ ({ item }) => <CardGame item={ item } /> }
						ItemSeparatorComponent={ () => <View style={ { height: 10 } } /> }
						style={ styles.list }
						columnWrapperStyle={ styles.columnWrapper }
						numColumns={ 2 }
						scrollEnabled={ false }
					/>
				</View>
			</ScrollView>

			{
				typeof error === 'object' && error && 'data' in error &&
				<Modal
					visible
					onDismiss={ navigation.goBack }
					style={ { alignItems: 'center' } }
				>
					<Text>{ (error as {data:string}).data }</Text>
					<ActionButton label='Go Back' onPress={ navigation.goBack } />
				</Modal>
			}
		</Container>
	)
}

export default withCommon(React.memo(GameDetail))