import React, {
	useCallback, useEffect, useMemo, useRef, useState
} from 'react'
import { Button } from 'react-native-paper'
import { FlatList, View } from 'react-native'
import { CloseCircle, SearchNormal, Setting4 } from 'iconsax-react-native'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { type BottomSheetModal } from '@gorhom/bottom-sheet'

import Container from '../../components/container'
import FilterItem from '../../components/filter-item'
import CardGame from '../../components/card-game'
import TextInput from '../../components/text-input'
import { scaleHeight, scaleWidth } from '../../utils/pixel.ratio'
import styles from './styles'
import { useKeyboardShown } from '../../utils/keyboard'
import { locations, rangeNumbers } from './data'
import FilterTag from '../../components/filter-tag'
import ActionButton from '../../components/action-button'
import withCommon from '../../hoc/with-common'
import { type NavigationProps } from '../../models/navigation'
import { type GameListParams, type Games } from '../../models/games'
import BottomSheet from '../../components/bottom-sheet'
import { useLazyGetGamesQuery } from '../../store/game'
import Text from '../../components/text'
import { useGetSettingQuery } from '../../store/setting'
// import FilterIcon from '../../components/filter-icon'
import { debounce } from 'lodash'

type Props = NavigationProps<'discover'>;

const Discover = ({ theme, t, navigation }: Props): React.ReactNode => {
	const defaultParam: GameListParams = { status: 'active', limit: 20, page: 1, order: 'games.name', sort: 'asc', location: 'Bandung' }
	// const [search, setSearch] = useState('')
	const [param, setParam] = useState<GameListParams>(defaultParam)
	const [filterType, setFilterType] = useState<string[]>([])
	const [filterMechanic, setFilterMechanic] = useState<string[]>([])
	const [filterLocation, setFilterLocation] = useState<string[]>(['Bandung'])
	const [filterPlayer, setFilterPlayer] = useState<string[]>([])
	// const [filterSection, setFilterSection] = useState(filterSections)
	const tabBarHeight = useBottomTabBarHeight()
	const isKeyboardShown = useKeyboardShown()
	const bottomSheetRef = useRef<BottomSheetModal>(null)
	// const { data: listGameType } = useGetSettingQuery('game_type')
	const { data: listGameMechanic } = useGetSettingQuery('game_mechanic')
	const pageRef = useRef(1)
	const [
		getGames,
		{ data: dataGames, isLoading: isLoadingGames, isFetching }
	] = useLazyGetGamesQuery()

	const _emptyListComponent = useMemo(() => {
		if (!isLoadingGames && !isFetching)
			return (
				<View style={ styles.emptyList }>
					<Text
						variant='paragraphDoubleExtraLargeRegular'
						style={ styles.emptyListLabel }
					>
						No Game Found
					</Text>
				</View>
			)
	}, [isLoadingGames, isFetching])

	const _onRefresh = useCallback(() => {
		pageRef.current = 1
		_onFetchGame()
	}, [])

	const _navigateToDetail = useCallback((game: Games) => {
		navigation.navigate('gameDetail', game)
	}, [])

	const _onFetchGame = useCallback(() => {
		getGames({ ...param, page: pageRef.current })
		pageRef.current += 1
	}, [param])

	const _onReachEnd = useCallback(() => {
		if ((dataGames?.length ?? 0) % 20 === 0)
			_onFetchGame()
	}, [dataGames, _onFetchGame])

	const _onResetFilter = useCallback(() => {
		setFilterType([])
		setFilterMechanic([])
		setFilterLocation([])
		const newParam = { ...defaultParam, keyword: param.keyword }
		setParam(newParam)
		pageRef.current = 1
		getGames({ ...newParam, page: pageRef.current })
		pageRef.current += 1
		bottomSheetRef.current?.dismiss()
	}, [param])

	const _onApplyFilter = useCallback(() => {
		const obj: GameListParams = { ...param }

		if (filterType.length) {
			obj.game_type = [...filterType].join(',')
		} else {
			delete obj.game_type
		}

		delete obj.minimal_participant
		delete obj.maximum_participant
		if (filterPlayer.length) {
			if (filterPlayer.includes('1')) {
				obj.minimal_participant = 0
				obj.maximum_participant = 1
			} else if (filterPlayer.includes('8+')) {
				obj.minimal_participant = 8
			} else {
				// filterPlayer = ["6 - 8", "2 - 4", "4 - 6"]
				const splitRanges = filterPlayer.map(i => i.split(' - '))
				const ranges = ([] as string[]).concat(...splitRanges).sort()
				obj.minimal_participant = Number(ranges[0])
				obj.maximum_participant = Number(ranges[ranges.length - 1])
			}
		}

		if (filterMechanic.length) {
			obj.game_category_name = [...filterMechanic].join(',')
		} else {
			delete obj.game_category_name
		}

		if (filterLocation.length) {
			obj.location = [...filterLocation].join(',')
		} else {
			delete obj.location
		}

		setParam(obj)
		pageRef.current = 1
		getGames({ ...obj, page: pageRef.current })
		pageRef.current += 1
		bottomSheetRef.current?.dismiss()
	}, [param, filterType, filterPlayer, filterMechanic, filterLocation])

	const _onFilterGameMechanic = useCallback((id?: number, code?: string, label?: string) => {
		setFilterMechanic(types => {
			if (label && types.includes(label)) return [...types.filter(t => t !== label)]
			return label ? [...types, label] : types
		})
	}, [])

	const _fetchSearch = useCallback((keyword: string, params: GameListParams) => {
		pageRef.current = 1
		getGames({ ...params, page: pageRef.current, keyword })
		pageRef.current += 1
	}, [])

	const debouncedSendRequest = useMemo(() => {
		return debounce(_fetchSearch, 300)
	}, [_fetchSearch])

	const _onTypeSearch = (value: string): void => {
		setParam({ ...param, keyword: value })
		debouncedSendRequest(value, param)
	}

	const _onClearSearch = useCallback(() => {
		pageRef.current = 1
		getGames({ ...param, page: pageRef.current, keyword: '' })
		setParam({ ...param, keyword: '' })
		pageRef.current += 1
	}, [param])

	useEffect(() => {
		_onFetchGame()
	}, [])

	return (
		<Container>
			<View style={ {
				flexDirection: 'row',
				alignItems: 'center',
				marginHorizontal: scaleWidth(10),
				marginTop: scaleHeight(16),
			} }>
				<TextInput
					containerStyle={ { flex: 1, alignSelf: 'stretch' } }
					prefix={ <SearchNormal size={ scaleWidth(18) } color={ theme.colors.gray } /> }
					suffix={ param.keyword && <CloseCircle
						onTouchEnd={ _onClearSearch }
						size={ scaleWidth(20) }
						color={ theme.colors.gray } />
					}
					inputProps={ {
						placeholder: t('discover-page.search-game'),
						placeholderTextColor: theme.colors.gray,
						enterKeyHint: 'search',
						onChangeText: _onTypeSearch,
						value: param.keyword
					} }
				/>
			</View>

			<View style={ styles.filterContainer }>
				<FilterItem
					label={ t('discover-page.filter-game') }
					prefix={
						<Setting4
							size={ scaleWidth(14) }
							variant='Linear'
							color={ theme.colors.onBackground }
							style={ { marginEnd: 4 } }
						/>
					}
					onPress={ () => {
						// setFilterSection(filterSections)
						bottomSheetRef.current?.present()
					} }
				/>

				{ /* <FlatList
					horizontal
					data={ filters }
					renderItem={ ({ item }) => <FilterItem
						onPress={ () => {
							setFilterSection(item.name ? filterSections.filter(i => i === item.name) : filterSections)
							bottomSheetRef.current?.present()
						} }
						{ ...item } />
					}
					ItemSeparatorComponent={ () => <View style={ { width: 8 } } /> }
					contentContainerStyle={ { paddingHorizontal: 10 } }
					showsHorizontalScrollIndicator={ false }
				/> */ }
			</View>

			<FlatList
				data={ dataGames }
				refreshing={ isLoadingGames || isFetching }
				onRefresh={ _onRefresh }
				keyExtractor={ item => item.game_code }
				renderItem={ ({ item }) => <CardGame style={ { flex: 1 / 2 } } item={ item } onPress={ _navigateToDetail } /> }
				ItemSeparatorComponent={ () => <View style={ { height: 10 } } /> }
				style={ styles.list }
				columnWrapperStyle={ styles.columnWrapper }
				contentContainerStyle={ { paddingBottom: isKeyboardShown ? 10 : tabBarHeight, flexGrow: 1 } }
				ListEmptyComponent={ _emptyListComponent }
				numColumns={ 2 }
				onEndReached={ _onReachEnd }
				onEndReachedThreshold={ .7 }
			/>

			<BottomSheet
				bsRef={ bottomSheetRef }
				// bsProps={ { onDismiss: _onFilterDismiss } }
				viewProps={ { style: styles.bottomSheet } }
			>
				<View style={ styles.bsHead }>
					<Text style={ styles.bsTitle }>{ t('discover-page.filter-game') }</Text>
					<Button onPress={ _onResetFilter } labelStyle={ styles.filterReset }>
						Reset
					</Button>
				</View>

				<Text style={ styles.filterSecTitle }>{ t('discover-page.filter-game-location') }</Text>
				<FlatList
					data={ locations }
					keyExtractor={ i => i.name }
					extraData={ [filterLocation] }
					renderItem={ ({ item }) => <FilterTag
						id={ item.id }
						code={ item.name }
						label={ item.name }
						active={ [...filterLocation].includes(item.name) }
						onClick={ (_id, label) => {
							setFilterLocation(locs => {
								if (label && locs.includes(label)) return [...locs.filter(t => t !== label)]
								return label ? [...locs, label] : locs
							})
						}
						}
					/>
					}
					contentContainerStyle={ styles.wrapList }
					showsVerticalScrollIndicator={ false }
					scrollEnabled={ false }
				/>

				<Text style={ styles.filterSecTitle }>Number of Player</Text>
				<FlatList
					data={ rangeNumbers }
					keyExtractor={ i => i.name }
					extraData={ [filterPlayer] }
					renderItem={ ({ item }) => <FilterTag
						id={ item.id }
						code={ item.name }
						label={ item.name }
						active={ [...filterPlayer].includes(item.name) }
						onClick={ (_id, label) => {
							setFilterPlayer(locs => {
								if (label && locs.includes(label)) return [...locs.filter(t => t !== label)]
								// return label ? [...locs, label] : locs
								return label ? [label] : locs
							})
						}
						}
					/>
					}
					contentContainerStyle={ styles.wrapList }
					showsVerticalScrollIndicator={ false }
					scrollEnabled={ false }
				/>

				{ /* <Text style={ styles.filterSecTitle }>{ t('discover-page.filter-game-type') }</Text>
					<FlatList
						data={ listGameType }
						keyExtractor={ (i, id) => `${id}-${i.setting_code}` }
						extraData={ [filterType] }
						renderItem={ ({ item }) => <FilterTag
							id={ item.set_order }
							icon={ <FilterIcon { ...item }/> }
							code={ item.setting_code }
							label={ item.content_value }
							active={ [...filterType].includes(item.content_value ?? '') }
							onClick={ _onFilterGameType }
						/>
						}
						contentContainerStyle={ styles.wrapList }
						showsVerticalScrollIndicator={ false }
					/>
				*/ }

				<Text style={ styles.filterSecTitle }>{ t('discover-page.filter-game-mechanics') }</Text>
				<FlatList
					data={ listGameMechanic }
					keyExtractor={ (i, id) => `${ id }-${ i.setting_code }` }
					extraData={ [filterMechanic] }
					renderItem={ ({ item }) => <FilterTag
						id={ item.set_order }
						code={ item.setting_code }
						// icon={ <FilterIcon { ...item } /> }
						label={ item.content_value }
						active={ [...filterMechanic].includes(item.content_value ?? '') }
						onClick={ _onFilterGameMechanic }
					/> }
					contentContainerStyle={ styles.wrapList }
					showsVerticalScrollIndicator={ false }
					scrollEnabled={ false }
				/>

				<ActionButton
					style={ styles.filterAction }
					label='Show Result'
					onPress={ _onApplyFilter }
				/>
			</BottomSheet>
		</Container>
	)
}

export default withCommon(React.memo(Discover))