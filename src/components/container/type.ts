import { PropsWithChildren } from "react";
import { StyleProp, ViewStyle } from "react-native";

export type ContainerProps = PropsWithChildren & {
  containerStyle?: StyleProp<ViewStyle> | undefined,
  contentStyle?: StyleProp<ViewStyle> | undefined,
}