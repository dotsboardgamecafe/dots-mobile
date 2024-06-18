import Toast from 'react-native-toast-message'

const currencyFormatter = (number: number): string => {
	try {
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR',
			minimumIntegerDigits: 4,
		}).format(number)
			.replace(',00', '')
	} catch (error) {
		Toast.show({
			type: 'error',
			text1: JSON.stringify(error)
		})
	}
	return String(number)
}

export { currencyFormatter }