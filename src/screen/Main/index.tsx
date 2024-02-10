import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useCallback } from 'react'
import { useNavigation } from '@react-navigation/native';

import Constants from '../../constants/navigation'

const Main = () => {
  const navigation = useNavigation()

  const navigateToProfile = useCallback(() => {
    navigation.navigate(Constants.ScreenName.Profile as never);
  },[])

  return (
    <View>
      <Button title='Navigate to Profile' onPress={navigateToProfile}  />
    </View>
  )
}

export default React.memo(Main)

const styles = StyleSheet.create({})