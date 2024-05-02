import type React from 'react'
import { type BottomSheetModalProps } from '@gorhom/bottom-sheet'
import { type BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import { type BottomSheetFlatListProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetScrollable/types'

export interface BottomSheetListProps<T> {
  bsRef: React.Ref<BottomSheetModalMethods>,
  bsProps?: Omit<BottomSheetModalProps, 'ref' | 'children'> | undefined,
  listProps: BottomSheetFlatListProps<T>,
}