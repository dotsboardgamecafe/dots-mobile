const currencyFormatter = (number: number): string => {
	return new Intl.NumberFormat('id-ID', {
		style: 'currency',
		currency: 'IDR',
		minimumIntegerDigits: 4,
		maximumFractionDigits: 0,
	}).format(number)
}

export { currencyFormatter }