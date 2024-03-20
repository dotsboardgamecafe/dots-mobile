import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native-paper'

import styles from './styles'
import { ActionButtonProps } from './type'

const ActionButton = ({ style, onPress, label }: ActionButtonProps): React.ReactNode => {

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={1}
    >
      <View style={styles.rectangle1}>
        <View style={styles.rectangle2} />

        <Text style={styles.label}>{label}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default React.memo(ActionButton)