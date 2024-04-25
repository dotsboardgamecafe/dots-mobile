import { type ReactNode } from 'react'
import { type GestureResponderEvent, type StyleProp, type ViewStyle } from 'react-native'

export interface ActionButtonProps {
  style?: StyleProp<ViewStyle> | undefined,
  onPress?: ((event: GestureResponderEvent) => void) | undefined,
  label?: string | undefined,
  suffix?: ReactNode | undefined
}