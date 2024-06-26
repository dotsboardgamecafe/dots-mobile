import React, { useCallback } from 'react'
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated'
import { FlatList, View } from 'react-native'
import { useTheme } from 'react-native-paper'

import { scaleWidth } from '../../utils/pixel.ratio'
import { type ThemeType } from '../../models/theme'
import createStyle from './styles'
import { type PageIndicatorProps } from './type'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

const PageIndicator = ({ length, animValue }: PageIndicatorProps): React.ReactNode => {

	const theme = useTheme<ThemeType>()
	const width = scaleWidth(10)
	const styles = createStyle(theme, width)
	const navBarHeight = useBottomTabBarHeight()

	const Item = useCallback(({ index }: { index: number }): React.ReactNode => {
		const animStyle = useAnimatedStyle(() => {
			let inputRange = [index - 1, index, index + 1]
			let outputRange = [-width, 0, width]

			if (index === 0 && animValue?.value > length - 1) {
				inputRange = [length - 1, length, length + 1]
				outputRange = [-width, 0, width]
			}

			return {
				transform: [
					{
						translateX: interpolate(
							animValue?.value,
							inputRange,
							outputRange,
							Extrapolation.CLAMP,
						),
					},
				],
			}
		}, [animValue, index, length])

		return (
			<View
				style={styles.container}
			>
				<Animated.View
					style={[styles.content, animStyle]}
				/>
			</View>
		)
	}, [animValue, length])

	const pagingSeparator = useCallback(() => (
		<View style={{ width: scaleWidth(4) }} />
	)
		, [])

	return (
		<View style={{ height: width, marginBottom: navBarHeight }}>
			<FlatList
				horizontal
				data={Array.from({ length })}
				extraData={animValue}
				keyExtractor={(_, index) => index.toString()}
				renderItem={({ index }) => <Item index={index} />}
				ItemSeparatorComponent={pagingSeparator}
			/>
		</View>
	)
}

export default React.memo(PageIndicator)