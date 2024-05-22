import { type ReactNode } from 'react'
import { type TextStyle, type StyleProp, type ViewStyle } from 'react-native'

export interface ActionButtonProps {
  style?: StyleProp<ViewStyle> | undefined,
  onPress?: () => void,
  label?: string | undefined,
  suffix?: ReactNode | undefined,
  loading?: boolean,
  labelStyle?: StyleProp<TextStyle> | undefined
}