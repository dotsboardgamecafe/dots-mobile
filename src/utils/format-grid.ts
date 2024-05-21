interface GridData<T> {
	numColumns: number
	resultData: T[]
}

export const formatGridData = <T>(data: T[]): GridData<T> => {
	const numColumns = 3
	if (data.length % numColumns === 0) {
		return {
			numColumns,
			resultData: data
		}
	}
	let incrementItem = 0
	for (let i = numColumns; i < data.length + numColumns; i += numColumns) {
		if (i > data.length) {
			incrementItem = i
		}
	}
	const newArray = Array(incrementItem - data.length).fill(null)

	const resultData = data.concat(newArray)

	return {
		numColumns,
		resultData
	}
}