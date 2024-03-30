import { type ReactNode } from 'react'
import { type StyleProp, type TextInputProps, type TextStyle, type ViewStyle } from 'react-native'

export interface TextInputType {
  containerStyle?: StyleProp<ViewStyle> | undefined,
  inputStyle?: StyleProp<TextStyle> | undefined,
  borderFocusColor?: string | undefined,
  prefix?: ReactNode | undefined,
  suffix?: ReactNode | undefined,
  inputProps?: Omit<TextInputProps, 'style'> | undefined
}