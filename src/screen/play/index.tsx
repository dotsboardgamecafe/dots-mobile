import React, { useCallback, useEffect, useState } from 'react'
import { SectionList, type SectionListData, TouchableOpacity, View } from 'react-native'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

import { type NavigationProps } from '../../models/navigation'
import Container from '../../components/container'
import withCommon from '../../hoc/with-common'
import { SearchNormal } from 'iconsax-react-native'
import { scaleHeight, scaleVertical, scaleWidth } from '../../utils/pixel.ratio'
import Text from '../../components/text'
import styles from './styles'
import { useGetListRoomQuery, useGetListTourneyQuery } from '../../store/room'
import { type RoomListParam, type Rooms } from '../../models/rooms'
import Image from '../../components/image'
import TextInput from '../../components/text-input'
import { Button } from 'react-native-paper'

type Props = NavigationProps<'play'>

interface Sections { title: string, data: Array<Partial<Rooms>> }

const Play = ({ theme, navigation, t }: Props): React.ReactNode => {
	const tabBarHeight = useBottomTabBarHeight()
	const [param, setParam] = useState<RoomListParam>({ status: 'active' })
	const { data, refetch, isLoading } = useGetListRoomQuery(param)
	const { data: tourney, refetch: tourneyRefetch } = useGetListTourneyQuery(param)
	const [sections, setSections] = useState<Sections[]>([])
	const [search, setSearch] = useState('')

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

	const updateParam = useCallback((update: Partial<RoomListParam>) => {
		setParam({ ...param, ...update })
	}, [param])

	useEffect(() => {
		const raw = data?.map((r: Rooms) => ({
			room_code: r.room_code,
			room_img_url: r.room_img_url,
			room_type: r.room_type
		})) ?? []
		setSections([
			{ title: t('play-page.tournament'), data: tourney ?? [] },
			{
				title: t('play-page.special-event'),
				data: raw.filter(r => r.room_type === 'special_event')
			},
			{
				title: t('play-page.game-room'),
				data: raw.filter(r => r.room_type === 'normal')
			}
		])
	}, [data, tourney])

	return (
		<Container
			contentStyle={ styles.content }
		>
			<View style={ {
				flexDirection: 'row',
				alignItems: 'center',
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
					onPress={ () => { updateParam({ keyword: search }) } }
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
		</Container>
	)
}

export default withCommon(React.memo(Play))