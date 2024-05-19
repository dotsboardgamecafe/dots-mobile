import type React from 'react'

export interface FilterTagType {
  id: number,
  active?: boolean | undefined,
  icon?: React.ReactNode | undefined,
  label: string,
  onClick?: (id: number, label: string) => void
}