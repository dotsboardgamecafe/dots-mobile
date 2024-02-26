import { View, Button, Alert } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { useAddProductMutation } from '../../store/products'
import { useNavigation } from '@react-navigation/native'
import { type Products } from '../../models/products'

const Profile = ():React.ReactNode => {
	const { goBack } = useNavigation()
	const [
		addProduct,
		{
			isSuccess,
			isError,
			data,
		}
	] = useAddProductMutation()

	const onSubmitSuccess = useCallback(async():Promise<void> => {
		const payload:Partial<Products> = {
			name: 'Item B',
			price: 2000,
			description: 'helloworld'
		}
    
		await addProduct({ ...payload })
	}, [addProduct])

	const onSubmitError = useCallback(async() => {

		const payload:Partial<Products> = {
			name: '',
			price: 0,
			description: ''
		}

		await addProduct({ ...payload })
	}, [addProduct])

	useEffect(() => {
		if (isSuccess) goBack()

		if (isError) {
			Alert.alert('error bos')
		}
	}, [isSuccess, isError, data])

	return (
		<View>
			<Button title='Success' onPress={ onSubmitSuccess }  />
			<Button title='error' onPress={ onSubmitError }  />
		</View>
	)
}

export default React.memo(Profile)
