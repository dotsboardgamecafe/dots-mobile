import React from 'react'
import { type NavigationProps } from '../../models/navigation'
import Container from '../../components/container'
import withCommon from '../../hoc/with-common'
import FilterItem from '../../components/filter-item'
import { ArrowDown2, Location } from 'iconsax-react-native'
import { scaleVertical, scaleWidth } from '../../utils/pixel.ratio'
import { Image, SectionList, TouchableOpacity, View } from 'react-native'
import { sections } from './data'
import Text from '../../components/text'
import styles from './styles'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

type Props = NavigationProps<'play'>

const Play = ({ theme, navigation }: Props): React.ReactNode => {
	const tabBarHeight = useBottomTabBarHeight()
	return (
		<Container
			contentStyle={ { paddingVertical: scaleVertical(16) } }
		>
			<FilterItem
				label='All location'
				prefix={
					<Location
						size={ scaleWidth(14) }
						variant='Bold'
						color={ theme.colors.onBackground }
						style={ { marginEnd: 4 } }
					/>
				}
				suffix={
					<ArrowDown2
						variant='Linear'
						color={ theme.colors.onBackground }
						size={ 14 }
						style={ { marginStart: 4 } }
					/>
				}
				style={ [styles.filter, styles.mh] }
			/>

			<SectionList
				sections={ sections }
				keyExtractor={ (item, index) => item.type + index }
				renderItem={ ({ item }) => (
					<TouchableOpacity onPress={ () => {
						navigation.navigate('roomDetail', { type: item.type })
					} }
					>
						<Image
							source={ { uri: item.img } }
							style={ styles.item }
						/>
					</TouchableOpacity>
				) }
				renderSectionHeader={ ({ section: { title } }) => (
					<Text variant='bodyExtraLargeHeavy' style={ styles.section }>{ title }</Text>
				) }
				renderSectionFooter={ () => <View style={ styles.sectionFooter } /> }
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