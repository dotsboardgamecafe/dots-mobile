import {
	Alert, FlatList, Image, Pressable, ScrollView, TouchableOpacity, View
} from 'react-native'
import React, { Suspense, useCallback, lazy } from 'react'

import Container from '../../components/container'
import styles from './styles'
import { Avatar } from 'react-native-paper'
import { fullWidth, scaleHeight, scaleWidth } from '../../utils/pixel.ratio'
import Text from '../../components/text'
import IconReceipt from '../../assets/svg/receipt.svg'
import IconNotification from '../../assets/svg/notification.svg'
import withCommon from '../../hoc/with-common'
import { type NavigationProps } from '../../models/navigation'
import { TabActions } from '@react-navigation/native'

type Props = NavigationProps<'home'>

const LazyBannerTier = lazy(async() => await import('../../components/banner-tier'))

const activitiesHightlight = [
	{
		image: 'https://cf.geekdo-images.com/dT1vJbUizZFmJAphKg-byA__itemrep/img/pu4eSfZNzf3r7B-7pES03cfFROY=/fit-in/246x300/filters:strip_icc()/pic7720813.png',
		latestUpdate: '10 minutes ago',
		description: 'drevka played RISING SUN for the first time and eared 140VP',
		title: 'RISING SUN'
	},
	{
		image: 'https://cf.geekdo-images.com/dT1vJbUizZFmJAphKg-byA__itemrep/img/pu4eSfZNzf3r7B-7pES03cfFROY=/fit-in/246x300/filters:strip_icc()/pic7720813.png',
		latestUpdate: '10 minutes ago',
		description: 'drevka played RISING SUN for the first time and eared 140VP',
		title: 'RISING SUN'
	},
	{
		image: 'https://cf.geekdo-images.com/dT1vJbUizZFmJAphKg-byA__itemrep/img/pu4eSfZNzf3r7B-7pES03cfFROY=/fit-in/246x300/filters:strip_icc()/pic7720813.png',
		latestUpdate: '10 minutes ago',
		description: 'drevka played RISING SUN for the first time and eared 140VP',
		title: 'RISING SUN'
	},
	{
		image: 'https://cf.geekdo-images.com/dT1vJbUizZFmJAphKg-byA__itemrep/img/pu4eSfZNzf3r7B-7pES03cfFROY=/fit-in/246x300/filters:strip_icc()/pic7720813.png',
		latestUpdate: '10 minutes ago',
		description: 'drevka played RISING SUN for the first time and eared 140VP',
		title: 'RISING SUN'
	},
	{
		image: 'https://cf.geekdo-images.com/dT1vJbUizZFmJAphKg-byA__itemrep/img/pu4eSfZNzf3r7B-7pES03cfFROY=/fit-in/246x300/filters:strip_icc()/pic7720813.png',
		latestUpdate: '10 minutes ago',
		description: 'drevka played RISING SUN for the first time and eared 140VP',
		title: 'RISING SUN'
	}
]

const textFormatter = (text:string, target:string): React.ReactNode => {
	const newText = text.split(`${target}`)
	newText.splice(1, 0, target)

	return newText.map((item, index) => {
		if (item === target) {
			return (
				<Pressable key={ index } onPress={ () => { Alert.alert(target) } }>
					<Text style={ styles.hightLightDescriptionStyle } key={ index } variant='bodyLargeDemi'>{ item }</Text>
				</Pressable>
			)
		}
		
		return <Text key={ index } variant='paragraphMiddleRegular'>{ item }</Text>
	})
}

const getGreetingMessage = (): string => {
	const currentTime = new Date()
	const currentHour = currentTime.getHours()

	let greeting

	if (currentHour < 12) {
		greeting = 'Good morning!'
	} else if (currentHour < 18) {
		greeting = 'Good afternoon!'
	} else {
		greeting = 'Good evening!'
	}

	return greeting
}

