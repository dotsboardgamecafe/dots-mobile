import React, { useCallback } from 'react'
import { type BottomSheetBackdropProps, BottomSheetView, BottomSheetBackdrop, BottomSheetModal as BottomSheetLib } from '@gorhom/bottom-sheet'
import { type AppBottomSheetProps } from './type'

const BottomSheet = ({ bsRef: ref, bsProps, viewProps, children }: AppBottomSheetProps): React.ReactNode => {
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
			ref={ ref }
			index={ 0 }
			enablePanDownToClose
			enableDynamicSizing
			backdropComponent={ bottomSheetBackdrop }
			handleIndicatorStyle={ { display: 'none' } }
			{ ...bsProps }
		>
			<BottomSheetView { ...viewProps }>
				{ children }
			</BottomSheetView>
		</BottomSheetLib>
	)
}

export default BottomSheet