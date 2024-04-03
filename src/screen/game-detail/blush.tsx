import React, {  useEffect, useMemo, useRef } from 'react'
import { type BlushProps } from './type'
import { Shadow } from 'react-native-shadow-2'
import createStyle from './styles'
import { useTheme } from 'react-native-paper'
import { type ThemeType } from '../../models/theme'
import { Animated } from 'react-native'

const Blush = ({ color, distance, style, opacity = 1 }: BlushProps): React.ReactNode => {
	const styles = createStyle(useTheme<ThemeType>())
	const opAnim = useRef(new Animated.Value(1)).current

	const opStyle = useMemo(() => {
		return {
			opacity: opAnim
		}
	}, [opAnim])

	useEffect(
		() => {
			Animated.timing(opAnim, {
				toValue: opacity,
				duration: (opacity === 0 || opacity === 1) ? 300 : 100,
				useNativeDriver: true
			}).start()
		},
		[opacity]
	)

	return (
		<Animated.View style={ opStyle }>
			<Shadow
				startColor={ color }
				distance={ distance }
				paintInside
				containerStyle={ [styles.blush, style] }
			/>
		</Animated.View>
	)
}

export default React.memo(Blush)