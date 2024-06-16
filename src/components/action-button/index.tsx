import React, { useCallback, useMemo } from 'react'
import { TouchableOpacity, View } from 'react-native'

import styles from './styles'
import { type ActionButtonProps } from './type'
import Text from '../text'
import ButtonBg from '../../assets/svg/ButtonBg.svg'
import { ActivityIndicator } from 'react-native-paper'
import { scaleHeight } from '../../utils/pixel.ratio'

const ActionButton = ({ style, onPress, label, suffix, loading, labelStyle }: ActionButtonProps): React.ReactNode => {

	const content = useMemo(() => {
		if (loading) {
			return <ActivityIndicator color='white' size={ scaleHeight(20) } />
		}

		const text = <Text variant='bodyMiddleBold' style={ [styles.label, labelStyle] }>{ label }</Text>

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
	}, [loading, label, labelStyle, suffix])

	const handleClick = useCallback(() => {
		!loading && onPress && onPress()
	}, [loading, onPress])

	return (
		<TouchableOpacity
			style={ [styles.container, style] }
			onPress={ handleClick }
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