import React from 'react'
import { TouchableOpacity, View } from 'react-native'

import styles from './styles'
import { type ActionButtonProps } from './type'
import Text from '../text'

const ActionButton = ({ style, onPress, label }: ActionButtonProps): React.ReactNode => {

	return (
		<TouchableOpacity
			style={ [styles.container, style] }
			onPress={ onPress }
			activeOpacity={ 1 }
		>
			<View style={ styles.rectangle1 }>
				<View style={ styles.rectangle2 } />
				<Text variant='bodyMiddleBold' style={ styles.label }>{ label }</Text>
			</View>
		</TouchableOpacity>
	)
}

export default React.memo(ActionButton)