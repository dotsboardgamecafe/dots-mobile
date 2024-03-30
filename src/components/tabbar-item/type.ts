import { type ReactNode } from 'react'

export interface TabBarItemProps {
  label: string,
  isFocused: boolean,
  icon: ReactNode,
  iconActive: ReactNode,
  onPress: () => void | undefined
}