import type React from 'react'
import { type BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'

export interface ShareBottomSheetProps {
  sRef: React.Ref<BottomSheetModalMethods>,
  onShare: (type: string) => void
}