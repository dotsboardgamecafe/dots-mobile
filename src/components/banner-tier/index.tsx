import { View, Animated, type StyleProp, type ViewProps } from 'react-native'
import React, { useEffect, lazy, Suspense } from 'react'
import { scaleHeight, scaleWidth } from '../../utils/pixel.ratio'
import { colorsTheme } from '../../constants/theme'
import Text from '../text'
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient'
import VPIcon from '../../assets/svg/VP.svg'
import { useRoute } from '@react-navigation/native'
import navigationConstant from '../../constants/navigation'

const LazyStarsField = lazy(async() => await import('../stars-field/index'))

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient)

interface Props {
  style?: StyleProp<ViewProps> | undefined,
	starsFieldContentStyle?:StyleProp<ViewProps>,
}

const BannerTier = ({ style, starsFieldContentStyle }: Props): React.ReactNode => {
	const route = useRoute()

	const animatedValue = new Animated.Value(0)

	const interpolatedValue = animatedValue.interpolate({
		inputRange: [0, 100],
		outputRange: ['0%', '100%']
	})

	useEffect(() => {
		Animated.timing(animatedValue, {
			toValue: 100 - 1.5,
			useNativeDriver: false,
			duration: 3000
		}).start()
	}, [])

	return (
		<Suspense fallback={ null }>
			<LazyStarsField starCount={ route.name === navigationConstant.screenName.tier ? 500 : 500 } style={ style }>
				<View style={ [styles.starsFieldContentStyle, starsFieldContentStyle] }>
					<View style={ styles.starsFieldTopContentStyle }>
						<Text style={ styles.textStyle } variant='bodySmallBold'>Legend tier</Text>
						<Text style={ styles.textStyle } variant='bodyExtraSmallRegular'>Member since 2023</Text>
					</View>
					<View style={ styles.starsFieldMidContentStyle }>
						<Text style={ [styles.textStyle, styles.pointStyle] } variant='bodyMiddleBold'>650</Text>
						<VPIcon width={ scaleWidth(20) } height={ scaleHeight(20) }/>
					</View>
					<View style={ styles.rangeWrapperStyle }>
						<View style={ styles.neonWrapperStyle } />
						<AnimatedLinearGradient
							colors={ [colorsTheme.blueAccent, colorsTheme.yellowAccent, colorsTheme.redAccent] }
							start={ { x: 0, y: 0 } }
							end={ { x: 1, y: 0 } }
							style={ [
								styles.neonGradientStyle,
								{
									width: interpolatedValue
								}
							] }
						>
							<View style={ styles.neonWrapperV2Style }/>
						</AnimatedLinearGradient>
					</View>
					<Text style={ styles.textStyle } variant='bodyExtraSmallRegular'>Now you are on the highest tier. Level up points to get more reward.</Text>
				</View>
			</LazyStarsField>
		</Suspense>
	)
}

export default React.memo(BannerTier)