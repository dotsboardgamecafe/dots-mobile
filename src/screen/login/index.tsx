import { Button, StyleSheet, View } from 'react-native'
import React, { useCallback, useEffect } from 'react'

import { useMMKVBoolean } from 'react-native-mmkv'
import { useNavigation } from '@react-navigation/native'

const Login = (): React.ReactNode => {
	const [login, setLogin] = useMMKVBoolean('isLogin')
	const { navigate } = useNavigation()

	const handleLogin = useCallback(() => {
		setLogin(true)
	}, [])

	useEffect(() => {
		if (login ?? false) {
			navigate('main' as never)
		}
	}, [login])

	return (
		<View style={ styles.container }>
			<Button title='Login' onPress={ handleLogin } />
		</View>
	)
}

export default Login

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})