import { View, Animated, type StyleProp, type ViewProps } from 'react-native'
import React, { useEffect, lazy, Suspense, useCallback } from 'react'
import { scaleHeight, scaleWidth } from '../../utils/pixel.ratio'
import { colorsTheme } from '../../constants/theme'
import Text from '../text'
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient'
import VPIcon from '../../assets/svg/VP.svg'
import { useRoute } from '@react-navigation/native'
import navigationConstant from '../../constants/navigation'
import { Avatar } from 'react-native-paper'
import { LOGO } from '../../assets/images'

const LazyStarsField = lazy(async() => await import('../stars-field/index'))

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient)

interface Props {
  style?: StyleProp<ViewProps> | undefined,
	starsFieldContentStyle?:StyleProp<ViewProps>,
	screen: 'home' | 'tier' | 'profile'
}

const BannerTier = ({ style, starsFieldContentStyle, screen }: Props): React.ReactNode => {
	const route = useRoute()

	const animatedValue = new Animated.Value(0)

	const interpolatedValue = animatedValue.interpolate({
		inputRange: [0, 100],
		outputRange: ['0%', '100%']
	})

	const _renderTopContent = useCallback(() => {
		return (
			<View style={ styles.starsFieldTopContentStyle }>
				<View>
					<Text style={ styles.textStyle } variant={ screen === 'home' ? 'bodySmallBold' : 'bodyMiddleBold' }>Legend tier</Text>
				 	{ screen === 'tier' ?
						<Text style={ [styles.textStyle, styles.tierUsernameSpaceStyle] } variant='bodyMiddleRegular'>Olivia Ainsley</Text> :
						 null
					}
				</View>
				<View>
					{
						screen === 'tier' ?
							<View style={ styles.imageBorderStyle } >
								<Avatar.Image size={ scaleWidth(48) } source={ LOGO }/>
							</View> :
							screen === 'profile' ?
								<Text style={ styles.textStyle } variant='bodyExtraSmallRegular'>Icon</Text> :
								<Text style={ styles.textStyle } variant='bodyExtraSmallRegular'>Member since 2023</Text>
				 	}
				</View>
			</View>
		)
	}, [screen])

	const _renderBottomContent = useCallback(() => {
		return (
			<View>
				<View style={ styles.starsFieldMidContentStyle }>
					<Text style={ [styles.textStyle, styles.pointStyle] } variant={ screen === 'home' ? 'bodyMiddleBold' : 'bodyLargeBold' }>650</Text>
					<VPIcon width={ scaleWidth(screen === 'home' ? 20 : 24) } height={ scaleHeight(screen === 'home' ? 20 : 24) }/>
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
				<Text style={ styles.textStyle } variant='bodyExtraSmallRegular'>Now you are on the highest tier. Level up points to get more reward.</Text>
			</View>
		)
	}, [screen])

	useEffect(() => {
		Animated.timing(animatedValue, {
			toValue: 80 - 1.5,
			useNativeDriver: false,
			duration: 3000
		}).start()
	}, [])

	return (
		<Suspense fallback={ null }>
			<LazyStarsField starCount={ route.name === navigationConstant.screenName.tier ? 500 : 500 } style={ style }>
				<View style={ [styles.starsFieldContentStyle, starsFieldContentStyle] }>
					{ _renderTopContent() }
					{ _renderBottomContent() }
				</View>
			</LazyStarsField>
		</Suspense>
	)
}

export default React.memo(BannerTier)