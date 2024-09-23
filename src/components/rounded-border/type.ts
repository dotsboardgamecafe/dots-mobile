import { type StyleProp, type ViewProps, type ViewStyle } from 'react-native'

export type RoundedBorderProps = ViewProps & {
  contentStyle?: StyleProp<ViewStyle> | undefined,
  radius?: number | undefined,
  borderWidth?: number | undefined,
  colors?: string[],
  spaceBorder?: number,
  withBackgroundImage?: boolean
}