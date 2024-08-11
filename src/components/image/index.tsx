import React, { useEffect, useState } from 'react'
import {
	Image as ImageLib, type ImageURISource, type ImageProps,
	type StyleProp,
	type ImageStyle
} from 'react-native'

import { imgFailed } from '../../assets/images'

const Image = (props: ImageProps & { keepRatio?: boolean, fallbackImg?: any }): React.ReactNode => {
	const [valid, setValid] = useState(true)
	const [sizeStyle, setSizeStyle] = useState<StyleProp<ImageStyle>>({})

	useEffect(() => {
		const uri = (props.source as ImageURISource).uri
		if (uri) {
			ImageLib.getSize(
				uri,
				(width, height) => {
					setValid(width > 0)
					setSizeStyle({
						width: '100%',
						aspectRatio: width / height,
						height: undefined
					})
				},
				() => { setValid(false) }
			)
		} else if (uri === '') {
			setValid(false)
		}
	}, [props.source])

	if (valid) return <ImageLib
		{ ...props }
		style={ [props.style, props.keepRatio && sizeStyle] }
		onError={ () => { setValid(false) } }
	/>

	return (
		<ImageLib
			{ ...props }
			source={ props.fallbackImg || imgFailed }
		/>
	)
}

export default React.memo(Image)