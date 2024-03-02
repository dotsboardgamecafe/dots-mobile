import { Button, StyleSheet, View } from 'react-native'
import React, { useCallback } from 'react'

import useStorage from '../../hooks/useStorage'
import { useTranslation } from 'react-i18next'
import { Text, useTheme } from 'react-native-paper'
import { type ThemeType } from '../../models/theme'
import Cup from '../../components/icons/cup'
import CupActive from '../../components/icons/cup-active'

const Login = (): React.ReactNode => {
	const { t } = useTranslation()
	const { onSetLogin, onSetLangEN, onSetLangID } = useStorage()
	const { colors } = useTheme<ThemeType>()

	const handleLogin = useCallback(() => {
		onSetLogin()
	}, [])

	return (
		<View style={ styles.container }>
			<Cup size={24} />
			<CupActive size={32} />
			<Text style={ { color: colors.textColor } }>{ t('login-page.greetings') }</Text>
			<Text>{ t('login-page.greetings') }</Text>
			<Button title='Translate to english' onPress={ onSetLangEN } />
			<Button title='Translate to bahasa' onPress={ onSetLangID } />
			<Button title={ t('login-page.button') } onPress={ handleLogin } />
		</View>
	)
}

export default React.memo(Login)

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})