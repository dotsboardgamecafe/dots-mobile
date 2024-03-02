import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTranslation } from "react-i18next";

import Filler from "../screen/filler";
import TabBar from "../components/tabbar";
import Discover from "../screen/discover";

const Home = () => <Filler id="Home" />
const Play = () => <Filler id="Play" />
const Champion = () => <Filler id="Champion" />
const Profile = () => <Filler id="Profile" />

const Tab = createBottomTabNavigator()

const MainTab = () => {
  const { t } = useTranslation()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        freezeOnBlur: true,
      }}
      tabBar={props => <TabBar {...props} />}
    >
      <Tab.Screen name={t('main-page.home')} component={Home} />
      <Tab.Screen name={t('main-page.discover')} component={Discover} />
      <Tab.Screen name={t('main-page.play')} component={Play} />
      <Tab.Screen name={t('main-page.champion')} component={Champion} />
      <Tab.Screen name={t('main-page.profile')} component={Profile} />
    </Tab.Navigator>
  )
}

export default MainTab