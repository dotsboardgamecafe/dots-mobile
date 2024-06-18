import React, { useCallback, useMemo, useState } from 'react'
import { View, TextInput as TextInputNative, type NativeSyntheticEvent, type TextInputFocusEventData } from 'react-native'
import { type StyleProps } from 'react-native-reanimated'

import { type TextInputType } from './type'
import styles from './styles'
import Text from '../text'
import { BottomSheetTextInput } from '@gorhom/bottom-sheet'

const TextInput = ({
	containerStyle,
	inputStyle,
	borderFocusColor,
	prefix,
	suffix,
	inputProps,
	errors,
	isBottomSheet
}: TextInputType): React.ReactNode => {

	const [isFocused, setFocused] = useState(false)

	const is = useMemo(() => {
		let res = { ...styles.input, ...(inputStyle as StyleProps) }

		if (prefix) res = { ...res, ...styles.isPrefix }
		if (suffix) res = { ...res, ...styles.isSuffix }

		return res
	}, [prefix, suffix])

	const _handleFocus = useCallback((event: NativeSyntheticEvent<TextInputFocusEventData>) => {
		setFocused(true)
		if (typeof inputProps?.onFocus === 'function') inputProps.onFocus(event)
	}, [inputProps])

	const _handleBlur = useCallback((event: NativeSyntheticEvent<TextInputFocusEventData>) => {
		setFocused(false)
		if (typeof inputProps?.onBlur === 'function') inputProps.onBlur(event)
	}, [inputProps])

	const _renderTextInput = useMemo(() => {
		if (isBottomSheet) {
			return (
				<BottomSheetTextInput
					style={ is }
					onFocus={ _handleFocus }
					onBlur={ _handleBlur }
					{ ...inputProps }
				/>
			)
		}

		return (
			<TextInputNative
				style={ is }
				onFocus={ _handleFocus }
				onBlur={ _handleBlur }
				{ ...inputProps }
			/>
		)
	}, [_handleFocus, _handleBlur, isBottomSheet])

	return (
		<View style={ containerStyle }>
			<View
				style={ [
					styles.container,
					borderFocusColor && isFocused && { borderColor: borderFocusColor } as any,
					errors && styles.error,
				] }
			>
				{ prefix }
				{ _renderTextInput }
				{ suffix }
			</View>
			{ errors?.message && <Text variant='bodyMiddleRegular' style={ styles.textError }>{ errors.message }</Text> }
		</View>
	)
}

export default React.memo(
	TextInput,
	// (prev, next) => prev.containerStyle == next.containerStyle
	//   && prev.suffix == next.suffix
)