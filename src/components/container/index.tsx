import React from 'react'
import { ImageBackground, SafeAreaView, StatusBar, View } from 'react-native'

import styles from './styles'
import { type ContainerProps } from './type'
import { BG } from '../../assets/images'

const Container = ({
	children,
	containerStyle,
	contentStyle,
	barStyle = 'dark-content'
}: ContainerProps): React.ReactNode => {

	return (
		<ImageBackground
			source={ BG }
			resizeMode='cover'
			style={ styles.bg }
		>
			<SafeAreaView style={ [styles.container, containerStyle] }>
				<StatusBar
					barStyle={ barStyle }
					backgroundColor='transparent'
					translucent
				/>
				<View style={ [styles.content, contentStyle] }>
					{ children }
				</View>
			</SafeAreaView>
		</ImageBackground>
	)
}

export default React.memo(Container)