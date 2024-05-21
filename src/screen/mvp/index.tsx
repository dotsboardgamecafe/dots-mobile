import React, { useCallback, useMemo, useRef, useState } from 'react'
import {
	Image, View,
	FlatList,
	TouchableOpacity
} from 'react-native'
import { type BottomSheetModal } from '@gorhom/bottom-sheet'

import Container from '../../components/container'
import { scaleHeight, scaleVertical, scaleWidth } from '../../utils/pixel.ratio'
import { type NavigationProps } from '../../models/navigation'
import Text from '../../components/text'
import Medal1 from '../../assets/svg/Medal1.svg'
import Medal2 from '../../assets/svg/Medal2.svg'
import Medal3 from '../../assets/svg/Medal3.svg'
import VP from '../../assets/svg/VP.svg'
import withCommon from '../../hoc/with-common'
import Blush from '../../components/blush'
import MvpDetailItem from '../../components/mvp-detail-item'
import createStyle from './styles'
import FilterItem from '../../components/filter-item'
import { ArrowDown2 } from 'iconsax-react-native'
import BottomSheetList from '../../components/bottom-sheet-list'
import FilterItemList from '../../components/filter-item-list'
import { useGetMonthlyTopAchieverQuery } from '../../store/champion'
import { type MostVPParam, type MostVP } from '../../models/champions'

type Props = NavigationProps<'mvp'>

