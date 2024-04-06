import React, { useCallback, useMemo, useRef, useState } from 'react'
import { Button, Text } from 'react-native-paper'
import { FlatList, View } from 'react-native'
import { ArrowDown2, SearchNormal, Setting4 } from 'iconsax-react-native'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { BottomSheetBackdrop, type BottomSheetBackdropProps, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'

import Container from '../../components/container'
import FilterItem from '../../components/filter-item'
import CardGame from '../../components/card-game'
import TextInput from '../../components/text-input'
import { scaleHeight, scaleWidth } from '../../utils/pixel.ratio'
import { createStyle } from './styles'
import { useKeyboardShown } from '../../utils/keyboard'
import { type FilterItemType } from '../../components/filter-item/type'
import { gameTypes, games } from './data'
import FilterTag from '../../components/filter-tag'
import ActionButton from '../../components/action-button'
import withCommon from '../../hoc/with-common'
import { type NavigationProps } from '../../models/navigation'

type Props = NavigationProps<'discover'>

const Discover = ({ theme, t, navigation }: Props): React.ReactNode => {
	const styles = useMemo(() => createStyle(theme), [theme])
	const tabBarHeight = useBottomTabBarHeight()
	const isKeyboardShown = useKeyboardShown()
	const [search, setSearch] = useState('')
	const bottomSheetRef = useRef<BottomSheetModal>(null)
	const bottomSheetBackdrop = useCallback(
		(props: BottomSheetBackdropProps) => (
			<BottomSheetBackdrop
				{ ...props }
				opacity={ .5 }
				disappearsOnIndex={ -1 }
				appearsOnIndex={ 0 }
			/>
		),
		[]
	)

	const [selectedGameType, setSelectedGameType] = useState<number[]>([])
	const switchSelected = useCallback((id: number) => {
		if (selectedGameType.includes(id)) {
			setSelectedGameType(selectedGameType.filter(i => i != id))
		} else {
			setSelectedGameType([...selectedGameType, id])
		}
	}, [selectedGameType])

	const arrowDown = <ArrowDown2
		variant='Linear'
		color={ theme.colors.onBackground }
		size={ 14 }
		style={ { marginStart: 4 } }
	/>
	const filters: FilterItemType[] = [
		{ label: t('discover-page.filter-game-type'), suffix: arrowDown },
		{ label: t('discover-page.filter-game-mechanics'), suffix: arrowDown },
		{ label: t('discover-page.filter-game-location'), suffix: arrowDown },
		{ label: 'duration', suffix: arrowDown },
	]

	return (
		<Container>
			<TextInput
				containerStyle={ {
					marginHorizontal: scaleWidth(10),
					marginTop: scaleHeight(16),
				} }
				prefix={ <SearchNormal size={ scaleWidth(16) } color={ theme.colors.gray } /> }
				inputProps={ {
					placeholder: t('discover-page.search-game'),
					placeholderTextColor: theme.colors.gray,
					enterKeyHint: 'search',
					value: search,
					onChangeText: setSearch
				} }
			/>

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
						// bottomSheetRef.current?.present()
						navigation.navigate('webview', {
							link: 'https://checkout-staging.xendit.co/web/6611c674c3e7b9c2a2e71a19'
						})
					} }
				/>

				<FlatList
					horizontal
					data={ filters }
					renderItem={ ({ item }) => <FilterItem { ...item } /> }
					ItemSeparatorComponent={ () => <View style={ { width: 8 } } /> }
					contentContainerStyle={ { paddingHorizontal: 10 } }
				/>
			</View>

			<FlatList
				data={ games }
				keyExtractor={ item => item.game_code }
				renderItem={ ({ item }) => <CardGame { ...item } /> }
				ItemSeparatorComponent={ () => <View style={ { height: 10 } } /> }
				style={ styles.list }
				columnWrapperStyle={ styles.columnWrapper }
				contentContainerStyle={ { paddingBottom: isKeyboardShown ? 10 : tabBarHeight } }
				numColumns={ 2 }
			/>

			<BottomSheetModal
				ref={ bottomSheetRef }
				index={ 0 }
				enablePanDownToClose
				enableDynamicSizing
				backdropComponent={ bottomSheetBackdrop }
				handleIndicatorStyle={ { display: 'none' } }
			>
				<BottomSheetView style={ styles.bottomSheet }>

					<View style={ styles.bsHead }>
						<Text style={ styles.bsTitle }>{ t('discover-page.filter-game') }</Text>
						<Button
							onPress={ () => { } }
							labelStyle={ styles.filterReset }
						>
              Reset
						</Button>
					</View>

					<Text style={ styles.filterSecTitle }>{ t('discover-page.filter-game-type') }</Text>

					<FlatList
						data={ gameTypes }
						extraData={ selectedGameType }
						renderItem={ ({ item }) => <FilterTag
							id={ item.id }
							icon={ item.icon }
							label={ item.name }
							active={ selectedGameType.includes(item.id) }
							onClick={ switchSelected }
						/>
						}
						ItemSeparatorComponent={ () => <View style={ { height: scaleHeight(8) } } /> }
						contentContainerStyle={ styles.wrapList }
					/>

					<Text style={ styles.filterSecTitle }>{ t('discover-page.filter-game-mechanics') }</Text>

					<FlatList
						data={ gameTypes }
						extraData={ selectedGameType }
						renderItem={ ({ item }) => <FilterTag
							id={ item.id }
							icon={ item.icon }
							label={ item.name }
							active={ selectedGameType.includes(item.id) }
							onClick={ switchSelected }
						/>
						}
						ItemSeparatorComponent={ () => <View style={ { height: scaleHeight(8) } } /> }
						contentContainerStyle={ styles.wrapList }
					/>

					<Text style={ styles.filterSecTitle }>{ t('discover-page.filter-game-location') }</Text>

					<FlatList
						data={ gameTypes }
						extraData={ selectedGameType }
						renderItem={ ({ item }) => <FilterTag
							id={ item.id }
							label={ item.name }
							active={ selectedGameType.includes(item.id) }
							onClick={ switchSelected }
						/>
						}
						ItemSeparatorComponent={ () => <View style={ { height: scaleHeight(8) } } /> }
						contentContainerStyle={ styles.wrapList }
					/>

					<ActionButton
						style={ styles.filterAction }
						label='Show 56 result'
						onPress={ () => bottomSheetRef.current?.dismiss() }
					/>

				</BottomSheetView>
			</BottomSheetModal>
		</Container>
	)
}

export default withCommon(React.memo(Discover))