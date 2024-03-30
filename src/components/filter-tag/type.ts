import { type ReactNode } from 'react'

export interface FilterTagType {
  id: number,
  active?: boolean | undefined,
  icon?: ReactNode | undefined,
  label: string,
  onClick?: (id: number) => void | undefined
}