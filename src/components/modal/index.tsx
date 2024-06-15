import React from 'react'
import { Modal as ModalLib, Portal, useTheme } from 'react-native-paper'

import { type ModalType } from './type'
import createStyle from './styles'
import { type ThemeType } from '../../models/theme'

const Modal = ({ visible, onDismiss, dismissable, style, children, borderRadius }: ModalType): React.ReactNode => {
	const theme = useTheme<ThemeType>()
	const styles = createStyle(theme)

	return (
		<Portal>
			<ModalLib
				visible={ visible }
				onDismiss={ onDismiss }
				contentContainerStyle={ [styles.container, style, { borderRadius }] }
				dismissable={ dismissable }
			>
				{ children }
			</ModalLib>
		</Portal>
	)
}

export default React.memo(Modal)