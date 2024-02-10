import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Constants from '../constants/navigation';
import Main from '../screen/Main';
import Profile from '../screen/Profile';

const Stack = createNativeStackNavigator();

const Navigations = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={Constants.ScreenName.Main}>
        <Stack.Screen 
          name={Constants.ScreenName.Main}
          component={Main}
        />
        <Stack.Screen 
          name={Constants.ScreenName.Profile}
          component={Profile}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigations
