import React, { useCallback, useEffect, useMemo } from 'react'
import {
	Dimensions, StyleSheet, type StyleProp, type ViewStyle, Image, View,
	type ListRenderItem,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { FlatList } from 'react-native-gesture-handler'
import Animated, {
	useSharedValue,
	withRepeat,
	withTiming,
	useAnimatedStyle,
	Easing,
	type SharedValue,
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
	const animatedStyle = useAnimatedStyle(() => {
		const t = props?.time?.value ?? 0
		const { x, y } = props

		const z = props.id / Number(props.starCount ?? 0)
		const depth = (z + t) % 1
		const invZp = 0.4 / (1 - depth)

		return {
			transform: [
				{ translateX: windowWidth * (0.5 + x * invZp) },
				{ translateY: windowHeight * (0.5 + y * invZp) },
				{ scaleX: depth },
				{ scaleY: depth },
			],
		}
	})

	return (
		<Animated.View
			style={ [
				{
					// the animation didnt work when the style in styles file
					position: 'absolute',
					backgroundColor: colorsTheme.lightWhite,
					width: 3,
					height: 3,
					opacity: 0.5 + Math.random() * 0.5,
					borderRadius: 100,
					zIndex: 99
				},
				animatedStyle,
			] }
		/>
	)
}

const Starfield: React.FC<DefaultProps> = ({ starCount = 0, style, children, tier }) => {
	const timeVal = useSharedValue(0)

	const _renderStars: ListRenderItem<React.ReactNode> = useCallback(({ item }: any) => {
		return <Star key={ item.id } time={ timeVal } starCount={ starCount } { ...item } />
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
		if (!__DEV__)
			return (
				<FlatList
					style={ StyleSheet.absoluteFill }
					scrollEnabled={ false }
					initialNumToRender={ starCount }
					data={ getStars(starCount) }
					renderItem={ _renderStars }
					keyExtractor={ (_, index) => index.toString() }
					getItemLayout={ (_, index) => (
						{ length: 3, offset: 3 * index, index }
					) }
					contentContainerStyle={ styles.starWrapperStyle }
				/>
			)

		return null
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

export default React.memo(Starfield,   (prevProps, nextProps) => {
	return prevProps.starCount === nextProps.starCount
})