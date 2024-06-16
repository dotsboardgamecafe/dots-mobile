import { Dimensions, Platform, PixelRatio, StatusBar } from 'react-native'
import DeviceInfo from 'react-native-device-info'

const {
	width: SCREEN_WIDTH,
	height: SCREEN_HEIGHT,
} = Dimensions.get('window')

const fullWidth = SCREEN_WIDTH

const fullHeight = SCREEN_HEIGHT

const defaultScaleWidth = SCREEN_WIDTH / 375

const defaultScaleHeight = SCREEN_HEIGHT / 812

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

const isIphoneXorAbove = (): boolean =>  {
	return DeviceInfo.hasNotch()
}

const getStatusBarHeight = (): number | undefined => Platform.OS === 'android' ? StatusBar.currentHeight : isIphoneXorAbove() ? -20 : 0

export {
	scaleWidth,
	scaleHeight,
	scaleHorizontal,
	scaleVertical,
	scaleFont,
	fullWidth,
	fullHeight,
	isIphoneXorAbove,
	getStatusBarHeight
}