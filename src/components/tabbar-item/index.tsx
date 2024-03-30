import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native-paper'

import { type TabBarItemProps } from './type'
import { scaleWidth } from '../../utils/pixel.ratio'
import styles from './styles'
import CupActive from '../../assets/svg/cup-active'
import Cup from '../../assets/svg/cup'

const TabBarItem = ({ label, isFocused, onPress }: TabBarItemProps): React.ReactNode => {

	// TODO: implement other icons (waiting for fix solution to import svg)
	const icon = isFocused ?
		<CupActive size={ scaleWidth(36) } /> :
		<Cup size={ scaleWidth(20) } />

	return (
		<TouchableOpacity
			onPress={ onPress }
			style={ { flex: 1, borderRadius: 40 } }
			activeOpacity={ 1 }
		>
			<View
				style={ styles.itemContainer }
			>
				{ icon }
				<Text style={ [styles.defaultLabelStyle, styles.label, isFocused ? styles.labelFocus : {}] }>{ label }</Text>
			</View>
		</TouchableOpacity>
	)
}

export default React.memo(
	TabBarItem,
	(prevProps, nextProps) => prevProps.isFocused == nextProps.isFocused
)