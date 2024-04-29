import React, { useCallback } from 'react'
import { type BottomSheetBackdropProps, BottomSheetBackdrop, BottomSheetModal as BottomSheetLib, BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { type BottomSheetListProps } from './type'

function BottomSheetList<T>({ bsRef, bsProps, listProps }: BottomSheetListProps<T>): React.ReactNode {
	const bottomSheetBackdrop = useCallback(
		(props: BottomSheetBackdropProps) => (
			<BottomSheetBackdrop
				{ ...props }
				opacity={ .5 }
				disappearsOnIndex={ -1 }
				appearsOnIndex={ 0 }
			/>
		),
		[]
	)

	return (
		<BottomSheetLib
			ref={ bsRef }
			index={ 0 }
			enablePanDownToClose
			enableDynamicSizing
			backdropComponent={ bottomSheetBackdrop }
			handleIndicatorStyle={ { display: 'none' } }
			{ ...bsProps }
		>
			<BottomSheetFlatList { ...listProps }/>
		</BottomSheetLib>
	)
}

export default BottomSheetList