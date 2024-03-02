import React from "react"
import { View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { RoundedBorderProps } from "./type"
import styles from "./styles"

const RoundedBorder = ({ children, radius, borderWidth }: RoundedBorderProps): React.ReactNode => {
  const contentRadius = radius ? radius - (borderWidth ?? 0) : 0

  return (
    <LinearGradient
      colors={['#3E4486', '#ECE270', '#B73F40']}
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