import { Text } from 'react-native'
import React from 'react'
import Container from '../../components/container'
import Header from '../../components/header'

const AccountInformation = (): React.ReactNode => {
	return (
		<Container>
			<Header title='Account Information' />
			<Text>AccountInformation</Text>
		</Container>
	)
}

export default AccountInformation