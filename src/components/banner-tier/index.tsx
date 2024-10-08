import { View, Animated, TouchableOpacity } from 'react-native'
import React, {
	useEffect, lazy, Suspense, useCallback,
	useMemo,
} from 'react'
import { scaleHeight, scaleWidth } from '../../utils/pixel.ratio'
import { colorsTheme } from '../../constants/theme'
import Text from '../text'
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient'
import VPIcon from '../../assets/svg/VP.svg'
import PencilIcon from '../../assets/svg/pencil.svg'
import TripleDotsIcon from '../../assets/svg/triple-dots.svg'
import { Avatar } from 'react-native-paper'
import { type StyleProps } from 'react-native-reanimated'
import { useTranslation } from 'react-i18next'
import { type NavigationProp, useNavigation } from '@react-navigation/native'
import { type RootStackParamList } from '../../models/navigation'
import { type UserProfile } from '../../models/user'
import Header from '../header'

const LazyStarsField = lazy(async() => await import('../stars-field'))

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient)

interface Props {
  style?: StyleProps,
	starsFieldContentStyle?:StyleProps,
	screen: 'home' | 'tier' | 'profile',
	onPressTripleDot?: (() => void) | undefined;
	userProfileData?: UserProfile,
	onPressChangeAvatar?: (() => void) | undefined;
	selectedImage?: string
}

const defaultDevide = 1.5

const getPercentage = (userProfile?: UserProfile): number => {
	if (userProfile) {
		const { tier_range_point } = userProfile
		const { min_point, max_point } = tier_range_point
		let value = userProfile.latest_point

		if (value < min_point) {
			value = min_point
		} else if (value > max_point) {
			value = max_point
		}

		const percentage = ((value - min_point) / (max_point - min_point)) * 100
		
		return percentage - defaultDevide
	}

	return 0
}

