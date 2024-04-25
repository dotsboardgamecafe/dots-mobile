import React, { useMemo } from 'react'
import { View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import styles from './styles'
import { type RoundedBorderProps } from './type'
import { scaleWidth } from '../../utils/pixel.ratio'
import { colorsTheme } from '../../constants/theme'

const colors = [colorsTheme.blueAccent, colorsTheme.yellowAccent, colorsTheme.redAccent]

const RoundedBorder = ({
	children,
	radius,
	borderWidth,
	contentStyle,
	style: propStyle,
	colors: colorProps = colors,
	spaceBorder = 1.5
}: RoundedBorderProps): React.ReactNode => {

	const contentRadius = useMemo(() => radius ? radius - (borderWidth ?? 0) : 0, [])

	return (
		<LinearGradient
			colors={ colorProps }
			start={ { x: 0, y: 0 } }
			end={ { x: 1, y: 0 } }
			style={ [styles.border, propStyle, { borderRadius: radius }] }
		>
			<View
				style={ [
					styles.container,
					contentStyle,
					{ margin: scaleWidth(spaceBorder), borderRadius: contentRadius }
				] }
			>
				{ children }
			</View>
		</LinearGradient>
	)
}

export default React.memo(RoundedBorder)