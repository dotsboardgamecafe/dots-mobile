import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect } from 'react'

import { MMKV, useMMKVBoolean } from 'react-native-mmkv'
import { useNavigation } from '@react-navigation/native';


const Login = () => {
  const [login, setLogin] = useMMKVBoolean('isLogin')
  const {navigate} = useNavigation()

  const handleLogin = useCallback(() => {
    setLogin(true)
  },[])

  useEffect(() => {
    if(login) {
      navigate('main' as never)
    }
  },[login])


  return (
    <View>
      <Button title='Login' onPress={handleLogin} />
    </View>
  )
}

export default Login

const styles = StyleSheet.create({})