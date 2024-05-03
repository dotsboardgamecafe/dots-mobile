import { View, Animated, TouchableOpacity } from 'react-native'
import React, {
	useEffect, lazy, Suspense, useCallback, useState,
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
import { LOGO } from '../../assets/images'
import { type StyleProps } from 'react-native-reanimated'
import { type TierType } from '../../models/components'
import { useTranslation } from 'react-i18next'

const LazyStarsField = lazy(async() => await import('../stars-field'))

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient)

const fullYear = new Date().getFullYear()

interface Props extends TierType {
  style?: StyleProps,
	starsFieldContentStyle?:StyleProps,
	screen: 'home' | 'tier' | 'profile',
	onPressTripleDot?: (() => void) | undefined;
}

const BannerTier = ({ style, starsFieldContentStyle, screen, tier = 'intermediate', onPressTripleDot }: Props): React.ReactNode => {

	const { t } = useTranslation()

	const [starCount, setStarCount] = useState(0)

	const animatedValue = new Animated.Value(0)

	const interpolatedValue = animatedValue.interpolate({
		inputRange: [0, 100],
		outputRange: ['0%', '100%']
	})

	const _renderTopContent = useCallback(() => {
		return (
			<View style={ styles.starsFieldTopContentStyle }>
				{
					screen === 'profile' ?
						<View style={ styles.avatarUserWrapperStyle }>
							<View>
								<View style={ styles.imageBorderStyle }>
									<Avatar.Image size={ scaleWidth(62) } source={ LOGO }/>
								</View>
								<TouchableOpacity style={ [styles.iconPencilWrapperStyle, styles.imageBorderStyle] }>
									<PencilIcon/>
								</TouchableOpacity>
							</View>
							<View style={ styles.avatarUsernameWrapperStyle }>
								<Text style={ [styles.textStyle, styles.tierUsernameSpaceStyle] } variant='bodyLargeBold'>Olivia Ainsley</Text>
								<Text style={ styles.textStyle } variant='bodyExtraSmallRegular'>{ t('components.banner-tier.joined-date', { since: fullYear }) }</Text>
							</View>
						</View> :
						<View style={ styles.topContentWrapperStyle }>
							<Text style={ styles.textStyle } variant={ screen === 'home' ? 'bodySmallBold' : 'bodyMiddleBold' }>{ t('components.banner-tier.tier', { tier }) }</Text>
				 			{ screen === 'tier' ?
								<Text style={ [styles.textStyle, styles.tierUsernameSpaceStyle] } variant='bodyMiddleRegular'>Olivia Ainsley</Text> :
						 		null
							}
						</View>
				}
				<View style={ styles.topContentWrapperStyle }>
					{
						screen === 'tier' ?
							<View style={ styles.imageBorderStyle } >
								<Avatar.Image size={ scaleWidth(48) } source={ LOGO }/>
							</View> :
							screen === 'profile' ?
								<TouchableOpacity style={ styles.tripleDotsWrapperStyle } onPress={ onPressTripleDot }>
									<View style={ styles.tripeDotsIconWrapperStyle } />
									<TripleDotsIcon style={ styles.tripeDotsIconStyle }/>
								</TouchableOpacity> :
								<Text style={ styles.textStyle } variant='bodyExtraSmallRegular'>{ t('components.banner-tier.joined-date', { since: fullYear }) }</Text>
				 	}
				</View>
			</View>
		)
	}, [screen, onPressTripleDot])

	const _renderBottomContent = useCallback(() => {
		return (
			<View style={ styles.starsFieldContentStyle }>
				<View style={ [styles.starsFieldMidContentStyle, styles.profileBottomWrapperStyle] }>
					<View style={ styles.starsFieldMidContentStyle }>
						<Text style={ [styles.textStyle, styles.pointStyle] } variant={ screen === 'home' ? 'bodyMiddleBold' : 'bodyLargeBold' }>650</Text>
						<VPIcon width={ scaleWidth(screen === 'home' ? 20 : 26) } height={ scaleHeight(screen === 'home' ? 20 : 26) }/>
					</View>
					{
						screen === 'profile' ?
							<TouchableOpacity>
								<Text style={ styles.textStyle } variant='bodyMiddleBold'>{ t('components.banner-tier.tier', { tier }) }</Text>
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
	}, [screen])

	useEffect(() => {
		Animated.timing(animatedValue, {
			toValue: 80 - 1.5,
			useNativeDriver: false,
			duration: 1500
		}).start(() => {
			setStarCount(300)
		})
		return () => { setStarCount(0) }
	}, [])

	return (
		<Suspense fallback={
			<View style={ style } />
		 } >
			<LazyStarsField starCount={ starCount } style={ style } tier={ tier }>
				<View style={ [starsFieldContentStyle] }>
					{ _renderTopContent() }
					{ _renderBottomContent() }
				</View>
			</LazyStarsField>
		</Suspense>
	)
}

export default React.memo(BannerTier)