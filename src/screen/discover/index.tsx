import React, {
	useCallback, useEffect, useMemo, useRef, useState
} from 'react'
import { Button } from 'react-native-paper'
import { FlatList, View } from 'react-native'
import { ArrowDown2, SearchNormal, Setting4 } from 'iconsax-react-native'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { type BottomSheetModal } from '@gorhom/bottom-sheet'

import Container from '../../components/container'
import FilterItem from '../../components/filter-item'
import CardGame from '../../components/card-game'
import TextInput from '../../components/text-input'
import { scaleHeight, scaleWidth } from '../../utils/pixel.ratio'
import styles from './styles'
import { useKeyboardShown } from '../../utils/keyboard'
import { type FilterItemType } from '../../components/filter-item/type'
import { filterSections, gameMechanics, gameTypes, locations } from './data'
import FilterTag from '../../components/filter-tag'
import ActionButton from '../../components/action-button'
import withCommon from '../../hoc/with-common'
import { type NavigationProps } from '../../models/navigation'
import { type GameListParams, type Games } from '../../models/games'
import BottomSheet from '../../components/bottom-sheet'
import { useGetListGameQuery } from '../../store/game'
import Text from '../../components/text'

type Props = NavigationProps<'discover'>

const Discover = ({ theme, t, navigation }: Props): React.ReactNode => {
	const defaultParam: GameListParams = { status: 'active', limit: 100, sort: 'desc' }
	const [search, setSearch] = useState('')
	const [param, setParam] = useState<GameListParams>(defaultParam)
	const [filterType, setFilterType] = useState<string[]>([])
	const [filterMechanic, setFilterMechanic] = useState<string[]>([])
	const [filterLocation, setFilterLocation] = useState<string[]>([])
	const [filterSection, setFilterSection] = useState(filterSections)
	const [applyFilter, setApplyFilter] = useState(false)
	const { isLoading, data, refetch, isFetching } = useGetListGameQuery(param)
	const tabBarHeight = useBottomTabBarHeight()
	const isKeyboardShown = useKeyboardShown()
	const bottomSheetRef = useRef<BottomSheetModal>(null)

	const arrowDown = useMemo(() => (<ArrowDown2
		variant='Linear'
		color={ theme.colors.onBackground }
		size={ 14 }
		style={ { marginStart: 4 } }
	/>), [])
	const filters: FilterItemType[] = useMemo(() => [
		{ label: t('discover-page.filter-game-type'), name: 'type', suffix: arrowDown },
		{ label: t('discover-page.filter-game-mechanics'), name: 'mechanics', suffix: arrowDown },
		{ label: t('discover-page.filter-game-location'), name: 'location', suffix: arrowDown },
		// { label: t('discover-page.duration'), suffix: arrowDown },
	], [])

	const navigateToDetail = useCallback((game: Games) => {
		navigation.navigate('gameDetail', game)
	}, [])

	const _resetParam = useCallback(() => {
		setParam(defaultParam)
		bottomSheetRef.current?.dismiss()
	}, [])

	const _onFilterDismiss = useCallback(() => {
		if (applyFilter) {
			setParam(param => ({
				...param,
				game_type: [...filterType].join(','),
				game_category_name: [...filterMechanic].join(','),
				location: [...filterLocation].join(','),
			}))
		} else {
			setFilterType([])
			setFilterMechanic([])
			setFilterLocation([])
		}
	}, [applyFilter, filterType, filterMechanic, filterLocation])

	useEffect(() => { console.log('param: ', param) }, [param])

	return (
		<Container>
			<View style={ {
				flexDirection: 'row',
				alignItems: 'center',
				marginHorizontal: scaleWidth(10),
				marginTop: scaleHeight(16),
			} }>
				<TextInput
					prefix={ <SearchNormal size={ scaleWidth(16) } color={ theme.colors.gray } /> }
					inputProps={ {
						placeholder: t('discover-page.search-game'),
						placeholderTextColor: theme.colors.gray,
						enterKeyHint: 'search',
						value: search,
						onChangeText: setSearch
					} }
				/>
				<Button
					onPress={ () => { setParam(param => ({ ...param, keyword: search })) } }
					labelStyle={ styles.filterReset }
					style={ {
						borderRadius: 10,
						backgroundColor: theme.colors.background,
						marginStart: 8,
						alignSelf: 'stretch',
						justifyContent: 'center'
					} }
					rippleColor={ theme.colors.background }
				>
					Search
				</Button>
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
						setFilterSection(filterSections)
						bottomSheetRef.current?.present()
						// navigation.navigate('paymentSuccess')
					} }
				/>

				<FlatList
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
				/>
			</View>

			<FlatList
				data={ data }
				refreshing={ isLoading || isFetching }
				onRefresh={ refetch }
				keyExtractor={ item => item.game_code }
				renderItem={ ({ item }) => <CardGame style={ { flex: 1 / 2 } } item={ item } onPress={ navigateToDetail } /> }
				ItemSeparatorComponent={ () => <View style={ { height: 10 } } /> }
				style={ styles.list }
				columnWrapperStyle={ styles.columnWrapper }
				contentContainerStyle={ { paddingBottom: isKeyboardShown ? 10 : tabBarHeight } }
				numColumns={ 2 }
			/>

			<BottomSheet
				bsRef={ bottomSheetRef }
				bsProps={ { onDismiss: _onFilterDismiss } }
				viewProps={ { style: styles.bottomSheet } }
			>
				<View style={ styles.bsHead }>
					<Text style={ styles.bsTitle }>{ t('discover-page.filter-game') }</Text>
					<Button onPress={ _resetParam } labelStyle={ styles.filterReset }>
						Reset
					</Button>
				</View>

				{ filterSection.includes('type') &&
					<>
						<Text style={ styles.filterSecTitle }>{ t('discover-page.filter-game-type') }</Text>
						<FlatList
							data={ gameTypes }
							keyExtractor={ i => i.name }
							extraData={ [filterType] }
							renderItem={ ({ item }) => <FilterTag
								id={ item.id }
								icon={ item.icon }
								label={ item.name }
								active={ [...filterType].includes(item.name) }
								onClick={ (_id, label) => {
									setFilterType(types => {
										if (types.includes(label)) return [...types.filter(t => t !== label)]
										return [...types, label]
									})
								} }
							/>
							}
							ItemSeparatorComponent={ () => <View style={ { height: scaleHeight(gameTypes.length > 3 ? 8 : 0) } } /> }
							contentContainerStyle={ styles.wrapList }
							showsVerticalScrollIndicator={ false }
						/>
					</>
				}

				{ filterSection.includes('mechanics') &&
					<>
						<Text style={ styles.filterSecTitle }>{ t('discover-page.filter-game-mechanics') }</Text>
						<FlatList
							data={ gameMechanics }
							keyExtractor={ i => i.name }
							extraData={ [filterMechanic] }
							renderItem={ ({ item }) => <FilterTag
								id={ item.id }
								icon={ item.icon }
								label={ item.name }
								active={ [...filterMechanic].includes(item.name) }
								onClick={ (_id, label) => {
									setFilterMechanic(mechs => {
										if (mechs.includes(label)) return [...mechs.filter(t => t !== label)]
										return [...mechs, label]
									})
								}
								}
							/> }
							ItemSeparatorComponent={ () => <View style={ { height: scaleHeight(gameMechanics.length > 3 ? 8 : 0) } } /> }
							contentContainerStyle={ styles.wrapList }
							showsVerticalScrollIndicator={ false }
						/>
					</>
				}

				{ filterSection.includes('location') &&
					<>
						<Text style={ styles.filterSecTitle }>{ t('discover-page.filter-game-location') }</Text>
						<FlatList
							data={ locations }
							keyExtractor={ i => i.name }
							extraData={ [filterLocation] }
							renderItem={ ({ item }) => <FilterTag
								id={ item.id }
								label={ item.name }
								active={ [...filterLocation].includes(item.name) }
								onClick={ (_id, label) => {
									setFilterLocation(locs => {
										if (locs.includes(label)) return [...locs.filter(t => t !== label)]
										return [...locs, label]
									})
								}
								}
							/>
							}
							ItemSeparatorComponent={ () => <View style={ { height: scaleHeight(locations.length > 4 ? 8 : 0) } } /> }
							contentContainerStyle={ styles.wrapList }
							showsVerticalScrollIndicator={ false }
						/>
					</>
				}

				<ActionButton
					style={ styles.filterAction }
					label='Show Result'
					onPress={ () => {
						setApplyFilter(true)
						bottomSheetRef.current?.dismiss()
					} }
				/>
			</BottomSheet>
		</Container>
	)
}

export default withCommon(React.memo(Discover))