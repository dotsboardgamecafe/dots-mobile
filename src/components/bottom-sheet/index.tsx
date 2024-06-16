import React, { useCallback, useEffect } from 'react'
import {
	type BottomSheetBackdropProps, BottomSheetView, BottomSheetBackdrop, BottomSheetModal as BottomSheetLib, useBottomSheetModal
} from '@gorhom/bottom-sheet'
import { type AppBottomSheetProps } from './type'
import { BackHandler } from 'react-native'

const BottomSheet = ({ bsRef: ref, bsProps, viewProps, children, pressBehavior }: AppBottomSheetProps): React.ReactNode => {
	const { dismiss } = useBottomSheetModal()
	const bottomSheetBackdrop = useCallback(
		(props: BottomSheetBackdropProps) => (
			<BottomSheetBackdrop
				{ ...props }
				opacity={ .5 }
				disappearsOnIndex={ -1 }
				appearsOnIndex={ 0 }
				pressBehavior={ pressBehavior }
			/>
		),
		[]
	)

	useEffect(() => {
		const onBackPress = (): boolean => { return dismiss() }
		BackHandler.addEventListener('hardwareBackPress', onBackPress)
		return () => { BackHandler.removeEventListener('hardwareBackPress', onBackPress) }
	}, [])

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