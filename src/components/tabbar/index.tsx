import React, { useCallback } from 'react'
import { type BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { useTranslation } from 'react-i18next'
import { SafeAreaView, View } from 'react-native'

import styles from './styles'
import TabbarItem from '../tabbar-item'
import { useKeyboardShown } from '../../utils/keyboard'
import Home from '../../assets/svg/Home.svg'
import HomeActive from '../../assets/svg/HomeActive.svg'
import Discover from '../../assets/svg/Discover.svg'
import DiscoverActive from '../../assets/svg/DiscoverActive.svg'
import Game from '../../assets/svg/Game.svg'
import GameActive from '../../assets/svg/GameActive.svg'
import Cup from '../../assets/svg/Cup.svg'
import CupActive from '../../assets/svg/CupActive.svg'
import Profile from '../../assets/svg/Profile.svg'
import { scaleHeight, scaleWidth } from '../../utils/pixel.ratio'
import navigationConstant from '../../constants/navigation'

const {
	screenName: {
		home,
		discover,
		play,
		champion,
	}
} = navigationConstant

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps): React.ReactNode => {
	const isKeyboardShown = useKeyboardShown()
	const { t } = useTranslation()

	const getIcon = useCallback((label: string) => {
		const props = {
			width: scaleWidth(28),
			height: scaleHeight(28)
		}
		const propsActive = {
			width: scaleWidth(36),
			height: scaleHeight(36)
		}

		switch (label) {
			case home: {
				return {
					icon: <Home { ...props } />,
					iconActive: <HomeActive { ...propsActive } />
				}
			}
			case discover: {
				return {
					icon: <Discover { ...props } />,
					iconActive: <DiscoverActive { ...propsActive } />
				}
			}
			case play: {
				return {
					icon: <Game { ...props } />,
					iconActive: <GameActive { ...propsActive } />
				}
			}
			case champion: {
				return {
					icon: <Cup { ...props } />,
					iconActive: <CupActive { ...propsActive } />
				}
			}
			default: {
				return {
					icon: <Profile { ...props } />,
					iconActive: <HomeActive { ...propsActive } />
				}
			}
		}
	}, [])

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
							label={ t(`main-page.${label as string }`) }
							isFocused={ isFocused }
							onPress={ onPress }
							{ ...getIcon(label as string) }
						/>
					)
				}) }
			</View>
		</SafeAreaView>
	)
}

export default React.memo(TabBar)