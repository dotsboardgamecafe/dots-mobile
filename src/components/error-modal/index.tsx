import React from 'react'
import { CloseCircle, Warning2 } from 'iconsax-react-native'
import { type BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import { useBottomSheetModal } from '@gorhom/bottom-sheet'
import Text from '../text'
import { scaleWidth } from '../../utils/pixel.ratio'
import ActionButton from '../action-button'
import BottomSheet from '../bottom-sheet'
import { useTheme } from 'react-native-paper'
import { type ThemeType } from '../../models/theme'
import styles from './styles'

export interface DialogProps {
	bsRef: React.Ref<BottomSheetModalMethods>
	title?: string
	message?: string
	actionLabel?: string
	onClickAction?: () => void
	onDismiss?: () => void
}

const ErrorModal = ({ bsRef: ref, title, message, actionLabel, onClickAction, onDismiss }: DialogProps): React.ReactNode => {
	const theme = useTheme<ThemeType>()
	const { dismiss } = useBottomSheetModal()

	return (
		<BottomSheet
			bsRef={ ref }
			bsProps={ { onDismiss } }
			viewProps={ { style: styles.bottomSheetView } }
		>
			<Warning2
				size={ scaleWidth(120) }
				color={ theme.colors.redAccent }
			/>
			<CloseCircle
				size={ scaleWidth(36) }
				color={ theme.colors.onBackground }
				style={ {
					position: 'absolute',
					end: 0,
					top: 0
				} }
				onPress={ () => dismiss() }
			/>
			<Text
				variant='bodyDoubleExtraLargeBold'
				style={ styles.successTitle }
			>
				{ title }
			</Text>
			<Text
				variant='bodyMiddleMedium'
				style={ styles.successInfo }
			>
				{ message }
			</Text>
			{ actionLabel &&
				<ActionButton
					style={ styles.successAction }
					label={ actionLabel }
					onPress={ onClickAction }
				/>
			}
		</BottomSheet>
	)
}

export default React.memo(ErrorModal)