import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Constants from '../constants/navigation'
import Main from '../screen/main'
import Profile from '../screen/profile'
import Login from '../screen/login'

const Stack = createNativeStackNavigator()

const Navigations = ():React.ReactNode => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName={ 'login' }>
				<Stack.Screen
					name={ Constants.ScreenName.Main }
					component={ Main }
				/>
				<Stack.Screen
					name={ Constants.ScreenName.Profile }
					component={ Profile }
				/>
				<Stack.Screen
					name={ 'login' }
					component={ Login }
				/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default Navigations