const MVP = ({ theme, route, t }: Props): React.ReactNode => {
	const styles = createStyle(theme)
	const date = new Date()
	const { unique } = route.params
	const filterLocRef = useRef<BottomSheetModal>(null)
	const filterMonthRef = useRef<BottomSheetModal>(null)
	const [locations, setLocations] = useState([
		{ name: 'All Location', selected: true },
		{ name: 'Jakarta', selected: false },
		{ name: 'Bandung', selected: false },
	])
	const [location, setLocation] = useState('All Location')
	const [param, setParam] = useState<MostVPParam>({
		category: unique ? 'unique_game' : 'vp',
		month: date.getMonth(),
		year: date.getFullYear(),
	})
	const [months, setMonths] = useState(Array.from({ length: 6 }, (_, i) => {
		date.setDate(0)
		return {
			name: date.toLocaleDateString('en-us', { month: 'long', year: 'numeric' }),
			selected: i === 0
		}
	}))
	const [month, setMonth] = useState(months[0].name)
	const { data } = useGetMonthlyTopAchieverQuery(param)

	const _arrowDown = useMemo(() => {
		return (
			<ArrowDown2 variant='Linear'
				color={ theme.colors.onBackground }
				size={ 14 }/>
		)
	}, [])

	const _topRank = useCallback((item: MostVP) => {
		let imgSize = scaleWidth(42)
		let paddingBottom = 0
		let borderColor = '#DCA16A'
		let medalSize = scaleWidth(24)
		let medal = <Medal3 width={ medalSize } style={ styles.medal }/>

		if (item.rank === 1) {
			paddingBottom = scaleVertical(24)
			imgSize = scaleWidth(82)
			borderColor = '#FFBB0D'
			medalSize = scaleWidth(32)
			medal = <Medal1 width={ medalSize } style={ styles.medal }/>
		}
		
		if (item.rank === 2) {
			paddingBottom = scaleVertical(8)
			imgSize = scaleWidth(62)
			borderColor = '#BCCCD2'
			medal = <Medal2 width={ medalSize } style={ styles.medal }/>
		}

		return (
			<View style={ [styles.topPlayer, { paddingBottom }] }>
				<View>
					<Image
						source={ { uri: item.user_img_url ?? `https://picsum.photos/${imgSize}` } }
						resizeMode='cover'
						style={ [styles.topPlayerImg, {
							width: imgSize,
							borderRadius: imgSize * .5,
							borderWidth: scaleWidth(3),
							borderColor
						}] }
					/>
					{ medal }
				</View>
				<Text variant='bodyMiddleMedium' style={ styles.topPlayerName }>{ item.user_name }</Text>
				<View style={ styles.row }>
					<Text variant='bodySmallMedium' style={ styles.vpLabel }>{ unique ? item.total_game_played : item.total_point }</Text>
					{ !unique && <VP width={ scaleWidth(14) } style={ styles.vp } /> }
				</View>
			</View>
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

	const _setLoc = useCallback((label: string) => {
		setLocations(locations.map(loc => ({ ...loc, selected: label === loc.name })))
		setLocation(label)
		setParam({ ...param, cafe_city: label.toLowerCase() === 'all location' ? '' :  label.toLowerCase() })
		filterLocRef.current?.dismiss()
	}, [locations, param])

	const _setMon = useCallback((label: string) => {
		setMonths(months.map(loc => ({ ...loc, selected: label === loc.name })))
		setMonth(label)
		filterMonthRef.current?.dismiss()
	}, [months])

	return (
		<Container barStyle='light-content' contentStyle={ styles.container }>
			<View style={ [styles.header, unique && { backgroundColor: '#90352F' }] }>
				<Blush
					color={ unique ? '#F00793' : '#EE1872' }
					distance={ 300 }
					opacity={ .5 }
					style={ styles.blush1 }
				 />
				<Blush
					color={ unique ? '#F18725' : '#15D1FB' }
					distance={ 200 }
					opacity={ .5 }
					style={ styles.blush2 }
				 />
				<Text variant='headingBold' style={ styles.title }>{ unique ? t('champion-page.unique') : t('champion-page.mvp') }</Text>
				<View style={ styles.topRank }>
					{ data && data?.length >= 3 ? _topRank(data[2]) : <View style={ styles.topPlayer } /> }
					{ data?.length ? _topRank(data[0]) : <View style={ styles.topPlayer } /> }
					{ data && data?.length >= 2 ? _topRank(data[1]) : <View style={ styles.topPlayer } /> }
				</View>
			</View>
			<View style={ styles.listHeaderBg }>
				<View style={ styles.listHeader }>
					<FilterItem
						label={ location }
						suffix={ _arrowDown }
						style={ styles.filter }
						onPress={ () => filterLocRef.current?.present() }
					/>
					<FilterItem
						label={ month }
						suffix={ _arrowDown }
						style={ styles.filter }
						onPress={ () => filterMonthRef.current?.present() }
					/>
				</View>
			</View>
			<FlatList
				data={ data?.slice(3) }
				keyExtractor={ (item, index) => `${item.rank}.${item.user_name}.${index}` }
				renderItem={ ({ item, index }) => <MvpDetailItem item={ item } index={ index + 3 } showVP={ !unique } /> }
				showsVerticalScrollIndicator={ false }
				contentContainerStyle={ styles.listContent }
				ItemSeparatorComponent={ () => <View style={ styles.listSeparator } /> }
			/>
			<BottomSheetList
				bsRef={ filterLocRef }
				bsProps={ {
					topInset: scaleHeight(100)
				} }
				listProps={ {
					data: locations,
					ListHeaderComponent: filterHeader(
						t('champion-page.filter-loc'),
						() => { _setLoc('Jakarta') }
					),
					renderItem: ({ item }) => (<FilterItemList label={ item.name } selected={ item.selected } onClick={ _setLoc } />),
					ItemSeparatorComponent: () => <View style={ styles.filterItemSeparator } />,
					stickyHeaderIndices: [0]
				} }
			/>
			<BottomSheetList
				bsRef={ filterMonthRef }
				bsProps={ {
					topInset: scaleHeight(100)
				} }
				listProps={ {
					data: months,
					ListHeaderComponent: filterHeader(
						t('champion-page.filter-month'),
						() => { _setMon(months[0].name) }
					),
					renderItem: ({ item }) => (<FilterItemList label={ item.name } selected={ item.selected } onClick={ _setMon } />),
					ItemSeparatorComponent: () => <View style={ styles.filterItemSeparator } />,
					stickyHeaderIndices: [0]
				} }
			/>
		</Container>
	)
}

export default withCommon(React.memo(MVP))