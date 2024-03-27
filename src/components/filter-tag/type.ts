import { PropsWithChildren, ReactNode } from 'react'
import { GameType } from '../../models/games'

export type FilterTagType = {
  id: number,
  active?: boolean | undefined,
  icon?: ReactNode | undefined,
  label: string,
  onClick?: (id: number) => void | undefined
}