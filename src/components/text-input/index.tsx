import React, { useMemo, useState } from 'react'
import { View, TextInput as TextInputNative, ViewStyle } from 'react-native'
import { useTheme } from 'react-native-paper'

import { TextInputType } from './type'
import createStyle from './styles'
import { ThemeType } from '../../models/theme'

const TextInput = ({
  containerStyle,
  inputStyle,
  borderFocusColor,
  prefix,
  suffix,
  inputProps
}: TextInputType): React.ReactNode => {

  const styles = createStyle(useTheme<ThemeType>())
  const is = useMemo(() => {
    let res = { ...styles.input, ...(inputStyle as Object) }

    if (prefix) res = { ...res, ...styles.isPrefix }
    if (suffix) res = { ...res, ...styles.isSuffix }

    return res
  }, [prefix, suffix])

  const [isFocused, setFocused] = useState(false)

  return (
    <View style={[
      styles.container,
      borderFocusColor && isFocused && [{ borderColor: borderFocusColor } as ViewStyle],
      containerStyle
    ]}>
      {prefix}

      <TextInputNative
        style={is}
        onFocus={(e) => {
          setFocused(true)
          if (typeof inputProps?.onFocus === 'function')
            inputProps!.onFocus(e)
        }}
        onBlur={(e) => {
          setFocused(false)
          if (typeof inputProps?.onBlur === 'function')
            inputProps!.onBlur(e)
        }}
        {...inputProps}
      />

      {suffix}
    </View>
  )
}

export default React.memo(
  TextInput,
  // (prev, next) => prev.containerStyle == next.containerStyle
  //   && prev.suffix == next.suffix
)