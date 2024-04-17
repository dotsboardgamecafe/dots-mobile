import React, { useCallback, useState } from 'react'
import {
	Image, ImageBackground, type ListRenderItemInfo, ScrollView, View, FlatList, type NativeSyntheticEvent, type NativeScrollEvent
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
import { gameTypes, games } from '../discover/data'
import FilterTag from '../../components/filter-tag'
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet'
import { PageIndicator } from 'react-native-page-indicator'
import CardGame from '../../components/card-game'
import { avatars, gameMasters, gamePlays, rooms } from './data'
import { type GameMaster } from '../../models/games'
import Blush from '../../components/blush'

type Props = NavigationProps<'gameDetail'>

const GameDetail = ({ theme, navigation, t }: Props): React.ReactNode => {
	const styles = createStyle(theme)
	const [blushOp, setBlushOp] = useState(1)
	const [gamePlayIndex, setGamePlayIndex] = useState(0)

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

	const gameMaster = useCallback(({ item, index }: ListRenderItemInfo<GameMaster>) => {
		return (
			<View style={ { alignContent: 'center', marginHorizontal: scaleHorizontal(16) } }>
				<Image
					source={ { uri: item.photo } }
					style={ styles.gameMaster }
				/>
				<Text variant='bodyMiddleMedium' style={ [styles.mt8, { textAlign: 'center' }] }>{ item.name }</Text>
			</View>
		)
	}, [])

	const room = useCallback(({ item, index }: ListRenderItemInfo<string>) => {
		return (
			<Image
				source={ { uri: item } }
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
					Rising Sun Game
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
							source={ { uri: 'https://picsum.photos/210' } }
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
						<Text variant='bodyMiddleRegular' style={ { flex: 1 } }>Slot: 3-5 players</Text>

						<Level
							variant='Bold'
							size={ scaleWidth(16) }
							color={ theme.colors.gray }
							style={ { marginEnd: scaleHorizontal(4) } }
						/>
						<Text variant='bodyMiddleRegular' style={ { flex: 1 } }>Level: 3.3</Text>
					</View>
					<View style={ [styles.row, styles.mt8] }>
						<Clock
							variant='Bold'
							size={ scaleWidth(16) }
							color={ theme.colors.gray }
							style={ { marginEnd: scaleHorizontal(4) } }
						/>
						<Text variant='bodyMiddleRegular' style={ { flex: 1 } }>Duration: 120 min</Text>

						<Category
							variant='Bold'
							size={ scaleWidth(16) }
							color={ theme.colors.gray }
							style={ { marginEnd: scaleHorizontal(4) } }
						/>
						<Text variant='bodyMiddleRegular' style={ { flex: 1 } }>Category: War Game</Text>
					</View>
					<View style={ [styles.row, styles.mt8] }>
						<Location
							variant='Bold'
							size={ scaleWidth(16) }
							color={ theme.colors.gray }
							style={ { marginEnd: scaleHorizontal(4) } }
						/>
						<Text variant='bodyMiddleRegular' style={ { flex: 1 } }>Location: Bandung, Paskal 23 Mall</Text>
					</View>
				</View>

				<View style={ styles.section }>
					<Text variant='bodyLargeBold' style={ styles.sectionTitle }>Description</Text>
					<Text variant='paragraphMiddleRegular' style={ styles.mt12 }>
						Rising Sun is a board game for 3 to 5 players set in legendary feudal Japan. Each player chooses a Clan and competes to lead theirs to victory by accumulating Victory Points over the course of the Seasons. Each Clan possesses a unique ability and differs in Seasonal Income, Starting Honor Rank, and Home Province. Over the course of the game, players will forge and break alliances, choose political actions, worship the gods, customize their clans, and position their figures around Japan..
					</Text>
					<Text variant='bodyMiddleBold' style={ styles.contReading }>Continue Reading</Text>

					<Text variant='bodyLargeBold' style={ styles.sectionTitle }>Mechanics</Text>
					<FlatList
						scrollEnabled={ false }
						data={ gameTypes }
						renderItem={ ({ item }) => <FilterTag
							id={ item.id }
							icon={ item.icon }
							label={ item.name }
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
						data={ gameMasters }
						renderItem={ gameMaster }
						ItemSeparatorComponent={ () => <View style={ { height: scaleVertical(8) } } /> }
						contentContainerStyle={ [styles.wrapList] }
					/>

					<Text variant='bodyLargeBold' style={ styles.sectionTitle }>Available Room</Text>
					<FlatList
						data={ rooms }
						renderItem={ room }
						ItemSeparatorComponent={ () => <View style={ { height: scaleHeight(16) } } /> }
						scrollEnabled={ false }
						contentContainerStyle={ styles.mt16 }
					/>

					<Text variant='bodyLargeBold' style={ styles.sectionTitle }>Related Games</Text>

					<FlatList
						data={ games.slice(0, 2) }
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
		</Container>
	)
}

export default withCommon(React.memo(GameDetail))