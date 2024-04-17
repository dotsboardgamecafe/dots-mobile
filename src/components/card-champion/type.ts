import { type PropsWithChildren } from 'react'

export type CardChampionType = PropsWithChildren & {
  title: string,
  onClickSeeMore?: () => void | undefined
}