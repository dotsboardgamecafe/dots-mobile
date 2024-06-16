
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { WebView as ReactNativeWebView  } from 'react-native-webview'
import { type NavigationProps } from '../../models/navigation'
import withCommon from '../../hoc/with-common'
import styles from './styles'
import { ActivityIndicator, SafeAreaView, StatusBar, View } from 'react-native'
import { CommonActions } from '@react-navigation/native'
import navigationConstant from '../../constants/navigation'

type Props = NavigationProps<'webview'>

const runFirst = `
	let timer;
	let findDoc;

	const hideHeader = () => {
		setTimeout(() => {
			const redBar = document.getElementById('simulation-bar-portal');
			const blueBar = document.getElementsByTagName('header')
			// redBar.style.display = 'none';
			// blueBar[0].style.display = 'none';
			clearInterval(timer)
		}, 2000)
	}

	timer = setInterval(() => {
		findDoc = window["ReactNativeWebView"]
		if(findDoc) hideHeader()
	}, 1000)

	true;
`

const REDIRECT_SUCCESS_URL = 'https://dots-api.vereintech.com/v1/payment/success-callback'
const REDIRECT_FAILED_URL = 'https://dots-api.vereintech.com/v1/payment/failure-callback'

const WebView = ({ route, navigation }: Props): React.ReactNode => {
	const { link, game_code } = route.params
	const [loading, setLoading] = useState(false)

	const webViewRef = useRef(null)

	const backAction = useCallback(async() => {
		try {
			const promises = new Promise((resolve, reject) => {
				// simulate request
				setTimeout(() => {
					resolve(200)
				}, 500)
			})
			await promises
			navigation.dispatch(
				CommonActions.reset({
					index: 1,
					routes: [
						{
							name: navigationConstant.screenName.bottomNav,
							state: {
								routes: [
									{ name: 'Play' }
								]
							}
						},
						{ name: navigationConstant.screenName.paymentSuccess }
					]
				})
			)
		} catch (error) {
			// todo error
		}
	}, [navigation])

	useEffect(() => {
		// const subsribe = navigation.addListener('beforeRemove', () => {
		// 	backAction()
		// })

		// return subsribe
	}, [])

	return (
		<SafeAreaView style={ styles.containerStyle }>
			<StatusBar
				barStyle='dark-content'
				backgroundColor='transparent'
				translucent
			/>
			{ loading &&
			<View style={ styles.loadingWrapperStyle }>
				<ActivityIndicator/>
			</View>
			}
			<ReactNativeWebView
				ref={ webViewRef }
				source={ { uri: link } }
				originWhitelist={ ['*'] }
				startInLoadingState
				injectedJavaScript={ runFirst }
				onMessage={ (event: any) => {} }
				onLoadStart={ ({ nativeEvent }: any) => {
					const { url } = nativeEvent
					console.log('url', url)
					if (url?.toString() === REDIRECT_SUCCESS_URL) {
						navigation.replace('paymentSuccess', { game_code })
					} else if (url?.toString() === REDIRECT_FAILED_URL) {
						navigation.goBack()
					} else {
						setLoading(true)
					}
				} }
				onLoadEnd={ () => {
					setTimeout(() => {
						setLoading(false)
					}, 3000)
				} }
				postMessage={ (e: any) => {} }
				javaScriptEnabled
				useWebkit
				javaScriptEnabledAndroid
				onNavigationStateChange={ (navState: any) => {
					// Keep track of going back navigation within component
					// console.log(navState.canGoBack)
				} }
			/>
		</SafeAreaView>
	)
}

export default withCommon(React.memo(WebView))