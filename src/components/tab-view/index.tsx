import React, { useCallback, useMemo, useRef, useState } from 'react'
import { View, ScrollView, TouchableOpacity, Animated, } from 'react-native'
import { fullWidth } from '../../utils/pixel.ratio'
import styles from './styles'
import Text from '../text'
import LinearGradient from 'react-native-linear-gradient'
import { colorsTheme } from '../../constants/theme'

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient)

interface TabsType {
  key: string,
  title: string,
  component: () => React.ReactNode
}

interface Props {
  tabs: TabsType[]
}

const TabView = ({ tabs }:Props): React.ReactNode => {
	const [activeTab, setActiveTab] = useState(0)
	const indicatorPosition = useRef(new Animated.Value(0)).current

	const handleTabPress = useCallback((index: number): void => {
		setActiveTab(index)
		Animated.spring(indicatorPosition, {
			toValue: index,
			useNativeDriver: true,
			bounciness: 0
		}).start()
	}, [indicatorPosition])

	const renderTabs = (): React.ReactNode => useMemo(() => {
		return tabs.map((tab, index) => (
			<TouchableOpacity style={ styles.tabsStyle(tabs.length) } key={ index } onPress={ () => { handleTabPress(index) } }>
				<Text
					style={ styles.labelStyle(activeTab === index) }
					variant={ activeTab === index ? 'bodyLargeDemi' : 'bodyLargeMedium' }>
					{ tab.title }
				</Text>
			</TouchableOpacity>
		))
	}, [tabs, handleTabPress, activeTab])

	const renderIndicator = (): React.ReactNode => {
		const indicatorTranslateX = indicatorPosition.interpolate({
			inputRange: [0, tabs.length - 1],
			outputRange: [0, (tabs.length - 1) * fullWidth / tabs.length],
		})

		return (
			<AnimatedLinearGradient
				colors={ [colorsTheme.blueAccent, colorsTheme.yellowAccent, colorsTheme.redAccent] }
				start={ { x: 0, y: 0 } }
				end={ { x: 1, y: 0 } }
				style={ {
					...styles.indicatorStyle(tabs.length),
					transform: [{ translateX: indicatorTranslateX }],
				} }
			/>
		)
	}

	return (
		<View>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={ false }
				bounces={ false }
				removeClippedSubviews
				contentContainerStyle={ styles.contentContainerStyle }
			>
				{ renderTabs() }
				{ renderIndicator() }
			</ScrollView>
			<View>
				{
					tabs[activeTab].component()
				}
			</View>
		</View>
	)
}

export default TabView
