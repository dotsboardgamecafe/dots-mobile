import { type DimensionValue, type GestureResponderEvent, type StyleProp, type ViewStyle } from 'react-native'

export interface ActionButton2Props {
  style?: StyleProp<ViewStyle> | undefined,
  onPress?: ((event: GestureResponderEvent) => void) | undefined,
  label?: string | undefined,
  sketchLeft?: DimensionValue | undefined
}