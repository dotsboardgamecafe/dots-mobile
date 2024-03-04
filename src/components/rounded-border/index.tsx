import React from "react"
import { View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { useTheme } from "react-native-paper"

import { ThemeType } from "../../models/theme"
import styles from "./styles"
import { RoundedBorderProps } from "./type"

const RoundedBorder = ({ children, radius, borderWidth }: RoundedBorderProps): React.ReactNode => {
  const contentRadius = radius ? radius - (borderWidth ?? 0) : 0
  const { colors } = useTheme<ThemeType>()

  return (
    <LinearGradient
      colors={[colors.blueAccent, colors.yellowAccent, colors.redAccent]}
      start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
      style={[styles.border, { borderRadius: radius }]}
    >
      <View style={[styles.container, { margin: 1, borderRadius: contentRadius }]}>
        {children}
      </View>
    </LinearGradient>
  )
}

export default React.memo(RoundedBorder)