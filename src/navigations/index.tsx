import React, { type ReactNode, useMemo } from 'react'
import { useColorScheme } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { PaperProvider } from 'react-native-paper'
import BootSplash from 'react-native-bootsplash'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import Main from '../screen/main'
import Profile from '../screen/profile'
import Login from '../screen/login'
import navigationConstant from '../constants/navigation'
import useStorage from '../hooks/useStorage'
import themeConstant from '../constants/theme'
import MainTab from './main'
import Register from '../screen/register'

const { screenName, } = navigationConstant

const {
	paperThemeDark,
	paperThemeLight,
	navigationThemeDark,
	navigationThemeLight
} = themeConstant

const Stack = createNativeStackNavigator()

const publicNavigations = (): React.ReactNode => {
	return (
		<Stack.Group screenOptions={{ headerShown: false }}>
			<Stack.Screen
				name={screenName.login}
				component={Login}
			/>
			<Stack.Screen
				name={screenName.register}
				component={Register}
			/>
		</Stack.Group>
	)
}

const privateNavigations = (): ReactNode => {
	return (
		<Stack.Group>
			<Stack.Screen name='main2' component={MainTab} options={{ headerShown: false }} />
			<Stack.Screen
				name={screenName.main}
				component={Main}
			/>
			<Stack.Screen
				name={screenName.profile}
				component={Profile}
			/>
		</Stack.Group>
	)
}

const Navigations = (): React.ReactNode => {
	const colorScheme = useColorScheme()
	const { isLoggedIn } = useStorage({ init: true })

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

	return (
		<PaperProvider theme={themeFactory.paperTheme}>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<NavigationContainer
					theme={themeFactory.navigationTheme}
					onReady={BootSplash.hide}
				>
					<Stack.Navigator initialRouteName={screenName.login}>
						{renderScreenContent}
					</Stack.Navigator>
				</NavigationContainer>
			</GestureHandlerRootView>
		</PaperProvider>
	)
}

export default Navigations
