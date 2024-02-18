import React, { type ReactNode, useMemo } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Main from '../screen/main'
import Profile from '../screen/profile'
import Login from '../screen/login'
import navigationConstant from '../constants/navigation'
import useStorage from '../hooks/useStorage'

const { screenName } = navigationConstant

const Stack = createNativeStackNavigator()

const publicNavigations = (): React.ReactNode => {
	return (
		<Stack.Group>
			<Stack.Screen
				name={screenName.login}
				component={Login}
			/>
			<Stack.Screen
				name={screenName.register}
				component={Login}
			/>
		</Stack.Group>
	)
}

const privateNavigations = (): ReactNode => {
	return (
		<Stack.Group>
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
	const { isLoggedIn } = useStorage()

	const renderScreenContent = useMemo(() => {

		if (isLoggedIn) return privateNavigations()

		return publicNavigations()
	}, [isLoggedIn])

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName={screenName.login}>
				{renderScreenContent}
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default Navigations
