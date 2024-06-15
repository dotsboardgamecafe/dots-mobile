import { type SharedValue } from 'react-native-reanimated'

export interface PageIndicatorProps {
  length: number
  animValue: SharedValue<number>
}