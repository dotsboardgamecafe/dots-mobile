import { View } from 'react-native'
import React from 'react'
import Container from '../../components/container'
import styles from './styles'
import withCommon from '../../hoc/with-common'
import Text from '../../components/text'

const PaymentSuccess = (): React.ReactNode => {
	return (
		<Container containerStyle={ styles.container }>
			<View style={ styles.messageWrapper }>
				<Text variant='bodyLargeMedium'>Success Payment</Text>
			</View>
		</Container>
	)
}

export default withCommon(React.memo(PaymentSuccess))