const BannerTier = ({
	style, starsFieldContentStyle, screen, onPressTripleDot, userProfileData, onPressChangeAvatar, selectedImage
}: Props): React.ReactNode => {

	const { t } = useTranslation()
	const navigation: NavigationProp<RootStackParamList> = useNavigation()

	const animatedValue = new Animated.Value(0)

	const interpolatedValue = useMemo(() => {
		return animatedValue.interpolate({
			inputRange: [0, 100],
			outputRange: ['0%', '100%']
		})
	}, [userProfileData])

	const _handlePressTierProfile = useCallback(() => {
		navigation.navigate('tier')
	}, [navigation])

	useEffect(() => {
		Animated.timing(animatedValue, {
			toValue: getPercentage(userProfileData),
			useNativeDriver: false,
			duration: 1500
		}).start()
		return () => {
			animatedValue.stopAnimation()
		 }
	}, [userProfileData, selectedImage])

	const _renderTopContent = useMemo(() => {
		return (
			<View>
				{
					screen === 'tier' ?
						<Header
							title={ t('components.banner-tier.tier', { tier: userProfileData?.latest_tier }) }
							onPressBack={ () => { navigation.goBack() } }
							titleStyle={ styles.headerTitleStyle }
							arrowColor={ colorsTheme.lightWhite }
							style={ styles.headerStyle }
						/>
						: null
				}
				<View style={ styles.starsFieldTopContentStyle }>
					{
						screen === 'profile' ?
							<View style={ styles.avatarUserWrapperStyle }>
								<View>
									<View style={ styles.imageBorderStyle }>
										<Avatar.Image style={ styles.avatarStyle } size={ scaleWidth(62) } source={ { uri: selectedImage ?? userProfileData?.image_url } }/>
									</View>
									<TouchableOpacity style={ [styles.iconPencilWrapperStyle, styles.imageBorderStyle] } onPress={ onPressChangeAvatar }>
										<PencilIcon/>
									</TouchableOpacity>
								</View>
								<View style={ styles.avatarUsernameWrapperStyle }>
									<Text style={ [styles.textStyle, styles.tierUsernameSpaceStyle] } variant='bodyLargeBold'>{ userProfileData?.fullname }</Text>
									<Text style={ styles.textStyle } variant='bodyExtraSmallRegular'>{ t('components.banner-tier.joined-date', { since: userProfileData?.member_since }) }</Text>
								</View>
							</View> :
							<View style={ styles.topContentWrapperStyle(screen === 'tier') }>
								{
									screen !== 'tier' ?
										<Text
											style={ styles.textStyle } variant={ screen === 'home' ? 'bodySmallBold' : 'bodyMiddleBold' }>
											{ t('components.banner-tier.tier', { tier: userProfileData?.latest_tier }) }
										</Text>
										:
										null
								}
				 			{ screen === 'tier' ?
									<Text style={ [styles.textStyle, styles.tierUsernameSpaceStyle] } variant='bodyMiddleRegular'>{ userProfileData?.fullname }</Text> :
						 		null
								}
							</View>
					}
					<View style={ styles.topContentWrapperStyle(screen === 'tier') }>
						{
							screen === 'tier' ?
								<View style={ styles.imageBorderStyle } >
									<Avatar.Image style={ styles.avatarStyle } size={ scaleWidth(48) } source={ { uri: selectedImage ?? userProfileData?.image_url } }/>
								</View> :
								screen === 'profile' ?
									<TouchableOpacity style={ styles.tripleDotsWrapperStyle } onPress={ onPressTripleDot }>
										<View style={ styles.tripeDotsIconWrapperStyle } />
										<TripleDotsIcon style={ styles.tripeDotsIconStyle }/>
									</TouchableOpacity> :
									<Text style={ styles.textStyle } variant='bodyExtraSmallRegular'>{ t('components.banner-tier.joined-date', { since: userProfileData?.member_since }) }</Text>
				 	}
					</View>
				</View>
			</View>
		)
	}, [screen, onPressTripleDot, userProfileData, onPressChangeAvatar, selectedImage])

	const _renderBottomContent = useMemo(() => {
		return (
			<View style={ styles.starsFieldContentStyle }>
				<View style={ [styles.starsFieldMidContentStyle, styles.profileBottomWrapperStyle] }>
					<View style={ styles.starsFieldMidContentStyle }>
						<Text style={ [styles.textStyle, styles.pointStyle] } variant={ screen === 'home' ? 'bodyMiddleBold' : 'bodyLargeBold' }>{ userProfileData?.latest_point }</Text>
						<VPIcon width={ scaleWidth(screen === 'home' ? 20 : 26) } height={ scaleHeight(screen === 'home' ? 20 : 26) }/>
					</View>
					{
						screen === 'profile' ?
							<TouchableOpacity onPress={ _handlePressTierProfile }>
								<Text style={ styles.textStyle } variant='bodyMiddleBold'>{ t('components.banner-tier.tier', { tier: userProfileData?.latest_tier }) }</Text>
							</TouchableOpacity> :
							null
					}
				</View>
				<View style={ styles.rangeWrapperStyle }>
					<View style={ styles.neonWrapperStyle(screen === 'home') } />
					<AnimatedLinearGradient
						colors={ [colorsTheme.blueAccent, colorsTheme.yellowAccent, colorsTheme.redAccent] }
						start={ { x: 0, y: 0 } }
						end={ { x: 1, y: 0 } }
						style={ [
							styles.neonGradientStyle(screen === 'home'),
							{
								width: interpolatedValue
							}
						] }
					>
						<View style={ styles.neonLineStyle(screen === 'home') }/>
					</AnimatedLinearGradient>
				</View>
				<Text style={ styles.textStyle } variant='bodyExtraSmallRegular'>
					{ t('components.banner-tier.tier-description') }
				</Text>
			</View>
		)
	}, [screen, _handlePressTierProfile, interpolatedValue])

	return (
		<Suspense fallback={
			<View style={ style } />
		 } >
			<LazyStarsField style={ style } tier={ userProfileData?.latest_tier.toLowerCase() }>
				<View style={ [starsFieldContentStyle] }>
					{ _renderTopContent }
					{ _renderBottomContent }
				</View>
			</LazyStarsField>
		</Suspense>
	)
}

export default React.memo(BannerTier)