import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useMMKVNumber, useMMKVString } from 'react-native-mmkv'

interface UseStorageReturnType {
  isLoggedIn: boolean,
	lang: string
  onSetLogin: () => void,
  onSetLogout: () => void,
	onSetLangID: () => void,
  onSetLangEN: () => void
}

interface UseStorageProps {
	init: boolean
}

/* eslint-disable no-unused-vars */ // silly lint
enum EnumLogin {
  IS_LOGGED_IN,
  IS_LOGGED_OUT
}

const useStorage = ({ init }: UseStorageProps = { init: false }): UseStorageReturnType => {
	const [loginType, setLoginType] = useMMKVNumber('loginType')
	const [lang, setLang] = useMMKVString('language')
	const { i18n } = useTranslation()

	const onSetLogin = useCallback(() => {
		setLoginType(EnumLogin.IS_LOGGED_IN)
	}, [])

	const onSetLogout = useCallback(() => {
		setLoginType(EnumLogin.IS_LOGGED_OUT)
	}, [])

	const onSetLangID = useCallback(async() => {
		await i18n.changeLanguage('id')
		setLang('id')
	}, [])

	const onSetLangEN = useCallback(async() => {
		await i18n.changeLanguage('en')
		setLang('en')
	}, [])

	const isLoggedIn = Boolean(loginType === EnumLogin.IS_LOGGED_IN)

	const loadLanguage = useCallback(async() => {
		if (init) {
			const storedLanguage = lang
			if (storedLanguage) {
				await i18n.changeLanguage(storedLanguage)
			}
		}
	}, [init])

	useEffect(() => {
		loadLanguage()
	}, [])

	return {
		isLoggedIn,
		lang: String(lang),
		onSetLogin,
		onSetLogout,
		onSetLangID,
		onSetLangEN
	}

}

export default useStorage