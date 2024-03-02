import { StyleProp, ViewProps, ViewStyle } from "react-native";

export type ContainerProps = ViewProps & {
  containerStyle?: StyleProp<ViewStyle> | undefined,
  contentStyle?: StyleProp<ViewStyle> | undefined,
}