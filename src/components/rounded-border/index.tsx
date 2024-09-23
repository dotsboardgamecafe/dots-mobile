import React, { useMemo } from 'react'
import { ImageBackground, Platform, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import styles from './styles'
import { type RoundedBorderProps } from './type'
import { scaleWidth } from '../../utils/pixel.ratio'
import { colorsTheme } from '../../constants/theme'
import { smallBg } from '../../assets/images'

const colors = [colorsTheme.blueAccent, colorsTheme.yellowAccent, colorsTheme.redAccent]

const defaultSpaceBorder = 3

const intialSpaceBorder = Platform.OS === 'android' ? defaultSpaceBorder : defaultSpaceBorder / 2

const RoundedBorder = ({
	children,
	radius,
	borderWidth,
	contentStyle,
	style: propStyle,
	colors: colorProps = colors,
	spaceBorder = intialSpaceBorder,
	withBackgroundImage
}: RoundedBorderProps): React.ReactNode => {

	const contentRadius = useMemo(() => radius ? radius - (borderWidth ?? 0) : 0, [])

	const _renderChildren = useMemo(() => {
		const defaultChildrenStyle = { margin: scaleWidth(spaceBorder), borderRadius: contentRadius }

		if (withBackgroundImage) {
			return (
				<ImageBackground
					source={ smallBg }
					style={ [
						styles.container,
						contentStyle,
						{ ...defaultChildrenStyle, overflow: 'hidden' }
					] }
				>
					{ children }
				</ImageBackground>
			)
		}

		return (
			<View
				style={ [
					styles.container,
					contentStyle,
					defaultChildrenStyle
				] }
			>
				{ children }
			</View>
		)
	}, [withBackgroundImage, children, contentStyle])

	return (
		<LinearGradient
			colors={ colorProps }
			start={ { x: 0, y: 0 } }
			end={ { x: 1, y: 0 } }
			style={ [styles.border, propStyle, { borderRadius: radius }] }
		>
			{ _renderChildren }
		</LinearGradient>
	)
}

export default React.memo(RoundedBorder)