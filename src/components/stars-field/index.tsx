import React, { useCallback, useEffect, useMemo } from 'react'
import { Canvas, Circle, Group } from '@shopify/react-native-skia'
import {
	Dimensions, StyleSheet, type StyleProp, type ViewStyle, Image, View,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import {
	useSharedValue,
	withRepeat,
	withTiming,
	Easing,
	type SharedValue,
	useDerivedValue,
} from 'react-native-reanimated'
import styles from './styles'
import { colorsTheme } from '../../constants/theme'
import { smokeIntermediateIllu, smokeLegendIllu, smokeMasterIllu, smokeNoviceIllu } from '../../assets/images'

interface DefaultProps {
  time?:SharedValue<number>;
  starCount?: number
  children?: React.ReactNode
  style?: StyleProp<ViewStyle> | undefined,
	tier?: string
}

interface StarData extends DefaultProps {
  id: number;
  x: number;
  y: number;
}

interface StarProps extends StarData {}

const windowWidth = Dimensions.get('window').width
const windowHeight = 150

const getStars = (starCount: number): any[] => {
	const stars: StarData[] = []

	for (let i = 0; i < starCount; i++) {
		stars.push({
			id: i,
			x: Math.random() - 0.5,
			y: Math.random() - 0.5,
		})
	}
	return stars
}

const Star: React.FC<StarProps> = props => {
	const animatedStyle = useDerivedValue(() => {
		const t = props?.time?.value ?? 0
		const { x, y } = props

		const z = props.id / Number(props.starCount ?? 0)
		const depth = (z + t) % 1
		const invZp = 0.4 / (1 - depth)

		return [
			{ translateX: windowWidth * (0.5 + x * invZp) },
			{ translateY: windowHeight * (0.5 + y * invZp) },
			{ scaleX: depth },
			{ scaleY: depth },
		]
	})

	return (
		<Circle
			cx={ 0 }
			cy={ 0 }
			r={ 3 }
			color={ colorsTheme.lightWhite }
			transform={ animatedStyle }
			strokeWidth={ 0.5 + Math.random() * 0.5 }
		/>
	)
}

const Starfield: React.FC<DefaultProps> = ({ starCount = 0, style, children, tier }) => {
	const timeVal = useSharedValue(0)

	const _renderStars = useCallback(({ item }: any) => {
		return <Star key={ item?.id } time={ timeVal } starCount={ starCount } { ...item } />
	}, [starCount])

	const _getSmokeImage = useMemo(() => {
		if (tier) {
			const smokeImage = {
				legend: smokeLegendIllu,
				intermediate: smokeIntermediateIllu,
				master: smokeMasterIllu,
				novice: smokeNoviceIllu
			}
	
			return smokeImage[tier as keyof typeof smokeImage]
		}
	}, [tier])

	const _generateGradientColor = useMemo(() => {
		if (tier) {
			const gradientColor = {
				legend: ['rgba(27,24,31,1)', 'rgba(50,4,89,1)'],
				intermediate: ['#212629', '#043249'],
				master: ['#201b1b', '#480405'],
				novice: ['#27271e', '#3f3703']
			}
	
			return gradientColor[tier as keyof typeof gradientColor]
		}
		return ['#000', '#000']
	}, [tier])

	const _renderSmokeImage = useMemo(() => {
		return (
			<View style={ StyleSheet.absoluteFill }>
				<Image
					style={ styles.smokeImageStyle(Number((style as any)?.height ?? 200)) }
					source={ _getSmokeImage }
				/>
			</View>
		)
	}, [starCount, style, _getSmokeImage])

	useEffect(() => {
		timeVal.value = 0
		timeVal.value = withRepeat(
			withTiming(1, { duration: 8000, easing: Easing.linear }),
			0,
			false
		)

		return () => {
			timeVal.value = 0
		}
	}, [starCount])

	const _renderStarsField = useMemo(() => {
		return (
			<Canvas style={ StyleSheet.absoluteFill }>
				<Group blendMode='multiply'>
					{
						getStars(starCount).map(star => _renderStars({ item: star }))
					}
				</Group>
			</Canvas>
		)
	}, [starCount, _renderStars])

	return (
		<LinearGradient
			colors={ _generateGradientColor }
			style={ [styles.containerStyle, style] }
			useAngle
			angle={ 100 }
		>
			{ _renderSmokeImage }
			{ _renderStarsField }
			{ children }
		</LinearGradient>
	)
}

export default React.memo(Starfield, (prevProps, nextProps) => {
	return prevProps.starCount === nextProps.starCount
		&& prevProps.children === nextProps.children
})