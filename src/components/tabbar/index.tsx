import React, {  } from 'react'
import { type BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { SafeAreaView, View } from 'react-native'

import styles from './styles'
import TabbarItem from '../tabbar-item'
import { useKeyboardShown } from '../../utils/keyboard'

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps): React.ReactNode => {
	const isKeyboardShown = useKeyboardShown()

	if (isKeyboardShown)
		return (<View />)

	return (
		<SafeAreaView>
			<View style={ styles.items }>
				{ state.routes.map((route, index) => {
					const { options } = descriptors[route.key]
					const label =
            options.tabBarLabel ?? options.title ?? route.name
					const isFocused = state.index === index

					const onPress = (): void => {
						const event = navigation.emit({
							type: 'tabPress',
							target: route.key,
							canPreventDefault: true,
						})
						if (!isFocused && !event.defaultPrevented) {
							navigation.navigate(route.name, route.params)
						}
					}
					return (
						<TabbarItem
							key={ label as string }
							label={ label as string }
							isFocused={ isFocused }
							onPress={ onPress }
						/>
					)
				}) }
			</View>
		</SafeAreaView>
	)
}

export default React.memo(TabBar)