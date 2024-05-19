import {  ActivityIndicator, View, StyleSheet } from 'react-native'
import React from 'react'
import { colorsTheme } from '../../constants/theme'
import { scaleWidth } from '../../utils/pixel.ratio'
import { Modal, Portal } from 'react-native-paper'

interface LoadingProps {
  isLoading: boolean
}

const Loading = ({ isLoading }: LoadingProps): React.ReactNode => {
	return (
		<Portal>
			<Modal visible={ isLoading }>
				<View style={ styles.contentStyle }>
					<ActivityIndicator size={ scaleWidth(48) } color={ colorsTheme.background }/>
				</View>
			</Modal>
		</Portal>
	)
}

const styles = StyleSheet.create({
	contentStyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,0.5)'
	}
})

export default Loading