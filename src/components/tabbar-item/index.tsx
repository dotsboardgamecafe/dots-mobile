import React, { useMemo } from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

import { TabBarItemProps } from "./type";
import { scaleWidth } from "../../utils/pixel.ratio";
import CupActive from "../icons/cup-active";
import Cup from "../icons/cup";
import styles from "./styles";

const TabBarItem = ({ label, isFocused, onPress }: TabBarItemProps) => {

  // TODO: implement other icons (waiting for fix solution to import svg)
  const icon = isFocused ?
    <CupActive size={scaleWidth(36)} /> :
    <Cup size={scaleWidth(24)} />

  return (
    <TouchableOpacity
      id={label}
      onPress={onPress}
      style={{ flex: 1 }}
    >
      <View
        style={styles.itemContainer}
      >
        {icon}
        <Text style={[styles.label, isFocused ? styles.labelFocus : {}]}>{label}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default React.memo(
  TabBarItem,
  (prevProps, nextProps) => prevProps.isFocused == nextProps.isFocused
)