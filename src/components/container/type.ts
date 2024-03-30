import { type PropsWithChildren } from 'react'
import { type StyleProp, type ViewStyle } from 'react-native'

export type ContainerProps = PropsWithChildren & {
  containerStyle?: StyleProp<ViewStyle> | undefined,
  contentStyle?: StyleProp<ViewStyle> | undefined,
}