import React, { useMemo } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native-paper'

import { type TabBarItemProps } from './type'
import styles from './styles'

const TabBarItem = ({ label, isFocused, onPress, icon, iconActive }: TabBarItemProps): React.ReactNode => {

	const usedIcon = useMemo(() => isFocused ? iconActive : icon, [isFocused])

	return (
		<TouchableOpacity
			onPress={ onPress }
			style={ { flex: 1, borderRadius: 40 } }
			activeOpacity={ 1 }
		>
			<View
				style={ styles.itemContainer }
			>
				{ usedIcon }
				<Text style={ [styles.defaultLabelStyle, styles.label, isFocused ? styles.labelFocus : {}] }>{ label }</Text>
			</View>
		</TouchableOpacity>
	)
}

export default React.memo(
	TabBarItem,
	(prevProps, nextProps) => prevProps.isFocused === nextProps.isFocused
)