import React, { useCallback, useMemo, useRef, useState } from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'

import Container from '../../components/container'
import withCommon from '../../hoc/with-common'
import Text from '../../components/text'
import FilterItem from '../../components/filter-item'
import { ArrowDown2 } from 'iconsax-react-native'
import { type NavigationProps } from '../../models/navigation'
import { hofData } from '../champion/data'
import CardHof from '../../components/card-hof'
import { scaleHeight, scaleWidth } from '../../utils/pixel.ratio'
import { type BottomSheetModal } from '@gorhom/bottom-sheet'
import BottomSheetList from '../../components/bottom-sheet-list'
import FilterItemList from '../../components/filter-item-list'
import createStyle from './styles'

type Props = NavigationProps<'hallOfFame'>

const HallOfFame = ({ theme, t }: Props): React.ReactNode => {
	const styles = createStyle(theme)
	const filterRef = useRef<BottomSheetModal>(null)
	const date = new Date()
	const [years, setYears] = useState(Array.from({ length: 5 }, (_, i) => {
		date.setFullYear(date.getFullYear() - 1)
		return {
			name: date.toLocaleDateString('en-us', { year: 'numeric' }),
			selected: i === 0
		}
	}))
	const [year, setYear] = useState(years[0].name)

	const arrowDown = useMemo(() => {
		return (
			<ArrowDown2 variant='Linear'
				color={ theme.colors.onBackground }
				size={ 14 }/>
		)
	}, [])

	const filterHeader = useCallback((title: string, onReset: () => void) => {
		return (
			<View style={ styles.filterHeader }>
				<Text variant='bodyExtraLargeMedium'>{ title }</Text>
				<TouchableOpacity onPress={ onReset }>
					<Text variant='bodyLargeBold' style={ styles.filterReset }>{ t('champion-page.filter-reset') }</Text>
				</TouchableOpacity>
			</View>
		)
	}, [])

	const setFilter = useCallback((label: string) => {
		setYears(years.map(y => ({ ...y, selected: label === y.name })))
		setYear(label)
		filterRef.current?.dismiss()
	}, [years])

	return (
		<Container contentStyle={ { paddingHorizontal: 16 } }>
			<View style={ {
				flexDirection: 'row',
				justifyContent: 'space-between',
				alignItems: 'center',
				marginVertical: 16
			} }>
				<Text variant='headingBold'>{ t('champion-page.hof') }</Text>
				<FilterItem
					label={ year }
					suffix={ arrowDown }
					onPress={ () => filterRef.current?.present() }
				/>
			</View>
			<FlatList
				data={ hofData }
				keyExtractor={ item => item.game.game_code + item.player.user_code }
				renderItem={ ({ item }) => <CardHof { ...item } /> }
				ItemSeparatorComponent={ () => <View style={ { height: 8 } } /> }
				columnWrapperStyle={ { gap: scaleWidth(8) } }
				numColumns={ 2 }
			/>
			<BottomSheetList
				bsRef={ filterRef }
				bsProps={ {
					topInset: scaleHeight(100)
				} }
				listProps={ {
					data: years,
					ListHeaderComponent: filterHeader(
						t('champion-page.filter-year'),
						() => { setFilter(years[0].name) }
					),
					renderItem: ({ item }) => (
						<FilterItemList
							label={ item.name }
							selected={ item.selected }
							onClick={ setFilter }
						/>
					),
					ItemSeparatorComponent: () => <View style={ styles.filterItemSeparator } />,
					stickyHeaderIndices: [0]
				} }
			/>
		</Container>
	)
}

export default withCommon(React.memo(HallOfFame))