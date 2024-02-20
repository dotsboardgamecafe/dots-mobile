import React from 'react'
import { SafeAreaView, StatusBar, View, ViewProps } from 'react-native'

import styles from './styles'

const Container: React.FC<ViewProps> = ({ children }) => {

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <StatusBar
                    barStyle='dark-content'
                    backgroundColor='transparent'
                    translucent
                />
                {children}
            </SafeAreaView>
        </View>
    )
}

export default React.memo(Container)