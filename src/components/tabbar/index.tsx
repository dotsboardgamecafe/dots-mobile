import React from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { View } from "react-native";

import styles from "./styles";
import TabbarItem from "../tabbar-item";

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  return (
    <View style={styles.tabBarContainer}>

      <View style={styles.whiteBg} />

      <View style={styles.items}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          return (
            <TabbarItem
              key={label as string}
              label={label as string}
              isFocused={isFocused}
              onPress={onPress}
            />
          )
        })}
      </View>
    </View>
  )
}

export default React.memo(TabBar)