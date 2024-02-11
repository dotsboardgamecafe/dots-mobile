import {
	Alert, Button, FlatList, StyleSheet, Text, View
} from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

import Constants from '../../constants/navigation'
import { useGetProductsQuery } from '../../store/products'
import { useDispatch, useSelector } from 'react-redux'
import { type RootState } from '../../store'
import { onHasLandingAction } from '../../store/misc'

const Main = ():React.ReactNode => {
	const misc = useSelector((state:RootState) => state.misc)
	const dispatch = useDispatch()
	const navigation = useNavigation()
	const { data } = useGetProductsQuery()

	const navigateToProfile = useCallback(() => {
		navigation.navigate(Constants.ScreenName.Profile as never)
		dispatch(onHasLandingAction('main'))
	}, [])

	useEffect(() => {
		if (misc.main) {
			Alert.alert('the screen have been landed')
		}
	}, [])

	return (
		<View style={ styles.container }>
			<FlatList
				data={ data }
				renderItem={ ({ item }) => (
					<View key={ item.product_id }>
						<Text>{ item.name }</Text>
						<Text>{ item.price }</Text>
						<Text>{ item.description }</Text>
					</View>
				) }
				keyExtractor={ item => item.product_id.toString() }
				ItemSeparatorComponent={ () => <View style={ { borderWidth: 1, marginVertical: 10, borderColor: '#ddd' } } /> }
			/>
			<Button title='Navigate to Profile' onPress={ navigateToProfile }  />
		</View>
	)
}

export default React.memo(Main)

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})