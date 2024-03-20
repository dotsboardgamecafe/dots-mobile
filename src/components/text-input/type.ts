import { ReactNode } from "react"
import { StyleProp, TextInputProps, TextStyle, ViewStyle } from "react-native"

export type TextInputType = {
  containerStyle?: StyleProp<ViewStyle> | undefined,
  inputStyle?: StyleProp<TextStyle> | undefined,
  borderFocusColor?: String | undefined,
  prefix?: ReactNode | undefined,
  suffix?: ReactNode | undefined,
  inputProps?: Omit<TextInputProps, 'style'> | undefined
}