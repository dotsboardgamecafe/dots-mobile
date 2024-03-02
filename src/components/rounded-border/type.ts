import { AnimatableNumericValue, StyleProp, ViewProps, ViewStyle } from "react-native"

export type RoundedBorderProps = ViewProps & {
  contentStyle?: StyleProp<ViewStyle> | undefined,
  radius?: number | undefined,
  borderWidth?: number | undefined,
}