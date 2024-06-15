import React from 'react'
import Modal from '../modal'
import Text from '../text'
import { ActivityIndicator, useTheme } from 'react-native-paper'
import { type ThemeType } from '../../models/theme'
import { scaleVertical } from '../../utils/pixel.ratio'

const LoadingDialog = (props: {title: string, visible: boolean}): React.ReactNode => {
	const { colors } = useTheme<ThemeType>()
	return (
		<Modal
			visible
			dismissable={ false }
			style={ {
				justifyContent: 'center',
				alignItems: 'center'
			} }
		>
			<Text variant='headingMedium'>{ props.title }</Text>
			<ActivityIndicator
				color={ colors.blueAccent }
				style={ {
					marginTop: scaleVertical(16)
				} } />
		</Modal>
	)
}

export default React.memo(LoadingDialog)