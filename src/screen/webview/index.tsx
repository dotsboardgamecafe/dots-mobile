
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
			redBar.style.display = 'none';
			blueBar[0].style.display = 'none';
			clearInterval(timer)
		}, 2000)
	}

	timer = setInterval(() => {
		findDoc = window["ReactNativeWebView"]
		if(findDoc) hideHeader()
	}, 1000)

	true;
`

const WebView = ({ route, navigation }: Props): React.ReactNode => {
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
									{ name: 'Discover' }
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

		const subsribe = navigation.addListener('beforeRemove', () => {
			backAction()
		})

		return subsribe
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
				source={ { uri: route.params.link } }
				originWhitelist={ ['*'] }
				startInLoadingState
				injectedJavaScript={ runFirst }
				onMessage={ (event: any) => {} }
				onLoadStart={ () => { setLoading(true) } }
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
					console.log(navState.canGoBack)
				} }
			/>
		</SafeAreaView>
	)
}

export default withCommon(React.memo(WebView))