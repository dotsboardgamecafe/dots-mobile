import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useMMKVNumber, useMMKVObject, useMMKVString } from 'react-native-mmkv'
import { type User } from '../models/profile'
import { OneSignal } from 'react-native-onesignal'

interface UseStorageReturnType {
  isLoggedIn: boolean,
	lang: string,
	email: string,
	user?: User,
  onSetLogin: () => void,
  onSetLogout: () => void,
	onSetLangID: () => void,
  onSetLangEN: () => void,
	onSetUser: (user: User) => void,
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
	const [user, setUser] = useMMKVObject<User>('user')
	const { i18n } = useTranslation()

	const onSetLogin = useCallback(() => {
		setLoginType(EnumLogin.IS_LOGGED_IN)
	}, [])

	const onSetLogout = useCallback(() => {
		setLoginType(EnumLogin.IS_LOGGED_OUT)
		setUser(undefined)
	}, [])

	const onSetLangID = useCallback(async() => {
		await i18n.changeLanguage('id')
		setLang('id')
	}, [])

	const onSetLangEN = useCallback(async() => {
		await i18n.changeLanguage('en')
		setLang('en')
	}, [])

	const loadLanguage = useCallback(async() => {
		if (init) {
			const storedLanguage = lang
			if (storedLanguage) {
				await i18n.changeLanguage(storedLanguage)
			}
		}
	}, [init])

	const onSetUser = useCallback((data: User) => {
		setUser(data)

		data.email && OneSignal.User.addEmail(data.email)
		data.user_code && OneSignal.User.addTag('user_code', data.user_code)
	}, [])

	useEffect(() => {
		loadLanguage()
	}, [])

	return {
		isLoggedIn: Boolean(loginType === EnumLogin.IS_LOGGED_IN),
		lang: String(lang),
		email: String(user?.email) ?? '',
		user,
		onSetLogin,
		onSetLogout,
		onSetLangID,
		onSetLangEN,
		onSetUser
	}

}

export default useStorage