import type React from 'react'

export interface FilterTagType {
  id: number,
  code: string
  active?: boolean | undefined,
  icon?: React.ReactNode | undefined,
  label: string,
  onClick?: (id: number, code: string, label: string) => void
}