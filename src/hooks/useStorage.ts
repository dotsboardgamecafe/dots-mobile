import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useMMKVNumber, useMMKVString } from 'react-native-mmkv'

interface UseStorageReturnType {
  isLoggedIn: boolean,
	lang: string,
	token: string,
  onSetLogin: () => void,
  onSetLogout: () => void,
	onSetLangID: () => void,
  onSetLangEN: () => void,
	onSetToken: (token: string) => void,
}

interface UseStorageProps {
	init: boolean
}

/* eslint-disable no-unused-vars */ // silly lint
export enum EnumLogin {
  IS_LOGGED_IN,
  IS_LOGGED_OUT
}

const useStorage = ({ init }: UseStorageProps = { init: false }): UseStorageReturnType => {
	const [loginType, setLoginType] = useMMKVNumber('loginType')
	const [lang, setLang] = useMMKVString('language')
	const [token, setToken] = useMMKVString('token')
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

	const onSetToken = useCallback((token: string) => {
		setToken(token)
	}, [])

	useEffect(() => {
		loadLanguage()
		setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RlIjoiVVNSLTIwMjQwNDA2UFFIRVhFUUlOQyIsImVtYWlsIjoiZGQud2FoeXUxNkBnbWFpbC5jb20iLCJjaGFubmVsIjoiYXBwIiwiZXhwIjoxOTM0MDE0OTUwLCJpc3MiOiJ1c2VyIn0.WrL-012lRheyanehKbRWKIoiWrGcDdVo9Lch-UcUu8Q')
	}, [])

	return {
		isLoggedIn,
		lang: String(lang),
		token: String(token),
		onSetLogin,
		onSetLogout,
		onSetLangID,
		onSetLangEN,
		onSetToken
	}

}

export default useStorage