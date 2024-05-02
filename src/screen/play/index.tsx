import React, { useCallback, useEffect, useState } from 'react'
import { SectionList, type SectionListData, TouchableOpacity, View } from 'react-native'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

import { type NavigationProps } from '../../models/navigation'
import Container from '../../components/container'
import withCommon from '../../hoc/with-common'
import FilterItem from '../../components/filter-item'
import { ArrowDown2, Location } from 'iconsax-react-native'
import { scaleVertical, scaleWidth } from '../../utils/pixel.ratio'
import Text from '../../components/text'
import styles from './styles'
import { useGetListRoomQuery, useGetListTourneyQuery } from '../../store/room'
import { type Rooms } from '../../models/rooms'
import Image from '../../components/image'

type Props = NavigationProps<'play'>

interface Sections { title: string, data: Array<Partial<Rooms>> }

const Play = ({ theme, navigation, t }: Props): React.ReactNode => {
	const tabBarHeight = useBottomTabBarHeight()
	const { data } = useGetListRoomQuery()
	const { data: tourney } = useGetListTourneyQuery()
	const [sections, setSections] = useState<Sections[]>([])

	const sectionFooter = useCallback((info: {section: SectionListData<Partial<Rooms>, Sections>}) => {
		return (
			<View style={ styles.sectionFooter }>
				{ !info.section.data.length && <Text variant='bodySmallMedium'>Data not found</Text> }
			</View>
		)
	}, [])

	useEffect(() => {
		const raw = data?.map((r: Rooms) => ({
			room_code: r.room_code,
			room_img_url: r.room_img_url,
			room_type: r.room_type
		})) ?? []
		setSections([
			{ title: t('play-page.tournament'), data: tourney ?? [] },
			{ title: t('play-page.special-event'), data: raw.filter(r => r.room_type === 'special_event') },
			{ title: t('play-page.game-room'), data: raw.filter(r => r.room_type === 'normal') },
		])
	}, [data, tourney])

	return (
		<Container
			contentStyle={ styles.content }
		>
			<FilterItem
				label='All location'
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
			/>
			<SectionList
				sections={ sections }
				keyExtractor={ (item, index) => (item.room_code ?? '') + index }
				renderItem={ ({ item }) => (
					<TouchableOpacity onPress={ () => {
						navigation.navigate('roomDetail', item)
					} }
					>
						<Image
							source={ { uri: 'https://picsum.photos/300/100?grayscale' } }
							// source={ { uri: item.room_img_url } }
							style={ styles.item }
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
		</Container>
	)
}

export default withCommon(React.memo(Play))