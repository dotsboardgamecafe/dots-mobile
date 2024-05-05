import { type PropsWithChildren } from 'react'
import { type StyleProp, type ViewStyle } from 'react-native'

export type ModalType = PropsWithChildren & {
  visible: boolean,
  onDismiss?: () => void,
  style?: StyleProp<ViewStyle> | undefined,
  borderRadius?: number
  dismissable?: boolean
}