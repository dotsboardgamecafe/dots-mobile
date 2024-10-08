import { useEffect, useState } from 'react'
import { Keyboard } from 'react-native'

export const useKeyboardShown = (): boolean => {
	const [isKeyboardShown, setKeyboardShown] = useState(false)

	useEffect(() => {
		const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
			setKeyboardShown(true)
		})
		const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
			setKeyboardShown(false)
		})

		return () => {
			showSubscription.remove()
			hideSubscription.remove()
		}
	}, [])

	return isKeyboardShown
}