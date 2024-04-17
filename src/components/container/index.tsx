import React, { useMemo } from 'react'
import { ImageBackground, SafeAreaView, StatusBar, View } from 'react-native'

import styles from './styles'
import { type ContainerProps } from './type'
import { BG } from '../../assets/images'

const Container = ({ children, containerStyle, contentStyle, manualAppbar, barStyle }: ContainerProps): React.ReactNode => {

	const renderContent = useMemo(() => {
		if (manualAppbar) {
			return (
				<React.Fragment>
					<StatusBar
						barStyle={ barStyle }
						backgroundColor='transparent'
						translucent
					/>
					{ children }
				</React.Fragment>
			)
		}

		return (
			<SafeAreaView style={ [styles.container, containerStyle] }>
				<StatusBar
					barStyle='dark-content'
					backgroundColor='transparent'
					translucent
				/>
				<View style={ [styles.content, contentStyle] }>
					{ children }
				</View>
			</SafeAreaView>
		)
	}, [manualAppbar])

	return (
		<ImageBackground
			source={ BG }
			resizeMode='cover'
			style={ styles.bg }
		>
			{ renderContent }
		</ImageBackground>
	)
}

export default React.memo(Container)