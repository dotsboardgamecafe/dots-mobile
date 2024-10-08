import { Platform } from 'react-native'
import { PERMISSIONS, RESULTS, requestMultiple, checkMultiple } from 'react-native-permissions'
import Toast from 'react-native-toast-message'

const getPlatform = Platform.select({
	android: [PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.READ_MEDIA_IMAGES],
	ios: [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.PHOTO_LIBRARY],
	macos: [],
	native: [],
	web: [],
	windows: []
})

const getPermission = async(): Promise<void> => {
	try {
		const results = await requestMultiple(getPlatform)
		if (Platform.select({
			ios: results['ios.permission.CAMERA'] !== RESULTS.GRANTED || results['ios.permission.PHOTO_LIBRARY'] !== RESULTS.GRANTED,
			android: results['android.permission.CAMERA'] !== RESULTS.GRANTED || results['android.permission.READ_MEDIA_IMAGES'] !== RESULTS.GRANTED
		})) {
			Toast.show({
				type: 'error',
				text1: 'Permission Denied'
			})
		}
	} catch (err) {
		Toast.show({
			type: 'error',
			text1: JSON.stringify(err)
		})
	}
}

const checkPermission = async(): Promise<void> => {
	try {
		const results = await checkMultiple(getPlatform)
		if (Platform.select({
			ios: results['ios.permission.CAMERA'] === RESULTS.UNAVAILABLE || results['ios.permission.PHOTO_LIBRARY'] === RESULTS.UNAVAILABLE ||
        results['ios.permission.CAMERA'] === RESULTS.DENIED || results['ios.permission.PHOTO_LIBRARY'] === RESULTS.DENIED,
			android: results['android.permission.CAMERA'] === RESULTS.UNAVAILABLE || results['android.permission.READ_MEDIA_IMAGES'] === RESULTS.UNAVAILABLE ||
        results['android.permission.CAMERA'] === RESULTS.DENIED || results['android.permission.READ_MEDIA_IMAGES'] === RESULTS.DENIED
		})) {
			await getPermission()
		}
	} catch (err) {
		Toast.show({
			type: 'error',
			text1: JSON.stringify(err)
		})
	}
}

const getPermission33Lower = async(): Promise<void> => {
	try {
		const results = await requestMultiple([
			PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.CAMERA
		])
		if (results['android.permission.CAMERA'] !== RESULTS.GRANTED || results['android.permission.READ_EXTERNAL_STORAGE'] !== RESULTS.GRANTED || results['android.permission.WRITE_EXTERNAL_STORAGE'] !== RESULTS.GRANTED) {
			Toast.show({
				type: 'error',
				text1: 'Permission Denied'
			})
		}
	} catch (err) {
		Toast.show({
			type: 'error',
			text1: JSON.stringify(err)
		})
	}
}

const checkPermissionAndroid33Lower = async(): Promise<void> => {
	try {
		const results = await checkMultiple([
			PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.CAMERA
		])
		if (
			results['android.permission.CAMERA'] === RESULTS.UNAVAILABLE || results['android.permission.READ_EXTERNAL_STORAGE'] === RESULTS.UNAVAILABLE || results['android.permission.WRITE_EXTERNAL_STORAGE'] === RESULTS.UNAVAILABLE ||
			results['android.permission.CAMERA'] === RESULTS.DENIED || results['android.permission.READ_EXTERNAL_STORAGE'] === RESULTS.DENIED || results['android.permission.WRITE_EXTERNAL_STORAGE'] === RESULTS.DENIED
		) {
			await getPermission33Lower()
		}
	} catch (err) {
		Toast.show({
			type: 'error',
			text1: JSON.stringify(err)
		})
	}
}

const requestPermission = async(): Promise<void> => {
	try {
		if (Platform.OS === 'android' && Platform.Version < 33) {
			await checkPermissionAndroid33Lower()
		} else {
			await checkPermission()
		}
	} catch (err) {
		Toast.show({
			type: 'error',
			text1: JSON.stringify(err)
		})
	}
}

export { requestPermission }