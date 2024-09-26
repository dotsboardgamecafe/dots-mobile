import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Canvas, Circle, Group } from '@shopify/react-native-skia'
import {
	Dimensions, StyleSheet, type StyleProp, type ViewStyle, Image, View,
	Platform,
	type ListRenderItem,
	NativeModules,
	InteractionManager
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Animated, {
	useSharedValue,
	withRepeat,
	withTiming,
	Easing,
	type SharedValue,
	useDerivedValue,
	useAnimatedStyle,
} from 'react-native-reanimated'
import styles from './styles'
import { colorsTheme } from '../../constants/theme'
import { smokeIntermediateIllu, smokeLegendIllu, smokeMasterIllu, smokeNoviceIllu } from '../../assets/images'
import { FlatList } from 'react-native-gesture-handler'

const { Stars } = NativeModules

const isIOS = Platform.OS === 'ios'

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

const getStars = (): any[] => Stars.generateRandomArraySync()

const StarAndroid: React.FC<StarProps> = props => {
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
			r={ 1.5 }
			color={ colorsTheme.lightWhite }
			transform={ animatedStyle }
			strokeWidth={ 0.5 + Math.random() * 0.5 }
		/>
	)
}

const StarIOS: React.FC<StarProps> = props => {
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

const MemoizeStarIOS = React.memo(StarIOS)

const StarFieldIOS = ({ timeVal }: {timeVal: any}): React.ReactNode => {
	const listStar = useMemo(() => getStars(), [])

	const getKeyExtractor = useCallback((item: any) => item?.id?.toString(), [])

	const getItemLayout = useCallback((data: any, index: number) => (
		{ length: 3, offset: 3 * index, index }
	), [])

	const _renderStars: ListRenderItem<React.ReactNode> = useCallback(({ item }: any) => {
		return <MemoizeStarIOS key={ item.id } time={ timeVal } starCount={ listStar.length } { ...item } />
	}, [listStar.length])

	return (
		<FlatList
			style={ StyleSheet.absoluteFill }
			scrollEnabled={ false }
			initialNumToRender={ listStar.length }
			data={ listStar }
			renderItem={ _renderStars }
			keyExtractor={ getKeyExtractor }
			getItemLayout={ getItemLayout }
			contentContainerStyle={ styles.starWrapperStyle }
		/>
	)
}

const StarFieldAndroid = ({ timeVal }: {timeVal: any}): React.ReactNode => {
	const listStar = useMemo(() => getStars(), [])

	const _renderStars = useCallback(({ item }: any) => {
		return <StarAndroid key={ item?.id } time={ timeVal } starCount={ listStar.length } { ...item } />
	}, [listStar.length])

	return (
		<Canvas style={ StyleSheet.absoluteFill }>
			<Group blendMode='multiply'>
				{
					listStar?.map(star => _renderStars({ item: star }))
				}
			</Group>
		</Canvas>
	)
}

const StarFieldComponent = (): React.ReactNode => {
	const timeVal = useSharedValue(0)

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

	return isIOS ?
		<StarFieldIOS timeVal={ timeVal } /> :
		<StarFieldAndroid timeVal={ timeVal } />
}

const MemoizedStarField = React.memo(StarFieldComponent)

const Starfield: React.FC<DefaultProps> = ({ starCount = 0, style, children, tier }) => {
	const [isNavigationDone, setIsNavigationDone] = useState(false)

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

	useEffect(() => {
		InteractionManager.runAfterInteractions(() => {
			setIsNavigationDone(true)
		})
	}, [])

	const _renderSmokeImage = useMemo(() => {
		return (
			<View style={ [StyleSheet.absoluteFill, { overflow: 'hidden' }] }>
				<Image
					style={ styles.smokeImageStyle }
					source={ _getSmokeImage }
				/>
			</View>
		)
	}, [starCount, style, _getSmokeImage])

	const _renderStarField = useMemo(() => {
		if (isNavigationDone) {
			return <MemoizedStarField/>
		}

		return <React.Fragment/>
	}, [isNavigationDone])

	return (
		<LinearGradient
			colors={ _generateGradientColor }
			style={ [styles.containerStyle, style] }
			useAngle
			angle={ 100 }
		>
			{ _renderSmokeImage }
			{ _renderStarField }
			{ children }
		</LinearGradient>
	)
}

export default React.memo(Starfield, (prevProps, nextProps) => {
	return prevProps.children === nextProps.children
})