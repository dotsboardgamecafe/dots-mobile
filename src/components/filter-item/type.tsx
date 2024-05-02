import type React from 'react'
import { type StyleProp, type ViewStyle } from 'react-native'

export interface FilterItemType {
  label: string,
  name?: string,
  style?: StyleProp<ViewStyle> | undefined,
  prefix?: React.ReactNode,
  suffix?: React.ReactNode,
  onPress?: () => void
}