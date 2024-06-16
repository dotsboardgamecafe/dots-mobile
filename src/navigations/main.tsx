import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import TabBar from '../components/tabbar'
import Discover from '../screen/discover'
import Play from '../screen/play'
import Home from '../screen/home'
import Champion from '../screen/champion'
import Profile from '../screen/profile'
import navigationConstant from '../constants/navigation'

const Tab = createBottomTabNavigator()

const MainTab = (): React.ReactNode => {

	return (
		<Tab.Navigator
			screenOptions={ {
				headerShown: false,
				freezeOnBlur: false,
			} }
			tabBar={ props => <TabBar { ...props } /> }
		>
			{ /* TODO name to be constant variable */ }
			<Tab.Screen name={ navigationConstant.screenName.home } component={ Home } />
			<Tab.Screen name={ navigationConstant.screenName.discover } component={ Discover } />
			<Tab.Screen name={ navigationConstant.screenName.play } component={ Play } />
			<Tab.Screen name={ navigationConstant.screenName.champion } component={ Champion } />
			<Tab.Screen name={ navigationConstant.screenName.profile } component={ Profile } />
		</Tab.Navigator>
	)
}

export default MainTab