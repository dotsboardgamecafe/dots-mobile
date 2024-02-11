import { Button, StyleSheet, View } from 'react-native'
import React, { useCallback } from 'react'

import useStorage from '../../hooks/useStorage'

const Login = (): React.ReactNode => {
	const { onSetLogin } = useStorage()

	const handleLogin = useCallback(() => {
		onSetLogin()
	}, [])

	return (
		<View style={ styles.container }>
			<Button title='Login' onPress={ handleLogin } />
		</View>
	)
}

export default React.memo(Login)

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})