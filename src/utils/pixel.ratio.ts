import { Dimensions, Platform, PixelRatio } from 'react-native'

const {
	width: SCREEN_WIDTH,
	height: SCREEN_HEIGHT,
} = Dimensions.get('window')

const defaultScaleWidth = SCREEN_WIDTH / 375

const defaultScaleHeight = SCREEN_HEIGHT / 852

const scaleWidth = (size: number):number => {
	const newSize = size * defaultScaleWidth
	if (Platform.OS === 'ios') {
		return Math.round(PixelRatio.roundToNearestPixel(newSize))
	} else {
		return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1
	}
}

const scaleHeight =  (size: number):number => {
	const newSize = size * defaultScaleHeight
	if (Platform.OS === 'ios') {
		return Math.round(PixelRatio.roundToNearestPixel(newSize))
	} else {
		return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1
	}
}

const scaleVertical =  (size: number):number => {
	return scaleHeight(size)
}

const scaleHorizontal =  (size: number):number => {
	return scaleWidth(size)
}

const scaleFont =  (size: number):number => {
	return scaleHeight(size)
}

export {
	scaleWidth,
	scaleHeight,
	scaleHorizontal,
	scaleVertical,
	scaleFont
}