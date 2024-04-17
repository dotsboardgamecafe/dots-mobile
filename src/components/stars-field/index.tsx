import React, { useCallback, useEffect } from 'react'
import {
	Dimensions, FlatList, type ListRenderItem, StyleSheet, type StyleProp, type ViewStyle
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
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

const defaultStartCount = 500

interface DefaultProps {
  time?:SharedValue<number>;
  starCount?: number
  children?: React.ReactNode
  style?: StyleProp<ViewStyle> | undefined,
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
					zIndex: -1
				},
				animatedStyle,
			] }
		/>
	)
}

const Starfield: React.FC<DefaultProps> = ({ starCount = defaultStartCount, style, children }) => {
	const timeVal = useSharedValue(0)

	const renderStars: ListRenderItem<React.ReactNode> = useCallback(({ item }: any) => {
		return <Star key={ item.id } time={ timeVal } starCount={ starCount } { ...item } />
	}, [starCount])

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
	}, [])

	return (
		<LinearGradient
			colors={ ['rgba(27,24,31,1)', 'rgba(50,4,89,1)'] }
			style={ [styles.containerStyle, style] }
			useAngle
			angle={ 100 }
		>
			<FlatList
				style={ StyleSheet.absoluteFill }
				scrollEnabled={ false }
				initialNumToRender={ starCount }
				data={ getStars(starCount) }
				renderItem={ renderStars }
				keyExtractor={ (_, index) => index.toString() }
				getItemLayout={ (_, index) => (
					{ length: 3, offset: 3 * index, index }
				) }
			/>
			{ children }
		</LinearGradient>
	)
}

export default React.memo(Starfield,   (prevProps, nextProps) => {
	return prevProps.starCount === nextProps.starCount
})