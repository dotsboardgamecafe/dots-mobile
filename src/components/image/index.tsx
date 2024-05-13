import React, { useCallback, useEffect, useState } from 'react'
import {
	Image as ImageLib, type ImageURISource, type ImageProps, View, type LayoutChangeEvent
} from 'react-native'
import { Image as ImageIcon } from 'iconsax-react-native'

import Text from '../text'
import { useTheme } from 'react-native-paper'
import { type ThemeType } from '../../models/theme'
import { scaleWidth } from '../../utils/pixel.ratio'
import createStyle from './styles'

const Image = (props: ImageProps): React.ReactNode => {
	const theme = useTheme<ThemeType>()
	const styles = createStyle(theme)
	const [valid, setValid] = useState(true)
	const [imgSize, setImgSize] = useState(scaleWidth(32))
	const [labelVisible, setLabelVisible] = useState(true)

	const notFoundLayout = useCallback((ev: LayoutChangeEvent) => {
		const { height } = ev.nativeEvent.layout
		if (height < scaleWidth(60)) {
			setLabelVisible(false)
			setImgSize(scaleWidth(height * .5))
		}
	}, [])

	useEffect(() => {
		const uri = (props.source as ImageURISource).uri
		if (uri) {
			ImageLib.getSize(
				uri,
				w => { setValid(w > 0) },
				() => { setValid(false) }
			)
		} else if (uri === '') {
			setValid(false)
		}
	}, [])

	if (valid) return <ImageLib { ...props } onError={ () => { setValid(false) } } />

	return (
		<View style={ [props.style, styles.notFound] } onLayout={ notFoundLayout }>
			<ImageIcon variant='Bold' color={ theme.colors.gray } size={ imgSize } />
			{ labelVisible && <Text variant='bodyMiddleRegular' style={ styles.text }>Failed to load image</Text> }
		</View>
	)
}

export default React.memo(Image)