import type React from 'react'

export interface FilterItemType {
  label: string,
  prefix?: React.ReactNode,
  suffix?: React.ReactNode,
  onPress?: () => void
}