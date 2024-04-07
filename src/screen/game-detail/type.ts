import { type StyleProp, type ViewStyle } from 'react-native'

export interface BlushProps {
  color: string,
  distance: number,
  style: StyleProp<ViewStyle>,
  opacity: number
}