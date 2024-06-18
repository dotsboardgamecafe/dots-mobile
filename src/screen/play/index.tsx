import React, { useCallback, useEffect, useRef, useState } from 'react'
import { SectionList, type SectionListData, TouchableOpacity, View } from 'react-native'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { type BottomSheetModal } from '@gorhom/bottom-sheet'

import { type NavigationProps } from '../../models/navigation'
import Container from '../../components/container'
import withCommon from '../../hoc/with-common'
import { ArrowDown2, Location } from 'iconsax-react-native'
import { scaleHeight, scaleVertical, scaleWidth } from '../../utils/pixel.ratio'
import Text from '../../components/text'
import styles from './styles'
import { useGetListRoomQuery, useGetListTourneyQuery } from '../../store/room'
import { type RoomListParam, type Rooms } from '../../models/rooms'
import Image from '../../components/image'
import FilterItem from '../../components/filter-item'
import BottomSheetList from '../../components/bottom-sheet-list'
import FilterItemList from '../../components/filter-item-list'

type Props = NavigationProps<'play'>

interface Sections { title: string, data: Array<Partial<Rooms>> }

const Play = ({ theme, navigation, t }: Props): React.ReactNode => {
	const tabBarHeight = useBottomTabBarHeight()
	const [param, setParam] = useState<RoomListParam>({ status: 'active' })
	const { data, refetch, isLoading } = useGetListRoomQuery(param)
	const { data: tourney, refetch: tourneyRefetch } = useGetListTourneyQuery(param)
	const [sections, setSections] = useState<Sections[]>([])
	const filterLocRef = useRef<BottomSheetModal>(null)
	const [location, setLocation] = useState('All Location')
	const [locations, setLocations] = useState([
		{ name: 'All Location', selected: true },
		{ name: 'Jakarta', selected: false },
		{ name: 'Bandung', selected: false },
	])
	const sectionFooter = useCallback((info: {section: SectionListData<Partial<Rooms>, Sections>}) => {
		return (
			<View style={ styles.sectionFooter }>
				{ !info.section.data.length && <Text variant='bodySmallMedium'>Data not found</Text> }
			</View>
		)
	}, [])

	const refresh = useCallback(() => {
		refetch()
		tourneyRefetch()
	}, [])

	const setLoc = useCallback((label: string) => {
		setLocations(locations.map(loc => ({ ...loc, selected: label === loc.name })))
		setLocation(label)
		setParam({ ...param, location: label === 'All Location' ? '' : label })
		filterLocRef.current?.dismiss()
	}, [locations, param])

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

	useEffect(() => {
		const raw = data?.map((r: Rooms) => ({
			room_code: r.room_code,
			room_img_url: r.room_img_url,
			room_type: r.room_type
		})) ?? []

		const sections: Sections[] = []

		tourney && sections.push({ title: t('play-page.tournament'), data: tourney })

		const events = raw.filter(r => r.room_type === 'special_event')
		events.length && sections.push({ title: t('play-page.special-event'), data: events })

		const rooms = raw.filter(r => r.room_type === 'normal')
		rooms.length && sections.push({ title: t('play-page.game-room'), data: rooms })

		setSections(sections)
	}, [data, tourney])

	return (
		<Container
			contentStyle={ styles.content }
		>
			<FilterItem
				label={ location }
				prefix={
					<Location
						size={ scaleWidth(14) }
						variant='Bold'
						color={ theme.colors.onBackground }
						style={ styles.filterPrefix }
					/>
				}
				suffix={
					<ArrowDown2
						variant='Linear'
						color={ theme.colors.onBackground }
						size={ 14 }
						style={ styles.filterSuffix }
					/>
				}
				style={ styles.filter }
				onPress={ filterLocRef.current?.present }
			/>
			<SectionList
				sections={ sections }
				refreshing={ isLoading }
				onRefresh={ refresh }
				keyExtractor={ (item, index) => (item.room_code ?? '') + index }
				renderItem={ ({ item }) => (
					<TouchableOpacity onPress={ () => {
						navigation.navigate('roomDetail', item)
					} }
					>
						<Image
							source={ { uri: item.room_code ? item.room_img_url : item.image_url } }
							style={ styles.item }
							keepRatio
						/>
					</TouchableOpacity>
				) }
				renderSectionHeader={ ({ section: { title } }) => (
					<Text variant='headingBold' style={ styles.section }>{ title }</Text>
				) }
				renderSectionFooter={ sectionFooter }
				ItemSeparatorComponent={ () => <View style={ styles.itemSeparator } /> }
				contentContainerStyle={ { paddingBottom: tabBarHeight } }
				style={ { marginTop: scaleVertical(8) } }
				showsVerticalScrollIndicator={ false }
				stickySectionHeadersEnabled={ false }
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
						() => { setLoc('Jakarta') }
					),
					renderItem: ({ item }) => (<FilterItemList label={ item.name } selected={ item.selected } onClick={ setLoc } />),
					ItemSeparatorComponent: () => <View style={ styles.filterItemSeparator } />,
					stickyHeaderIndices: [0]
				} }
			/>
		</Container>
	)
}

export default withCommon(React.memo(Play))