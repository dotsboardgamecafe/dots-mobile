import React from "react";
import { FilterItemType } from "./type";
import { TouchableOpacity, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { ThemeType } from "../../models/theme";
import { scaleHeight, scaleWidth } from "../../utils/pixel.ratio";

const FilterItem = ({ label, prefix, suffix, onPress }: FilterItemType): React.ReactNode => {
  const { colors } = useTheme<ThemeType>()

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 16,
        backgroundColor: colors.background,
        paddingHorizontal: scaleWidth(12),
        paddingVertical: scaleHeight(8)
      }}>
      {prefix}
      <Text style={{ color: colors.onBackground }}>{label}</Text>
      {suffix}
    </TouchableOpacity>
  )
}

export default React.memo(FilterItem)