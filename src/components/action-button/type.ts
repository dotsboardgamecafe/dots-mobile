import { GestureResponderEvent, StyleProp, ViewStyle } from "react-native"

export type ActionButtonProps = {
  style?: StyleProp<ViewStyle> | undefined,
  onPress?: ((event: GestureResponderEvent) => void) | undefined,
  label?: String | undefined
}