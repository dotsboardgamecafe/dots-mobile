import type React from 'react'
import { type PropsWithChildren } from 'react'
import { type BottomSheetModalProps } from '@gorhom/bottom-sheet'
import { type BottomSheetViewProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetView/types'
import { type BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'

export type AppBottomSheetProps = PropsWithChildren & {
  bsRef: React.Ref<BottomSheetModalMethods>,
  bsProps?: Omit<BottomSheetModalProps, 'ref'> | undefined,
  viewProps?: Omit<BottomSheetViewProps, 'children'> | undefined,
}