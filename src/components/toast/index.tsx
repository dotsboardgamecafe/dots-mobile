import React from 'react'
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message'
import colors from '../../constants/colors'
import { scaleFont, scaleHeight, scaleWidth } from '../../utils/pixel.ratio'
import { StyleSheet, View } from 'react-native'

const toastConfig = {
	success: (props: any) => (
		<View onTouchEnd={ () => { Toast.hide() } }>
			<BaseToast
				{ ...props }
				style={ [styles.containerStyle, styles.successStyle] }
				contentContainerStyle={ styles.contentContainerStyle }
				text1Style={ styles.textStyle }
			/>
		</View>
	),
	error: (props: any) => (
		<View onTouchEnd={ () => { Toast.hide() } }>
			<ErrorToast
				{ ...props }
				style={ [styles.containerStyle, styles.errorStyle] }
				contentContainerStyle={ styles.contentContainerStyle }
				text1Style={ styles.textStyle }
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	textStyle: {
		fontSize: scaleFont(16),
		color: colors.lightTheme.background,
		fontFamily: 'FuturaPT-Bold',
		fontWeight: '600',
	},
	containerStyle: {
		borderLeftWidth: 0,
		marginTop: scaleHeight(20),
		height: scaleHeight(50)
	},
	contentContainerStyle: {
		paddingHorizontal: scaleWidth(16)
	},
	successStyle: {
		backgroundColor: colors.darkTheme.blueSuccess
	},
	errorStyle: {
		backgroundColor: 'rgba(183, 63, 64, 1)'
	}
})

export default toastConfig