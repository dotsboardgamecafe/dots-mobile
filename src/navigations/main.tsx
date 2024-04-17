import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useTranslation } from 'react-i18next'

import Filler from '../screen/filler'
import TabBar from '../components/tabbar'
import Discover from '../screen/discover'
import Play from '../screen/play'
import Home from '../screen/home'
import Champion from '../screen/champion'

const Profile = (): React.ReactNode => <Filler id='Profile' />

const Tab = createBottomTabNavigator()

const MainTab = (): React.ReactNode => {
	const { t } = useTranslation()

	return (
		<Tab.Navigator
			screenOptions={ {
				headerShown: false,
				freezeOnBlur: false,
			} }
			tabBar={ props => <TabBar { ...props } /> }
		>
			{ /* TODO name to be constant variable */ }
			<Tab.Screen name={ t('main-page.home') } component={ Home } />
			<Tab.Screen name={ t('main-page.discover') } component={ Discover } options={ { lazy: false } } />
			<Tab.Screen name={ t('main-page.play') } component={ Play } />
			<Tab.Screen name={ t('main-page.champion') } component={ Champion } options={ { lazy: false } } />
			<Tab.Screen name={ t('main-page.profile') } component={ Profile } />
		</Tab.Navigator>
	)
}

export default MainTab