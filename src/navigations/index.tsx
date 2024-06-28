import React, { type ReactNode, useMemo, useEffect, useCallback } from 'react'
import { useColorScheme } from 'react-native'
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { PaperProvider } from 'react-native-paper'
import BootSplash from 'react-native-bootsplash'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import get from 'lodash/get'

import Main from '../screen/main'
import Profile from '../screen/profile'
import Login from '../screen/login'
import navigationConstant, { linking } from '../constants/navigation'
import useStorage from '../hooks/useStorage'
import themeConstant from '../constants/theme'
import MainTab from './main'
import Register from '../screen/register'
import PaymentSuccess from '../screen/payment-success'
import GameDetail from '../screen/game-detail'
import RoomDetail from '../screen/room-detail'
import Webview from '../screen/webview'
import ForgotPassword from '../screen/forgot-password'
import UpdatePassword from '../screen/update-password'
import Tier from '../screen/tier'
import MVP from '../screen/mvp'
import HallOfFame from '../screen/hall-of-fame'
import Awards from '../screen/awards'
import GameBoardCollection from '../screen/game-board-collection'
import AccountInformation from '../screen/account-information'
import EditPassword from '../screen/edit-password'
import TncPrivacyPolicy from '../screen/tnc-privacy-policy'
import Notifications from '../screen/notifications'
import Transactions from '../screen/transactions'
import EditProfile from '../screen/edit-profile'
import { OneSignal } from 'react-native-onesignal'

interface AdditionalDataType {
  type: string
}

const { screenName, } = navigationConstant

const {
	paperThemeLight,
	navigationThemeLight
} = themeConstant

const Stack = createNativeStackNavigator()

const publicNavigations = (): React.ReactNode => {
	return (
		<Stack.Group screenOptions={ { headerShown: false } }>
			<Stack.Screen
				name={ screenName.login }
				component={ Login }
			/>
			<Stack.Screen
				name={ screenName.register }
				component={ Register }
			/>
			<Stack.Screen
				name={ screenName.forgotPassword }
				component={ ForgotPassword }
			/>
			<Stack.Screen
				name={ screenName.updatePassword }
				component={ UpdatePassword }
			/>
		</Stack.Group>
	)
}

const privateNavigations = (): ReactNode => {
	return (
		<Stack.Group screenOptions={ { headerShown: false } }>
			<Stack.Screen
				name={ screenName.bottomNav }
				component={ MainTab }
			 />
			<Stack.Screen
				name={ screenName.main }
				component={ Main }
			/>
			<Stack.Screen
				name={ screenName.profile }
				component={ Profile }
			/>
			<Stack.Screen
				name={ screenName.gameDetail }
				component={ GameDetail }
			/>
			<Stack.Screen
				name={ screenName.roomDetail }
				component={ RoomDetail }
			/>
			<Stack.Screen
				name={ screenName.paymentSuccess }
				component={ PaymentSuccess }
			/>
			<Stack.Screen
				name={ screenName.webview }
				component={ Webview }
			/>
			<Stack.Screen
				name={ screenName.tier }
				component={ Tier }
			/>
			<Stack.Screen
				name={ screenName.mvp }
				component={ MVP }
			/>
			<Stack.Screen
				name={ screenName.hallOfFame }
				component={ HallOfFame }
			/>
			<Stack.Screen
				name={ screenName.gameBoardCollection }
				component={ GameBoardCollection }
			/>
			<Stack.Screen
				name={ screenName.awards }
				component={ Awards }
			/>
			<Stack.Screen
				name={ screenName.accountInformation }
				component={ AccountInformation }
			/>
			<Stack.Screen
				name={ screenName.editPassword }
				component={ EditPassword }
			/>
			<Stack.Screen
				name={ screenName.tnc }
				component={ TncPrivacyPolicy }
			/>
			<Stack.Screen
				name={ screenName.privacyPolicy }
				component={ TncPrivacyPolicy }
			/>
			<Stack.Screen
				name={ screenName.notifications }
				component={ Notifications }
			/>
			<Stack.Screen
				name={ screenName.transactions }
				component={ Transactions }
			/>
			<Stack.Screen
				name={ screenName.editProfile }
				component={ EditProfile }
			/>
		</Stack.Group>
	)
}

const Navigations = (): React.ReactNode => {
	const colorScheme = useColorScheme()
	const { isLoggedIn } = useStorage({ init: true })
	const navigationRef = createNavigationContainerRef()

	const _getScreenName = useCallback((type:string) => {
		switch (type) {
			case 'room':
			case 'tournament':
				return screenName.notifications
			case 'transaction':
				return screenName.transactions
			default:
				return screenName.main
		}
	}, [])

	const themeFactory = useMemo(() => {
		const paperTheme = paperThemeLight
		const navigationTheme = navigationThemeLight
		// const paperTheme = colorScheme === 'dark' ? paperThemeDark : paperThemeLight
		// const navigationTheme = colorScheme === 'dark' ? navigationThemeDark : navigationThemeLight

		return {
			paperTheme,
			navigationTheme
		}
	}, [colorScheme])

	const renderScreenContent = useMemo(() => {

		if (isLoggedIn) return privateNavigations()

		return publicNavigations()
	}, [isLoggedIn])

	useEffect(() => {
		OneSignal.Notifications.addEventListener('click', event => {
			if (navigationRef.isReady()) {
				const additionalData = get(event.notification, 'additionalData', { type: '' }) as AdditionalDataType

				const screenName = isLoggedIn ?
					_getScreenName(additionalData.type) :
					navigationConstant.screenName.login

				navigationRef.navigate(screenName as never)
			}
		})
	}, [isLoggedIn, navigationRef])

	return (
		<PaperProvider theme={ themeFactory.paperTheme }>
			<GestureHandlerRootView style={ { flex: 1 } }>
				<BottomSheetModalProvider>
					<NavigationContainer
						ref={ navigationRef }
						theme={ themeFactory.navigationTheme }
						onReady={ BootSplash.hide }
						linking={ {
							...linking,
						} }
					>
						<Stack.Navigator initialRouteName={ screenName.login }>
							{ renderScreenContent }
						</Stack.Navigator>
					</NavigationContainer>
				</BottomSheetModalProvider>
			</GestureHandlerRootView>
		</PaperProvider>
	)
}

export default Navigations
