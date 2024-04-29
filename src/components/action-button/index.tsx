import React, { useMemo } from 'react'
import { TouchableOpacity, View } from 'react-native'

import styles from './styles'
import { type ActionButtonProps } from './type'
import Text from '../text'
import ButtonBg from '../../assets/svg/ButtonBg.svg'

const ActionButton = ({ style, onPress, label, suffix }: ActionButtonProps): React.ReactNode => {

	const content = useMemo(() => {
		const text = <Text variant='bodyMiddleBold' style={ styles.label }>{ label }</Text>

		if (suffix) {
			return (
				<View style={ {
					flexDirection: 'row',
					alignItems: 'center'
				} }>
					{ text }
					{ suffix }
				</View>
			)
		}

		return text
	}, [])

	return (
		<TouchableOpacity
			style={ [styles.container, style] }
			onPress={ onPress }
			activeOpacity={ 1 }
		>
			<ButtonBg
				width={ '100%' }
				style={ styles.bg }
			/>
			{ content }
		</TouchableOpacity>
	)
}

export default React.memo(ActionButton)