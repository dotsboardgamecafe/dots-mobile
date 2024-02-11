import { useCallback } from 'react'
import { useMMKVNumber } from 'react-native-mmkv'

interface UseStorageType {
  isLoggedIn: boolean,
  onSetLogin: () => void,
  onSetLogout: () => void
}

/* eslint-disable no-unused-vars */ // silly lint
enum EnumLogin {
  IS_LOGGED_IN,
  IS_LOGGED_OUT
}

const useStorage = (): UseStorageType => {
	const [loginType, setLoginType] = useMMKVNumber('loginType')

	const onSetLogin = useCallback(() => {
		setLoginType(EnumLogin.IS_LOGGED_IN)
	}, [])

	const onSetLogout = useCallback(() => {
		setLoginType(EnumLogin.IS_LOGGED_OUT)
	}, [])

	const isLoggedIn = Boolean(loginType === EnumLogin.IS_LOGGED_IN)

	return {
		isLoggedIn,
		onSetLogin,
		onSetLogout
	}

}

export default useStorage