const Home = ({ navigation, t }:Props): React.ReactNode => {

	const navigateToProfile = useCallback(() => {
		const jumpAction = TabActions.jumpTo('Profil')
		navigation.dispatch(jumpAction)
	}, [])

	const renderHeader = useCallback(() => {
		return (
			<View style={ [styles.sectionWrapperStyle, styles.headerWrapperStyle] }>
				<View style={ styles.avatarWrapperStyle }>
					<TouchableOpacity onPress={ navigateToProfile }>
						<Avatar.Image size={ scaleWidth(48) } source={ require('../../assets/images/game-bg/game-img-bg.png') }/>
					</TouchableOpacity>
					<View style={ styles.greetingWrapperStyle }>
						<Text style={ styles.greetingTextStyle } variant='bodySmallRegular'>{ getGreetingMessage() } 👋</Text>
						<TouchableOpacity onPress={ navigateToProfile }>
							<Text variant='bodyLargeDemi'>Olivia Ainsley</Text>
						</TouchableOpacity>
					</View>
				</View>
				<View style={ styles.rightHeaderWrapperStyle }>
					<Pressable style={ styles.iconWrapperStyle }>
						<IconReceipt/>
					</Pressable>
					<Pressable style={ styles.iconWrapperStyle }>
						<IconNotification/>
						<View style={ styles.badgeStyle }>
							<Text style={ styles.badgeTextStyle } variant='bodyDoubleExtraSmallRegular'>12</Text>
						</View>
					</Pressable>
				</View>
			</View>
		)
	}, [])
	
	const renderTier = useCallback(() => {
		return (
			<Pressable
				onPress={ () => { navigation.navigate('tier') } }
				style={ [styles.sectionWrapperStyle, styles.tierWrapperStyle] }>
				<Suspense fallback={ <View/> }>
					<LazyBannerTier screen='home' style={ styles.starFieldStyle }/>
				</Suspense>
			</Pressable>
		)
	}, [navigation])

	const renderGame = useCallback(() => {
		return (
			<Pressable onPress={ () => { Alert.alert('ok') } }>
				<Image
					width={ fullWidth }
					height={ scaleHeight(180) }
					resizeMode='cover'
					source={ { uri: 'https://cf.geekdo-images.com/dT1vJbUizZFmJAphKg-byA__opengraph/img/Y6XRS8qo8oR5g7p_PUAz8qqjIY4=/0x447:960x951/fit-in/1200x630/filters:strip_icc()/pic7720813.png' } }
				/>
			</Pressable>
		)
	}, [])

	const renderListGame = useCallback(() => {
		return (
			<View style={ [styles.sectionWrapperStyle, styles.listGameWrapperStyle] }>
				<Text variant='bodyDoubleExtraLargeBold'>{ t('home-page.activities-title') }</Text>
				<FlatList
					data={ activitiesHightlight }
					style={ styles.listGameStyle }
					scrollEnabled={ false }
					renderItem={ ({ item }) => {
						return (
							<View style={ styles.gameItemWrapperStyle }>
								<Pressable onPress={ () => { Alert.alert('image') } }>
									<Image
										source={ { uri: item.image } }
										style={ styles.imageGameStyle }
									/>
								</Pressable>
								<View style={ styles.gameDescriptionWrapperStyle }>
									<Text style={ styles.gameLatestUpdateLabelStyle } variant='bodySmallRegular'>{ item.latestUpdate }</Text>
									<View style={ [styles.gameDescriptionWrapperStyle, styles.gameDescriptionLabelStyle] }>
										{ textFormatter(item.description, item.title) }
									</View>
								</View>
							</View>
						)
					} }
					keyExtractor={ (_, index) => index.toString() }
					ItemSeparatorComponent={ () => <View style={ styles.listGameSeparatorStyle }/> }
				/>
			</View>
		)
	}, [])

	return (
		<Container contentStyle={ styles.contentStyle }>
			<ScrollView
				showsVerticalScrollIndicator={ false }
				contentContainerStyle={ styles.scrollContentStyle }
				bounces={ false }>
				{ renderHeader() }
				{ renderTier() }
				{ renderGame() }
				{ renderListGame() }
			</ScrollView>
		</Container>
	)
}

export default withCommon(React.memo(Home))