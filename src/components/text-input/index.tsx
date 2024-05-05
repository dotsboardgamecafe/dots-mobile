import React, { useMemo, useState } from 'react'
import { View, TextInput as TextInputNative } from 'react-native'
import { type StyleProps } from 'react-native-reanimated'

import { type TextInputType } from './type'
import styles from './styles'
import Text from '../text'

const TextInput = ({
	containerStyle,
	inputStyle,
	borderFocusColor,
	prefix,
	suffix,
	inputProps,
	errors
}: TextInputType): React.ReactNode => {

	const [isFocused, setFocused] = useState(false)

	const is = useMemo(() => {
		let res = { ...styles.input, ...(inputStyle as StyleProps) }

		if (prefix) res = { ...res, ...styles.isPrefix }
		if (suffix) res = { ...res, ...styles.isSuffix }

		return res
	}, [prefix, suffix])

	return (
		<View style={ { alignSelf: 'stretch' } }>
			<View
				style={ [
					styles.container,
					borderFocusColor && isFocused && { borderColor: borderFocusColor } as any,
					errors && styles.error,
					containerStyle
				] }
			>
				{ prefix }

				<TextInputNative
					style={ is }
					onFocus={ e => {
						setFocused(true)
						if (typeof inputProps?.onFocus === 'function')
							inputProps.onFocus(e)
					} }
					onBlur={ e => {
						setFocused(false)
						if (typeof inputProps?.onBlur === 'function')
							inputProps.onBlur(e)
					} }
					{ ...inputProps }
				/>

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