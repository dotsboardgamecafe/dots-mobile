import { Platform, StatusBar, StyleSheet } from "react-native";

const statusBarHeight = Platform.OS === 'ios' ? 0 : StatusBar.currentHeight

const styles = StyleSheet.create({
    bg: {
        height: '100%',
        paddingTop: statusBarHeight
    },

    container: {
        flex: 1,
        flexGrow: 1
    },

    content: {
        flex: 1
    }
})

export default styles